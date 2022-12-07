import express from "express";
import db from "../models/index";
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homePage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};
let getAboutPage = (req, res) => {
  return res.render("aboutPage.ejs");
};
let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};
let postCRUD = async (req, res) => {
  let message = await CRUDService.creatNewUser(req.body);
  console.log(message);
  return res.send("Post CRUD from Server.");
};
let displayCRUD = async (req, res) => {
  let data = await CRUDService.getAllUser();
  console.log("-----------");
  console.log(data);
  console.log("-----------");
  return res.render("displayCrud.ejs", {
    data,
  });
};

let editCRUD = async (req, res) => {
  let userId = req.query.id;
  console.log(userId);
  if (userId) {
    let userData = await CRUDService.getUserById(userId);
    // check user data not found
    // console.log("userData: ", userData);
    return res.render("editCrud.ejs", {
      user: userData,
    });
  } else {
    return res.send("Not found user!");
  }
};
let getSchoolPage = (req, res) => {
  return res.render("test/university.ejs");
};

let putCRUD = async (req, res) => {
  let data = req.body;
  let allUsers = await CRUDService.updateUser(data);
  return res.render("displayCrud.ejs", {
    data: allUsers,
  });
};
let deleteCRUD = async (req, res) => {
  let id = req.query.id;
  if (id) {
    await CRUDService.deleteUserById(id);
    return res.send("Deleted done!");
  } else {
    return res.send("Not found user!");
  }
};

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  getSchoolPage: getSchoolPage,
  displayCRUD: displayCRUD,
  editCRUD: editCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
};

// Viet API
/*

*/
