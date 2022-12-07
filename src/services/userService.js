import db from "../models/index";
import bcrypt from "bcryptjs";

let handleUserLoogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        // user exist
        // compare password
        resolve();
      } else {
        // return error
        userData.errCode = 1;
        userData.errMessage = `Your email doesn't exist in the system. Please try other email!`;
        resolve(userData);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let compareUserPass = () => {
  return new Promise(async (resolve, reject) => {
    try {
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          email: userEmail,
        },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLoogin,
};
