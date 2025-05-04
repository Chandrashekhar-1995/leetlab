import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

dotenv.config();

app.use(cors({
  origin: "http://localhost:5173",
  credentials:true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 7777;

app.get("/", (req,res) => {
  res.send("Welcome to leetlab🎆");
});


// import routes
import healthCheckRoutes from "./routes/healthCheck.routes";

app.use("/api/v1/healthcheck", healthCheckRoutes);



// Error Handler Middleware (must be after all routes)
import { errorHandler } from "./middlewares/errorHandler.middleware";
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));