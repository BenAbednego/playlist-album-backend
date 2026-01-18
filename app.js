const express = require("express");
const mongoose = require("mongoose");
const app = express();

// =======================
// VALIDATION ENV
// =======================
if (!process.env.MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is not defined");
}

const PORT = process.env.PORT || 3000;

// =======================
// MIDDLEWARE
// =======================
app.use(express.json());

app.use((req, res, next) => {
  console.log("📥 Incoming:", req.method, req.url);
  next();
});

// =======================
// ROUTES
// =======================
const albumRoutes = require("./routes/album.routes");
console.log("🔥 albumRoutes loaded");

app.use("/api", albumRoutes);

// =======================
// 404
// =======================
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    url: req.url,
  });
});

// =======================
// DATABASE + SERVER
// =======================
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB CONNECTED");
    console.log("🌍 Environment:", process.env.NODE_ENV);

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB ERROR:", err.message);
    process.exit(1);
  });
