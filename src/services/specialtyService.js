import db from "../models/index";
require("dotenv").config();

let createNewSpecialtyService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.nameVi ||
        !data.nameEn ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          message: "Missing required parameter!",
        });
      } else {
        await db.Specialty.create({
          nameVi: data.nameVi,
          nameEn: data.nameEn,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
        });
        resolve({
          errCode: 0,
          message: "Create new specialty successfully!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllSpecialtyService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Specialty.findAll();
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

module.exports = {
  createNewSpecialtyService,
  getAllSpecialtyService,
};
