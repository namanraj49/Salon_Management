import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import {Barber} from "../Models/Barber_Model"
import {Shop} from "../Models/Shop_Model"
import { Await } from "react-router-dom";
import { asyncHandler } from "../utils/asyncHnadler";

//pehle check if user is owner of shop or not
//authenticate user
//add barbers with details

const addbarber  = asyncHandler(async(req,res,next)=>{
    const {id} = req.params;// ye shop id he
    const {name,experience,specialties,image} = req.body;  //isse array milegi jisme id he barbers ki

   const shop = await Shop.findById(id);
   if(!shop){
    throw new ApiError(404,"shop not found");
    }

    if(shop.owner.toStirng()!==req.user.id){
        throw new ApiError(403,"you are not authorized to add barber");
         }
           
         // Check if all barber IDs exist in the database
         const existingBarbers = await Barber.find({_id:{$in:barbers}});
         if(existingBarbers.length != barbers.length){
            throw new ApiError(400,"one or more barber do not exist");
         }

         const newBarber = new Barber({
          name,image,experience,specialties,
          shop:Shop_Model.id,
         });
           

         //add barber to shop barber list
         shop.barbers.push(newBarbers._id);
         await newBarber.save();
        
        // shop.barbers.push(newBarbers._id);


  return res.status(200).json(
    new ApiResponse("Barbers added successfully to the shop", {
      barber:newBarber,
      shop,
    })
  );



})

const deletebarber = asyncHandler(async(req,res,next)=>{
    const {id} = req.params;

    const barber = await Barber.findById(id);
    if(!barber){
      throw new ApiError(400,"barber not found")
    }
    
    // Check if the barber belongs to the authenticated shop owner
    if (barber.shopOwner.toString() !== req.user.id) {   //error de skta he user htana pd skta he
      return next(new ApiError("Not authorized to delete this barber", 403));
    }
      await barber.remove();
      return res(200).status.json(
        new ApiResponse("Barber deleted successfully",true,{
          barberId:id,
        })
      );
})

//update barber details steps
//pehle id nikalo params se aur dusri field req.body se
//check kro ye he ki ni db me
//us field ko change kro
//save krdo barber ko

const update_barber_details = asyncHandler(async(req,res,next)=>{
  const {id} = req.params;
  const {name,experience,specialties} = req.body; // image ko add krna he yaad se

  const barber = Barber.findById(id);
  if(!barber){
    throw new ApiError(401,"barber not found");
  }
  if(barber.shopOwner.toStirng()!==req.user.id){
    throw new ApiError(400,"Not authorized to updatae barber")
  }

  if(name) barber.name = name;
  if(experience) barber.experience = experience;
  if(specialties) barber.specialties = specialties;


  const updatedBarber = await barber.save();

  res.status(200).json(
    new ApiResponse("Barber details updated", true,updatedBarber)
  );

})

module.exports = {addbarber,deletebarber,update_barber_details};


