import request from 'supertest';
import app from '../src/app';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import {INote} from "../src/domain/models/Note";

let mongoServer: MongoMemoryServer;
let token: string;

jest.mock('../src/infrastructure/cache/RedisCacheService', () => {
    return {
        RedisCacheService: jest.fn().mockImplementation(() => ({
            set: jest.fn(),
            get: jest.fn().mockResolvedValue(null),
            delete: jest.fn()
        }))
    };
});

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);

    await request(app).post('/api/v1/auth/register').send({
        email: 'note@example.com',
        password: 'password123',
    });

    const res = await request(app).post('/api/v1/auth/login').send({
        email: 'note@example.com',
        password: 'password123',
    });

    token = res.body.token;
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
});

describe('Note Routes', () => {
    it('should list all notes from authenticadet user', async () => {
        const notesNumber = 5;
        const notes: INote[] = [];
        for (let i = 0; i < notesNumber; i++) {
            const res = await request(app)
                .post('/api/v1/note/create')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    text: 'My first note' + i,
                    isDone: false,
                });

            expect(res.statusCode).toBe(201);
            notes.push(res.body.note);
        }

        const res = await request(app)
            .get('/api/v1/note/list')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);

        const responseNotes: INote[] = res.body.notes
        expect(responseNotes.length).toBe(notesNumber);

        notes.forEach((createdNote) => {
            const match = responseNotes.find((note) => note._id === createdNote._id);
            expect(match).toBeDefined();
            expect(match?.text).toBe(createdNote.text);
            expect(match?.isDone).toBe(createdNote.isDone);
            expect(match?.userId).toBe(createdNote.userId);
        });
    });

    it('should create a note for authenticated user', async () => {
        const res = await request(app)
            .post('/api/v1/note/create')
            .set('Authorization', `Bearer ${token}`)
            .send({
                text: 'My first note',
                isDone: false,
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.note).toMatchObject({
            text: 'My first note',
            isDone: false,
            userId: expect.any(String),
        });
    });

    it('should reject unauthenticated request', async () => {
        const res = await request(app)
            .post('/api/v1/note/create')
            .send({
                text: 'Should fail',
            });

        expect(res.statusCode).toBe(401);
    });

    it('should update a note for authenticated user', async () => {
        const res = await request(app)
            .post('/api/v1/note/create')
            .set('Authorization', `Bearer ${token}`)
            .send({
                text: 'My first note',
                isDone: false,
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('note._id');

        const noteUpdated = await request(app)
            .put('/api/v1/note/update')
            .set('Authorization', `Bearer ${token}`)
            .send({
                noteId: res.body.note._id,
                text: 'My first note',
                isDone: true,
            });

        expect(noteUpdated.statusCode).toBe(200);
        expect(noteUpdated.body).toHaveProperty('note.isDone', true);
    });

    it('should delete a note for authenticated user', async () => {
        const res = await request(app)
            .post('/api/v1/note/create')
            .set('Authorization', `Bearer ${token}`)
            .send({
                text: 'My first note',
                isDone: false,
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('note._id');

        const deletedNote = await request(app)
            .delete('/api/v1/note/delete')
            .set('Authorization', `Bearer ${token}`)
            .send({
                noteId: res.body.note._id
            });

        expect(deletedNote.statusCode).toBe(200);
        expect(res.body).toHaveProperty('note._id', res.body.note._id);
    });
});
