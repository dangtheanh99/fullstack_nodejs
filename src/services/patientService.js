import { reject } from "lodash";
import db from "../models/index";
require("dotenv").config();
import emailService from "./emailService";
import { v4 as uuidv4 } from "uuid";

let builUrlEmail = (doctorId, token) => {
  let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
  return result;
};
let postBookAppointmentService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.doctorId ||
        !data.timeType ||
        !data.date ||
        !data.fullName ||
        !data.selectedGender ||
        !data.address ||
        !data.phoneNumber
      ) {
        resolve({
          errCode: 1,
          message: "Missing required parameter!",
        });
      } else {
        let token = uuidv4();
        await emailService.sendSimpleEmail({
          receiver: data.email,
          patientName: data.fullName,
          doctorName: data.doctorName,
          time: data.timeText,
          language: data.language,
          link: builUrlEmail(data.doctorId, token),
        });
        // upsert patient
        let user = await db.User.findOrCreate({
          where: {
            email: data.email,
          },
          defaults: {
            email: data.email,
            roleId: "R3",
            firstName: data.fullName,
            phoneNumber: data.phoneNumber,
            address: data.address,
            gender: data.selectedGender,
          },
        });

        // create a booking appointment
        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: {
              patientId: user[0].id,
            },
            defaults: {
              statusId: "S1",
              patientId: user[0].id,
              doctorId: data.doctorId,
              date: data.date,
              timeType: data.timeType,
              token: token,
            },
          });
        }
        resolve({
          data: user,
          errCode: 0,
          message: "Save infor patient succeed!",
        });
      }
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

let postVerifyBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.doctorId || !data.token) {
        resolve({
          errCode: 1,
          message: "Missing required parameter!",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            doctorId: data.doctorId,
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        });
        if (appointment) {
          appointment.statusId = "S2";
          await appointment.save();
          resolve({
            errCode: 0,
            message: "Update the appointment succeed!",
          });
        } else {
          resolve({
            errCode: 2,
            message: "The appointment has been activated or does not exist.",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  postBookAppointmentService,
  postVerifyBookAppointment,
};
