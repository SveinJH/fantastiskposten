import {} from "express";

const express = require("express");

const articleRouter = require("./routes/articleRoutes");

const app = express();

app.use(express.json());

// ROUTES
app.use("/api/v1/articles", articleRouter);

module.exports = app;
