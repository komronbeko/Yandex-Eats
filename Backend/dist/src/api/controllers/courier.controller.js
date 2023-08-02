"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_all = void 0;
const User_1 = __importDefault(require("../../models/User"));
// export const post: RequestHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     const { name, email, password, phone_number } =
//       req.body as ICourierBody;
//     const { error } = courierSchema({
//       name,
//       email,
//       password,
//       phone_number
//     });
//     if (error) throw new CustomError(error.message, 400);
//     await Couriers.create({
//       name,
//       email,
//       password,
//       phone_number,
//     });
//     res.status(200).json({ message: "success" });
//   } catch (error) {
//     next(error);
//   }
// };
const get_all = async (req, res, next) => {
    try {
        const data = await User_1.default.findAll({ where: { role: "courier" } });
        res.status(200).json({ message: "success", data });
    }
    catch (error) {
        next(error);
    }
};
exports.get_all = get_all;
// export const update: RequestHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     const { name, email, password, phone_number } =
//       req.body as ICourierBody;
//     const {id} = req.params;  
//     const { error } = courierSchema({
//       name,
//       email,
//       password,
//       phone_number
//     });
//     if (error) throw new CustomError(error.message, 400);
//     const findCourier = await Couriers.findOne({
//       where: { id },
//     });
//     if (!findCourier) throw new CustomError("Courier not found", 400);
//     else {
//       await Couriers.update(
//         {
//           name,
//           email,
//           password,
//           phone_number
//         },
//         { where: { id: findCourier.dataValues.id } }
//       );
//     }
//     res.status(200).json({ message: "success" });
//   } catch (error) {
//     next(error);
//   }
// };
// export const _delete: RequestHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const findCourier = await Couriers.findOne({ where: { id } });
//     if (!findCourier) throw new CustomError("Courier not found", 400);
//     else {
//       await Couriers.destroy({
//         where: { id: findCourier.dataValues.id },
//       });
//     }
//     res.status(200).json({ message: "success" });
//   } catch (error) {
//     next(error);
//   }
// };
