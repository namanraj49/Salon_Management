import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import {Barber} from "../Models/Barber_Model"
import {Shop} from "../Models/Shop_Model"
import { Await } from "react-router-dom";
import { asyncHandler } from "../utils/asyncHnadler";
import {Appointment} from "../Models/Appointment_Model";

//get time slots 
//pehle jis barber ke slots dekhne he wo selwct hoga
//fir day select krlo
//fir time 
//database me status dekhlo



/*const getTimeSlots = asyncHandler(async(req,res,next)=>{
    const {barberId} =  req.params;
    const {date} = req.query;

    const barber = await Barber.findById(barberId);
    if(!barber) {
        return new ApiError(404,"Barber not found");
    }

    const selectedDay = new Date(date).toLocaleString("en-US",{weekday:"long"});
     
    const barberSchedule = barber.schedule[selectedDay];
    //if(!barberSchedule){
      //  return res.status(200).json({availableSlots: [] });

     
    const appointments = await Appointment.find({barber:barberId,date});
    const bookedSlots =  appointments.map((appt) => appt.timeSlot);
    
    const availableSlots = barberSchedule.filter(
        (slot) => !bookedSlots.includes(slot.start + " - " + slot.end)
      );

      res.status(200).json({availableSlots});*/

    
      const getAvailableSlots = asyncHandler(async (req, res) => {
        const { barber, date } = req.query;
        const bookedSlots = await Appointment.find({ barber, date }).select('slot');
        const allSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];
        const availableSlots = allSlots.filter(slot => !bookedSlots.some(booked => booked.slot === slot));
        res.json(new ApiResponse(200, { availableSlots }));
    });
    
    // book appointment 
    //check time slot of barber selected then book it and 
    //mark that slot booked 
    //update its state 

    const createAppointment = asyncHandler(async(req,res,next)=>{
        const {customer,barber,shop,date,slot} = req.body;
        const existingAppointment = await Appointment.findOne({barber,date,slot});

        if(existingAppointment){
            throw new ApiError(404,"already booked")
        }

        const appointment = new Appointment({customer,shop,barber,date,slot,status:'pending'});
        await appointment.save();
        res.status(201).json(new ApiResponse(201,appointment));
    });


    //shop owner accept request

    const acceptAppointment = asyncHandler(async (req, res, next) => {
        const { id } = req.params;
        const appointment = await Appointment.findByIdAndUpdate(id, { status: 'accepted' }, { new: true });
    
        if (!appointment) throw new ApiError(404, 'Appointment not found');
    
        res.json(new ApiResponse(200, appointment));
    });
    
// customer and owner can delete the appointment
//3 hrs pehle tk ta yaad rkhna add krna he

const cancelAppointment = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const appointment = await Appointment.findByIdAndDelete(id);

    if (!appointment) throw new ApiError(404, 'Appointment not found');

    res.json(new ApiResponse(200, 'Appointment cancelled successfully'));
});


//reschedule krna he ye bhi only 3 hrs pehle tk

const rescheduleAppointment = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { newDate, newSlot } = req.body;

    const existingAppointment = await Appointment.findOne({ date: newDate, slot: newSlot });
    if (existingAppointment) throw new ApiError(400, 'New slot is already booked');

    const appointment = await Appointment.findByIdAndUpdate(id, { date: newDate, slot: newSlot }, { new: true });
    if (!appointment) throw new ApiError(404, 'Appointment not found');

    res.json(new ApiResponse(200, appointment));
});


