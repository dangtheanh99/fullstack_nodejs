import db from "../models/index";
require("dotenv").config();

let createNewHandbookService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.image ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          message: "Missing required parameter!",
        });
      } else {
        await db.Handbook.create({
          name: data.name,
          image: data.image,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
        });
        resolve({
          errCode: 0,
          message: "Create new handbook successfully!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllHandbookService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Handbook.findAll();
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
          return item;
        });
      }
      resolve({
        errCode: 0,
        message: "Ok",
        data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getDetailHandbookService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          message: "Missing required parameter!",
        });
      } else {
        let data = await db.Handbook.findOne({
          where: {
            id: inputId,
          },
          attributes: ["descriptionHTML", "name", "descriptionMarkdown"],
        });
        // if (data) {
        //   let doctorClinic = await db.Doctor_infor.findAll({
        //     where: {
        //       clinicId: inputId,
        //     },
        //     attributes: ["doctorId", "provinceId"],
        //   });
        //   data.doctorClinic = doctorClinic;
        // } else data = {};

        resolve({
          errCode: 0,
          message: "Ok",
          data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewHandbookService,
  getAllHandbookService,
  getDetailHandbookService,
};
