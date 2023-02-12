import { reject } from "lodash";
import db from "../models/index";
require("dotenv").config();
import emailService from "./emailService";

let postBookAppointmentService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.doctorId ||
        !data.timeType ||
        !data.date ||
        !data.fullName
      ) {
        resolve({
          errCode: 1,
          message: "Missing required parameter!",
        });
      } else {
        await emailService.sendSimpleEmail({
          receiver: data.email,
          patientName: data.fullName,
          doctorName: data.doctorName,
          time: data.timeText,
          language: data.language,
          link: "https://bookingcare.vn/",
        });
        // upsert patient
        let user = await db.User.findOrCreate({
          where: {
            email: data.email,
          },
          defaults: {
            email: data.email,
            roleId: "R3",
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

module.exports = {
  postBookAppointmentService,
};
