import { Types } from 'mongoose';

export interface INote {
    _id?: Types.ObjectId;
    text: string;
    isDone?: boolean;
    userId: Types.ObjectId;
}
