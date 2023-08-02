"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = exports.register = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const User_1 = __importDefault(require("../../models/User"));
const jwt_1 = require("../../utils/jwt");
const custom_error_1 = require("../../types/custom-error");
const sequelize_1 = require("sequelize");
const user_validate_1 = require("../../validations/user.validate");
//--------LOGIN--------------------------------
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        //VALIDATION
        const { error } = (0, user_validate_1.loginSchema)({ email, password });
        if (error)
            throw new custom_error_1.CustomError(error.message, 400);
        //Finding an email and Comparing Hash Values
        const findUser = await User_1.default.findOne({ where: { email } });
        if (!findUser)
            throw new custom_error_1.CustomError("Incorrect email or password!", 403);
        const comparePassword = await bcrypt_1.default.compare(password, findUser.dataValues.password);
        if (!comparePassword)
            throw new custom_error_1.CustomError("Incorrect email or password!", 403);
        //TOKEN
        const token = (0, jwt_1.sign)({ email: findUser.dataValues.email });
        res.status(200).json({
            message: "Successfully logged in!",
            token: token,
            role: findUser.dataValues.role,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
//--------REGISTER, SENDING VERIFICATION CODE--------------------------------
const register = async (req, res, next) => {
    try {
        const { name, email, password, phone_number } = req.body;
        //VALIDATION
        const { error } = (0, user_validate_1.registerSchema)({ name, email, password, phone_number });
        if (error)
            throw new custom_error_1.CustomError(error.message, 400);
        //Finding an email and Hashing password
        const findUser = await User_1.default.findOne({
            where: { [sequelize_1.Op.or]: [{ name }, { email }] },
        });
        if (findUser)
            throw new custom_error_1.CustomError("User already exist!", 403);
        const hashedPassword = await bcrypt_1.default.hash(password, 12);
        //Creating and sending a code to an email address
        const code = Math.floor(100000 + Math.random() * 900000);
        const transporter = nodemailer_1.default.createTransport({
            port: 465,
            host: "smtp.gmail.com",
            auth: {
                user: "uzakovumar338@gmail.com",
                pass: "ecfuorlboksqoiwd",
            },
            secure: true,
        });
        const mailData = {
            from: "uzakovumar338@gmail.com",
            to: email,
            subject: "Yandex Eats",
            text: "Verification",
            html: `<b>Your verification code is: ${code}</b>`,
        };
        await transporter.sendMail(mailData);
        res.status(201).json({
            message: "Verification code is sent to your email!",
            code,
            email,
            name,
            password: hashedPassword,
            phone: phone_number,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
//--------CHECKING, IF VERIFICATION CODE IS REAL--------------------------------
const verifyUser = async (req, res, next) => {
    try {
        const { verifyCode, code, email, name, password, phone_number } = req.body;
        if (code != verifyCode) {
            throw new custom_error_1.CustomError("Incorrect code", 403);
        }
        //NEWUSER
        await User_1.default.create({
            name,
            email,
            password,
            phone_number,
            is_verified: true,
        });
        // TOKEN
        const token = (0, jwt_1.sign)({ email });
        res
            .status(200)
            .json({ message: "Successfully registered!", token, role: "user" });
    }
    catch (error) {
        next(error);
    }
};
exports.verifyUser = verifyUser;
