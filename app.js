require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

console.log("🔍 DEBUG - Environment Variables:");
console.log("MONGODB_URI:", process.env.MONGODB_URI);  // ← TAMBAHIN INI
console.log("PORT:", process.env.PORT);                // ← TAMBAHIN INI
console.log("NODE_ENV:", process.env.NODE_ENV);        // ← TAMBAHIN INI


// Body parser
app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  console.log("📥 Incoming:", req.method, req.url);
  next();
});

// Load routes
const albumRoutes = require("./routes/album.routes");
console.log("🔥 albumRoutes loaded");

// Register routes
app.use("/api", albumRoutes);

// 404 handler
app.use((req, res) => {
  console.log("❌ 404 - Route not found:", req.url);
  res.status(404).json({ error: "Route not found", url: req.url });
});

// MongoDB Connection ENV!
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/playlist-album";
const PORT = process.env.PORT || 3000;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected!");
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🗄️  Database: ${MONGODB_URI.includes('localhost') ? 'Local' : 'Cloud (Atlas)'}`);
    
    // Start server SETELAH DB connect
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    console.error("💡 Check your MONGODB_URI in .env file");
    process.exit(1);  
  });