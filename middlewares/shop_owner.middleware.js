import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHnadler";
import jwt from "jsonwebtoken"
import {Shop} from "../Models/Customer_Model"

export const shopowner_verify = asyncHandler(async(req,_,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header    
        
        if(!token){
            throw new ApiError(401,"Unauthorized request")
        }
           const decodedtoken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

          const shopowner =  Shop.findById(decodedtoken?._id).select("-password -refreshToken")

          if(!shopowner){
            throw new ApiError(401,"Invalid access token")
          }

          req.user = shopowner; //yha dekhna ek baar user hoga ya customer
          next()
      

    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid access token")
    }
})