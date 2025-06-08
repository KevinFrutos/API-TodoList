import {INoteRepository} from "../../../domain/repositories/NoteRepository";
import {INote} from "../../../domain/models/Note";
import {Types} from "mongoose";

export class DeleteNote {
    constructor(private NoteRepository: INoteRepository) {}

    async execute(noteId: string): Promise<INote | null> {
        if (Types.ObjectId.isValid(noteId)) {
            const objectId = new Types.ObjectId(noteId);
            return await this.NoteRepository.delete(objectId);
        }
        throw new Error('Invalid note');
    }
}
