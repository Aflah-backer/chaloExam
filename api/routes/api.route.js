import express from "express";
import multer from 'multer'
import { uploaded } from "../controllers/doc.controller.js";
import { search } from "../controllers/search.controller.js";

const router = express.Router();
const upload = multer()

// Route for file upload
router.post("/upload", upload.single("file"), uploaded);

// Route for searching for a term
router.get("/search", search);

export default router;
