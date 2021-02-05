import { logInfo, logError as _error } from "./logger.js";
const jwt = require("jsonwebtoken");

const requestLogger = (req, res, next) => {
  logInfo("Method:", req.method);
  logInfo("Path:  ", req.path);
  logInfo("Body:  ", req.body);
  logInfo("---");
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  _error(error.message);

  if (error.name === "CastError" && error.kind === "ObjectId") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.substring(7);
  } else {
    req.token = null;
  }
  try {
    const decodedToken = await jwt.verify(req.token, process.env.SECRET);
    req.decodedToken = decodedToken;
  } catch (error) {
    req.decodedToken = null;
  }
  next();
};

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
};
