import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Note } from "../models/note.model.js";

const createNote = asyncHandler(async (req, res) => {
    const { title, content } = req.body;

    if (!title || title.trim() === "") {
        throw new ApiError(400, "Title is required");
    }

    const note = await Note.create({
        title,
        content,
        createdBy: req.user._id, // user id from verifyToken middleware
    });

    return res
        .status(201)
        .json(new ApiResponse(201, note, "Note created successfully"));
});

const getAllNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find({ createdBy: req.user._id }).sort({ updatedAt: -1 });

    return res
        .status(200)
        .json(new ApiResponse(200, notes, "Fetched all notes successfully"));
});

const updateNote = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    const note = await Note.findOneAndUpdate(
        { _id: id, createdBy: req.user._id }, // only owner can update
        { title, content, lastAccessed: Date.now() },
        { new: true }
    );

    if (!note) {
        throw new ApiError(404, "Note not found or not authorized");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, note, "Note updated successfully"));
});

const deleteNote = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const note = await Note.findOneAndDelete({
        _id: id,
        createdBy: req.user._id, // only owner can delete
    });

    if (!note) {
        throw new ApiError(404, "Note not found or not authorized");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, note, "Note deleted successfully"));
});


export { createNote, getAllNotes, updateNote, deleteNote };