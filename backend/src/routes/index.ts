import express from "express";
import BoardsController from "../controllers/boards";

const router = express.Router();

router.get("/boards", async (_req, res) => {
  const controller = new BoardsController();
  const response = await controller.getMessage();
  return res.send(response);
});

export default router;
