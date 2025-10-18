import express from "express";
import { loginform, registerform } from "../controllers/authcontroller.js";
import { loginUser, registerUser } from "../controllers/authSupaBase.js";
const router = express.Router();

router.get("/", async (req, res) => {
  res.send("Hello from the server");
});

router.post("/authregister", registerform);

router.post("/authlogin", loginform);

router.post("/supabaseregister", registerUser);
router.post("/supabaselogin", loginUser);
export default router;
