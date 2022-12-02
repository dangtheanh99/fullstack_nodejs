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
let getSchoolPage = (req, res) => {
  return res.render("test/university.ejs");
};

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  getSchoolPage: getSchoolPage,
};
