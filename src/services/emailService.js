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
    from: '"Your Health" <theanhcuacua@gmail.com>', // sender address
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
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Your Health.</p>
    <p>Thông tin đặt lịch khám bệnh</p>
    <div><b>Thời gian: ${dataSend.time}</b></div>
    <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
    <div><b>Lí do khám: ${dataSend.reason}</b></div>

    <p>Nếu thông tin trên là đúng, vui lòng click vào đường link phía dưới để xác nhận và hoàn tất đặt lịch với bác sĩ.</p>
    <div><a href=${dataSend.link} target="_blank">Nhấn để xác nhận</a></div>
    <div>Xin chân thành cảm ơn!</div>
    `; // html body
    return result;
  }
  if (dataSend.language === "en") {
    result = `
    <h3>Dear ${dataSend.patientName}!</h3>
    <p>You received this email because you booked an online medical appointment on Your Health.</p>
    <p>Information to book a medical appointment</p>
    <div><b>Time: ${dataSend.time}</b></div>
    <div><b>Doctor: ${dataSend.doctorName}</b></div>
    <div><b>Reason for examination: ${dataSend.reason}</b></div>

    <p>If the above information is correct, please click on the link below to confirm and complete the appointment with the doctor.</p>
    <div><a href=${dataSend.link} target="_blank">Click to confirm</a></div>
    <div>Sincerely thank!</div>
    `; // html body
    return result;
  }
};

let sendAttachment = async (dataSend) => {
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
    from: '"Your Health" <theanhcuacua@gmail.com>', // sender address
    to: dataSend.email, // list of receivers
    subject:
      dataSend.language === "vi" ? "Kết quả khám bệnh" : "Examination results", // Subject line
    html: getBodyHTMLEmailRemedy(dataSend),
    attachments: {
      // encoded string as an attachment
      filename: `${dataSend.patientName}-${dataSend.timeType}.text`,
      content: dataSend.imageBase64.split("base64,")[1],
      encoding: "base64",
    },
  });
};

let getBodyHTMLEmailRemedy = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
    <h3>Xin chào ${dataSend.patientName}!</h3>
    <p>Bạn nhận được email này vì đã đến khám bệnh theo lịch đặt trên website Your Health.</p>
    <p>Thông tin đơn thuốc và hóa đơn được gửi trong file đính kèm.</p>
    <div>Xin chân thành cảm ơn!</div>
    `; // html body
    return result;
  }
  if (dataSend.language === "en") {
    result = `
    <h3>Dear ${dataSend.patientName}!</h3>
    <p>You received this email because you went to the appointment scheduled on Your Health website.</p>
    <p>Prescription information and invoices are sent in the attachment.</p>
    <div>Sincerely thank!</div>
    `; // html body
    return result;
  }
};

module.exports = {
  sendSimpleEmail,
  sendAttachment,
};
