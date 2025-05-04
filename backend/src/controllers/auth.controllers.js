import bcrypt from "bcryptjs";
import { db } from "../libs/db.js";
import jwt from "jsonwebtoken";
import { UserRole } from "../generated/prisma/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const register = asyncHandler( async (req, res, next) => {
    const {name, email, password} = req.body;
    try {
        const existinguser = await db.user.findUnique({
            where:{
                email
            }
        })

        if(existinguser){
            throw new ApiError(400, "User already registered")
        }
        
        const heshedPassword = await bcrypt.hash(password, 10)
        const newUser = await db.user.create({
            data:{
                email, 
                password:heshedPassword,
                name,
                role:UserRole.USER
            }
        })

        const token = jwt.sign({id:newUser.id}, process.env.JWT_SECRET,{
            expiresIn:"7d"
        });

        res.cookie("jwt", token, {
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV !=="devlopment",
            maxAge: 1000*60*60*24*7,
        })

        const registeruser = {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            role: newUser.role,
            avatar: newUser.avatar
        }

        res.status(201).json(
            new ApiResponse( 201, registeruser, "User registered successfully." )
        )

    } catch (error) {
        next(error)
    }
});

const login = asyncHandler( async (req, res, next) => {
    const {email, password} = req.body;
    try {
        const user = await db.user.findUnique({
            where:{
                email
            }
        })

        if(!user){
            throw new ApiError(404, "User not found")
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch){
            throw new ApiError(401, "invalid crendentials");  
        }

        const loginUser = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            avatar: user.avatar
        }

        const token = jwt.sign({id:loginUser.id}, process.env.JWT_SECRET,{
            expiresIn:"7d"
        });

        res.cookie("jwt", token, {
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV !=="devlopment",
            maxAge: 1000*60*60*24*7,
        })

        res.status(201).json(
            new ApiResponse( 201, loginUser, "Login successfull." )
        )

    } catch (error) {
        next(error)
    }
});

const logout = asyncHandler( async (req, res, next) => {
    try {

        res.clearCookie("jwt", {
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV !=="devlopment",
        })
        res.status(200).json(
            new ApiResponse( 200, {}, "Logout successfull." )
        )
        
    } catch (error) {
        next(error)
    }
});

const check = asyncHandler( async (req, res, next) => {
    try {
        const user = req.user;
        res.status(200).json(
            new ApiResponse( 200, user, "User authenticated successfully." )
        )
    } catch (error) {
        next(error)
    }
});

export {
    register,
    login,
    logout,
    check
}