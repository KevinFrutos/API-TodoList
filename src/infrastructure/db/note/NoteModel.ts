import { Schema, model } from 'mongoose';

const noteSchema = new Schema(
    {
    text: { type: String, required: true },
    isDone: { type: Boolean, default: false },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    },
    {
        timestamps: { createdAt: true, updatedAt: true },
    });

export default model('Note', noteSchema);
