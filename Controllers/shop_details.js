import {asyncHandler} from "../utils/asyncHnadler.js"
import {Shop} from "../Models/Shop_Model"
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"


//get shop details from frontend
  //validate format and empty fields
  //check if already exists
  //check for shop image and barber image
  //upload them
  //create shop object , entry in db
  //remove password and refresh token
  //check for shop creation
  //return res

  const register_shop = asyncHandler(async(req,res)=>{

    const{shopName,ownerName,email,address} = req.body
    console.log("email",email);

    if(shopName===""){
        throw new ApiError(400,"shopName required")
    }

    if(ownerName===""){
        throw new ApiError(400,"ownerName required")
    }

    if(email===""){
        throw new ApiError(400,"email required")
    }

    if(address===""){
        throw new ApiError(400,"address required")
    }


    const existedshop = await Shop.findOne({
        $or:[{username},{email}]
    })

    if(existedshop){
        throw new ApiError(409,"shop already exixts")
    }

   //check for shop image and barber image
  //upload them
  //cloudinary pe account bnane ke bad 


  const createdShop = await Shop.create({
    shopName,
    ownerName,
    email,
    address,
    shopImage
  })

  if(!createdShop){
    throw new ApiError(500,"something went wrong while registeirn shop")
  }

  return res.staus(201).json(
    new ApiResponse(200,createdShop,"shop registered successfully")
  )





  })

  export {register_shop}