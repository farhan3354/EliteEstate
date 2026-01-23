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
import agentRoutes from "./routes/agentRoutes.js";
import adminuserRoutes from "./routes/adminUserRoutes.js";
import ownerRoutes from "./routes/ownerRoutes.js";
import assignRoutes from "./routes/agentAssignmentRoutes.js";
import serviceRoutes from "./routes/serviceRoute.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import publicAgentRoutes from "./routes/publicAgentRoutes.js";
import agentDashboardRoutes from "./routes/agentDashboardRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin/agents", agentRoutes);
app.use("/api/v1/admin", adminuserRoutes);
app.use("/api/v1/owners", ownerRoutes);
app.use("/api/v1/agents", assignRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/properties", propertyRoutes);
app.use("/api/v1/favorites", favoriteRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/services", serviceRoutes);
app.use("/api/v1/inquiries", inquiryRoutes);
app.use("/api/v1/agents", publicAgentRoutes);
app.use("/api/v1/agent-dashboard", agentDashboardRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/locations", locationRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "EliteEstate API is running...",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("FATAL ERROR:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err : {}
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

export default app;
