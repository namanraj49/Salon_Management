import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHnadler";
import jwt from "jsonwebtoken"
import {Customer} from "../Models/Customer_Model"

export const verifyJwt = asyncHandler(async(req,resizeBy,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header    
        
        if(!token){
            throw new ApiError(401,"Unauthorized request")
        }
           const decodedtoken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

          const customer =  Customer.findById(decodedtoken?._id).select("-password -refreshToken")

          if(!customer){
            throw new ApiError(401,"Invalid access token")
          }

          req.customer = customer;
          next()
      

    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid access token")
    }
})