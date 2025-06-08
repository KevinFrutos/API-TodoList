import { Router } from 'express';
import {createNote, deleteNote, findNotesByUserId, updateNote} from "../controllers/note/NoteController";
import { authenticate } from "../http/middlewares/authenticate";

const router = Router();

router.post('/create', authenticate, createNote);
router.put('/update', authenticate, updateNote);
router.delete('/delete', authenticate, deleteNote);
router.get('/list', authenticate, findNotesByUserId);

export default router;
