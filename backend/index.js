import express from "express";
import dovenv from "dotenv";
import ConnectDB from "./config/db.js";
import AuthRoute from "./routes/authRoutes.js";
import { createClient } from "@supabase/supabase-js";
import cors from "cors";

dovenv.config();

const Port = process.env.Port || 2000;
const supabase = createClient(
  process.env.Supabase_URL,
  process.env.Supabase_Key
);

export default supabase;
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", AuthRoute);

ConnectDB();
app.listen(Port, () => {
  console.log("server started at the port", Port);
});
