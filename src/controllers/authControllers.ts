import { Request , Response } from "express";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { User } from "../models/User";

export async function register(req: Request, res: Response){
    const { email, password, name} = req.body;

    const existing = await User.findOne({email});
    if (existing){
        return res.status(400).json({message: 'Email already in use '});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({email, password: hashedPassword, name});

    const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET as string,
        { expiresIn: '7d', })

    res.status(201).json({ token })
}

export async function login(req: Request, res: Response){
    const { email, password } = req.body;

    const user = await User.findOne({ email })
    if(!user) {
        return res.status(400).json({ message: 'invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({ message: 'invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET as string, 
        {expiresIn: '7d', })

    res.status(201).json({token})
}