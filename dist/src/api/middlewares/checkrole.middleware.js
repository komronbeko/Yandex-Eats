"use strict";
// import { NextFunction, Request, RequestHandler, Response } from "express";
// import User from "../../models/User";
// import { CustomError } from "../../types/custom-error";
// import { verify } from "../../utils/jwt";
Object.defineProperty(exports, "__esModule", { value: true });
// interface IUserRequest extends Request {
//   verifiedUser: any;
// }
// const checkRole =
//   (role1: string, role2: string): RequestHandler =>
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const token =
//         req.headers["authorization"] &&
//         req.headers["authorization"].split(" ")[1];
//       if (!token) throw new CustomError("Invalid token!", 401);
//       const findUser = verify(token);
//       const verifiedUser = await User.findOne({
//         where: { email: findUser.email },
//       });
//       if (verifiedUser?.dataValues.role !== (role1 || role2) )
//         throw new CustomError(
//           `This route is only accessible by ${role1}s!`,
//           403
//         );
//       next();
//     } catch (error) {
//       next(error);
//     }
//   };
// export const isSuperAdmin = checkRole("superadmin", "superadmin");
// export const isAdmin = checkRole("admin", "superadmin");
// export const isCourier = checkRole("courier", "admin");
