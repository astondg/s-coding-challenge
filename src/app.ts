import express from "express";

import { registerRoutes } from './routes';

const app = express();
const port = 8080;

registerRoutes(app);

// Start the Express server
app.listen(port);