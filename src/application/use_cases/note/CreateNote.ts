import {INoteRepository} from "../../../domain/repositories/NoteRepository";
import {INote} from "../../../domain/models/Note";
import {Types} from "mongoose";

export class CreateNote {
    constructor(private NoteRepository: INoteRepository) {}

    async execute(text: string, userId: string): Promise<INote> {
        if (Types.ObjectId.isValid(userId)) {
            const objectId = new Types.ObjectId(userId);
            return await this.NoteRepository.create({text, userId: objectId});
        }
        throw new Error('Invalid user');
    }
}
