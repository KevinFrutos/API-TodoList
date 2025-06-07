import NoteModel from "./NoteModel";
import {INoteRepository} from "../../../domain/repositories/NoteRepository";
import {INote} from "../../../domain/models/Note";
import {Types} from "mongoose";

export class NoteRepositoryImpl implements INoteRepository {
    async create(note: Partial<INote>): Promise<INote> {
        return NoteModel.create(note);
    }

    async update(note: Partial<INote>): Promise<INote | null> {
        if (!note._id) {
            throw new Error('Note _id is required for update');
        }
        return NoteModel.findByIdAndUpdate(
            note._id,
            { $set: { text: note.text, isDone: note.isDone } },
            { new: true }
        ).lean().exec();
    }

    async delete(noteId: Types.ObjectId): Promise<INote | null> {
        return NoteModel.findByIdAndDelete(noteId).lean().exec();
    }

    async findByUserId(userId: Types.ObjectId): Promise<INote[]> {
        return NoteModel.find({ userId }).lean().exec();
    }

}
