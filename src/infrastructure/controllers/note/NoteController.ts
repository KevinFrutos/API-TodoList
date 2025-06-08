import { Response } from 'express';
import {NoteRepositoryImpl} from "../../db/note/NoteRepositoryImpl";
import {AuthenticatedRequest} from "../../http/middlewares/authenticate";
import {CreateNote} from "../../../application/use_cases/note/CreateNote";
import {DeleteNote} from "../../../application/use_cases/note/DeleteNote";
import {UpdateNote} from "../../../application/use_cases/note/UpdateNote";
import {FindNoteByUserId} from "../../../application/use_cases/note/FindNoteByUserId";

const noteRepository = new NoteRepositoryImpl()

export const createNote = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user;
    const { text } = req.body;
    const useCase = new CreateNote(noteRepository);
    try {
        const note = await useCase.execute(text, userId);
        res.status(201).json({ note });
    } catch(error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unexpected error occurred' });
        }
    }
}

export const deleteNote = async (req: AuthenticatedRequest, res: Response) => {
    const { noteId } = req.body;
    const useCase = new DeleteNote(noteRepository);
    try {
        const note = await useCase.execute(noteId);
        res.status(200).json({ note });
    } catch(error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unexpected error occurred' });
        }
    }
}

export const updateNote = async (req: AuthenticatedRequest, res: Response) => {
    const { noteId, text, isDone } = req.body;
    const useCase = new UpdateNote(noteRepository);
    try {
        const note = await useCase.execute(noteId, text, isDone);
        res.status(200).json({ note });
    } catch(error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unexpected error occurred' });
        }
    }
}

export const findNotesByUserId = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user;
    const useCase = new FindNoteByUserId(noteRepository);
    try {
        const notes = await useCase.execute(userId);
        res.status(200).json({ notes });
    } catch(error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unexpected error occurred' });
        }
    }
}
