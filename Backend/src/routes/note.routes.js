import { Router } from "express";
const router = Router();
import { createNote, getAllNotes, updateNote, deleteNote } from "../controllers/note.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

router.use(verifyToken);

router.post("/create",createNote);
router.get("/",getAllNotes);
router.patch("/update/:id",updateNote);
router.delete("/delete/:id",deleteNote);


export default router;
