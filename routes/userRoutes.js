import express, { Router } from "express";
import { fetch, create, update,deleteuser } from "../controller/userController.js";

const router = express.Router();

router.post("/create", create);
router.get("/getAllUsers", fetch);
router.put("/update/:id", update);
router.delete("/deleteuser/:id",deleteuser);

export default router;
