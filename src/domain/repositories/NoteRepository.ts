import { INote } from '../models/Note';
import {Types} from "mongoose";

export interface INoteRepository {
    create(note: Partial<INote>): Promise<INote>;
    update(note: Partial<INote>): Promise<INote | null>;
    delete(noteId: Types.ObjectId): Promise<INote | null>;
    findByUserId(userId: Types.ObjectId): Promise<INote[]>;
}
