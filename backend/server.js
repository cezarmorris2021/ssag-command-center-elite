const express = require("express");
const cors = require("cors");

const app = express();
const PORT = Number(process.env.PORT || 10000);

app.disable("x-powered-by");
app.set("trust proxy", 1);

const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Origin not allowed"));
  }
}));
app.use(express.json({ limit: "64kb" }));
app.use((_req, res, next) => {
  res.set({
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "no-referrer",
    "Cache-Control": "no-store"
  });
  next();
});

app.get("/", (_req, res) => {
  res.json({
    ok: true,
    service: "SSAG Command Center",
    status: "limited",
    storage: "memory-only",
    persistence: false,
    authentication: false,
    health: "/api/health"
  });
});

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "SSAG Command Center",
    storage: "memory-only",
    persistence: false,
    authentication: false,
    warning: "Deal routes are disabled until protected sign-in and durable storage are implemented and verified."
  });
});

app.post("/deals", (_req, res) => {
  res.status(503).json({
    success: false,
    error: "Deal entry is paused. This service has no verified sign-in or durable storage.",
    persistence: false
  });
});

app.get("/deals", (_req, res) => {
  res.status(503).json({
    error: "Deal records are unavailable until a protected, durable CRM is connected.",
    persistence: false
  });
});

app.get("/stats", (_req, res) => {
  res.status(503).json({
    error: "Deal totals are unavailable until a protected, durable CRM is connected.",
    persistence: false
  });
});

app.use((_req, res) => res.status(404).json({ ok: false, error: "Route not found" }));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`SSAG Command Center limited service listening on ${PORT}`);
});
