import db from "../models/index";
require("dotenv").config();

let createNewClinicService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown ||
        !data.address
      ) {
        resolve({
          errCode: 1,
          message: "Missing required parameter!",
        });
      } else {
        await db.Clinic.create({
          name: data.name,
          address: data.address,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
        });
        resolve({
          errCode: 0,
          message: "Create new clinic successfully!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

// let getAllSpecialtyService = (data) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let data = await db.Specialty.findAll();
//       if (data && data.length > 0) {
//         data.map((item) => {
//           item.image = new Buffer(item.image, "base64").toString("binary");
//           return item;
//         });
//       }
//       resolve({
//         errCode: 0,
//         message: "Ok",
//         data,
//       });
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// let getDetailSpecialtyService = (inputId) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (!inputId) {
//         resolve({
//           errCode: 1,
//           message: "Missing required parameter!",
//         });
//       } else {
//         let data = await db.Specialty.findOne({
//           where: {
//             id: inputId,
//           },
//           attributes: ["descriptionHTML", "nameVi", "nameEn"],
//         });
//         if (data) {
//           let doctorSpecialty = await db.Doctor_infor.findAll({
//             where: {
//               specialtyId: inputId,
//             },
//             attributes: ["doctorId", "provinceId"],
//           });
//           data.doctorSpecialty = doctorSpecialty;
//         } else data = {};

//         resolve({
//           errCode: 0,
//           message: "Ok",
//           data,
//         });
//       }
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

module.exports = {
  createNewClinicService,
  // getAllSpecialtyService,
  // getDetailSpecialtyService,
};
