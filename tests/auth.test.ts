import request from 'supertest';
import app from '../src/app';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
});

describe('Auth Routes', () => {
    it('should register a new user', async () => {
        const res = await request(app).post('/api/v1/auth/register').send({
            email: 'test@example.com',
            password: 'password123',
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('token');
    });

    it('should log in the user', async () => {
        await request(app).post('/api/v1/auth/register').send({
            email: 'login@example.com',
            password: 'mypassword',
        });

        const res = await request(app).post('/api/v1/auth/login').send({
            email: 'login@example.com',
            password: 'mypassword',
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
    });
});
