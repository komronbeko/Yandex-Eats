import { NextFunction, Request, RequestHandler, Response } from "express";
import { CustomError } from "../../types/custom-error";

export const errorHandler = async (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res
    .status(error.code || 500)
    .json({ message: error.message || "Internal Server Error" });
};
