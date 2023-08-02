import express, { Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "../api/routes/index";
import { errorHandler } from "../api/middlewares/error-handler";

const modules = async (app: Application) => {
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  app.use(router);
  app.use(errorHandler);
};

export default modules;
