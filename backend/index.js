import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/usersRoutes.js";
import propertyRoutes from "./routes/propertiesRoutes.js";
import favoriteRoutes from "./routes/favoritesRoutes.js";
import reviewRoutes from "./routes/reviews.js";
import bookingRoutes from "./routes/bookings.js";
import agentRoutes from "./routes/agentRoutes.js";
import adminuserRoutes from "./routes/adminUserRoutes.js";
import ownerRoutes from "./routes/ownerRoutes.js";
import assignRoutes from "./routes/agentAssignmentRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", agentRoutes);
app.use("/api", adminuserRoutes);
app.use("/api/owners", ownerRoutes);
app.use("/api/agents",assignRoutes)
app.use("/api", userRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/v1/favorites", favoriteRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/bookings", bookingRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Property API is running...",
  });
});

const PORT = process.env.Port || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.PORT} mode on port ${PORT}`);
});

export default app;

// import express from "express";
// import dovenv from "dotenv";
// import ConnectDB from "./config/db.js";
// import AuthRoute from "./routes/authRoutes.js";
// import { createClient } from "@supabase/supabase-js";
// import cors from "cors";

// dovenv.config();

// const Port = process.env.Port || 2000;
// const supabase = createClient(
//   process.env.Supabase_URL,
//   process.env.Supabase_Key
// );

// export default supabase;
// const app = express();
// app.use(express.json());
// app.use(cors());

// app.use("/api", AuthRoute);

// ConnectDB();
// app.listen(Port, () => {
//   console.log("server started at the port", Port);
// });
