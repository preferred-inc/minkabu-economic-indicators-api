import express, { Application } from "express";
import indicatorsRoutes from "./routes/indicators";

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use("/api/indicators", indicatorsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
