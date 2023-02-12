import db from "../models/index";
require("dotenv").config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Nguyễn Đăng Thế Anh" <theanhcuacua@gmail.com>', // sender address
    to: dataSend.receiver, // list of receivers
    subject:
      dataSend.language === "vi"
        ? "Thông tin đặt lịch khám bệnh"
        : "Information to book a medical appointment", // Subject line
    html: getBodyHTMLEmail(dataSend),
  });
};

let getBodyHTMLEmail = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
    <h3>Xin chào ${dataSend.patientName}!</h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên The Anh Booking Website.</p>
    <p>Thông tin đặt lịch khám bệnh</p>
    <div><b>Thời gian: ${dataSend.time}</b></div>
    <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

    <p>Nếu thông tin trên là đúng, vui lòng click vào đường link phía dưới để xác nhận và hoàn tất đặt lịch với bác sĩ.</p>
    <div><a href=${dataSend.link} target="_blank">Nhấn để xác nhận</a></div>
    <div>Xin chân thành cảm ơn!</div>
    `; // html body
    return result;
  }
  if (dataSend.language === "en") {
    result = `
    <h3>Dear ${dataSend.patientName}!</h3>
    <p>You received this email because you booked an online medical appointment on The Anh Booking Website.</p>
    <p>Information to book a medical appointment</p>
    <div><b>Time: ${dataSend.time}</b></div>
    <div><b>Doctor: ${dataSend.doctorName}</b></div>

    <p>If the above information is correct, please click on the link below to confirm and complete the appointment with the doctor.</p>
    <div><a href=${dataSend.link} target="_blank">Click to confirm</a></div>
    <div>Sincerely thank!</div>
    `; // html body
    return result;
  }
};

module.exports = {
  sendSimpleEmail,
};
