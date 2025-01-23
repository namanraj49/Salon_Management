import {asyncHandler} from "../utils/asyncHnadler.js"
import {Shop} from "../Models/Shop_Model"
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"
import { Await } from "react-router-dom"


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



   //get shop on searching 
  //pehle sare shop lelo database se
  // get shop  
  //id nikalo
  //shop database me find krlo  by id, name,address
  //error ans response handle krlo bbb

   const searchshop = asyncHandler(async(req,res,next) =>{

    const {id} = req.params;
    const {query} = req.query;

    const shops = await Shop.find({
        $or:[
            {shopName:{$regex:query,$options:"i"}},
            {address:{$regex:query,$options:"i"}}
        ]
    });

    if(shop.length === 0){
        throw new ApiError(404,"shop not find");

    }

    return res.status(201).json(
      new ApiResponse(200,shops,"found shop")
    );

   });


  

  //get all services in shop
  //first find shop  by id params
  //then handle if not found
  //return services from database

  const get_services = asyncHandler (async(req,res,next) =>{
    const {id} = req.params

    const shop = await Shop.findOne(id).populate("services");
    if(!shop){
        throw new ApiError(400,"shop not find");

    }

    if(!shop.services){
        throw new ApiError(400,"services not find");

    }

    return res.status(200).json(
        new ApiResponse("Services retrieved successfully", shop.services)
      );
 
  })


  //sari shops dekhne ke liye

  const get_shops = asyncHandler(async(req,res,next)=>{
    const allshops = await Shop.find().populate("barbers services");

    return res.staus(201).json(
        new ApiResponse(200,allshopsshops,"all shops retrieved")
      )
  })


// barber dhundne ke liye kisi shop me

  const get_barbers = asyncHandler (async(req,res,next) =>{
    const {id} = req.params

    const shop = await Shop.findOne(id).populate("barbers");
    if(!shop){
        throw new ApiError(400,"shop not find");

    }

    if(!shop.barbers){
        throw new ApiError(400,"barber not find");

    }

    return res.status(200).json(
        new ApiResponse("barbers retrieved successfully", shop.barbers)
      );
 
  })

//update shop details





  export {register_shop,searchshop,get_services,get_shops,get_barbers}