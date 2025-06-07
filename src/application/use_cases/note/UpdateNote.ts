import {INoteRepository} from "../../../domain/repositories/NoteRepository";
import {INote} from "../../../domain/models/Note";
import {Types} from "mongoose";

export class UpdateNote {
    constructor(private NoteRepository: INoteRepository) {}

    async execute(noteId: string, text: string, isDone: boolean): Promise<INote | null> {
        if (Types.ObjectId.isValid(noteId)) {
            const objectId = new Types.ObjectId(noteId);
            return await this.NoteRepository.update({_id: objectId, text, isDone});
        }
        throw new Error('Invalid note');
    }
}
