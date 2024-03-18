import express from "express";
import {
  addSumbission,
  getAllSubmission,
} from "../controller/submission.controller.js";

const router = express.Router();

router.post("/", addSumbission);
router.get("/", getAllSubmission);

export default router;
