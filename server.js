import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors()); // 모든 출처의 요청 허용
app.use(express.json());

app.post("/log", (req, res) => {
  const logEntry = `${new Date().toISOString()} - User clicked on element: ${JSON.stringify(
    req.body
  )}\n`;

  fs.appendFile("app.log", logEntry, (err) => {
    if (err) {
      console.error("Failed to write to log file:", err);
      return res.status(500).send("Failed to log data");
    }
    res.sendStatus(200);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
