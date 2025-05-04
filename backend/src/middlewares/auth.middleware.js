import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { db } from "../libs/db.js";

const authMiddleware = asyncHandler( async (req, res, next ) =>{
    try {
        const token = req.cookies.jwt;

        if(token){
            throw new ApiError(401, "Unauthorised ! Please login again")
        }

        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET)
        } catch (error) {
            throw new ApiError(401, "Unauthorised ! invalid token")
        }

        const user = await db.user.findUnique({
            where:{
                email
            },
            select:{
                id:true,
                neme:true,
                email:true,
                avatar:true,
                role:true
            }
        })

        if (!user) {
            throw new ApiError (404, "User not found")
        }

        req.user = user;
        next()
        
    } catch (error) {
        next(error)
    }
});

export {
    authMiddleware,
}