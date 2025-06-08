import {INoteRepository} from "../../../domain/repositories/NoteRepository";
import {INote} from "../../../domain/models/Note";
import {Types} from "mongoose";

export class FindNoteByUserId {
    constructor(private NoteRepository: INoteRepository) {}

    async execute(userId: string): Promise<INote[]> {
        if (Types.ObjectId.isValid(userId)) {
            const objectId = new Types.ObjectId(userId);
            return await this.NoteRepository.findByUserId(objectId);
        }
        throw new Error('Invalid note');
    }
}
