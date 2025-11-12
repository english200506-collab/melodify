import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    try {
        const { email, password, fullName, imageUrl } = req.body;

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: "Пользователь уже существует" });

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashed, fullName, imageUrl });

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(201).json({ token, userId: user._id, fullName: user.fullName });


    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "Пользователь не найден" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ message: "Неверный пароль" });

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({ token, userId: user._id, fullName: user.fullName });

    } catch (error) {
        next(error);
    }
};

export const updateProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { fullName, password } = req.body;

        const updateData = { fullName };
        if (password) {
            const hashed = await bcrypt.hash(password, 10);
            updateData.password = hashed;
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
        if (!updatedUser) return res.status(404).json({ message: "Пользователь не найден" });

        res.json({ fullName: updatedUser.fullName });
    } catch (err) {
        next(err);
    }
};

