import express from "express";

let getHomePage = (req, res) => {
  return res.render("homePage.ejs");
};
let getAboutPage = (req, res) => {
  return res.render("aboutPage.ejs");
};
let getSchoolPage = (req, res) => {
  return res.render("test/university.ejs");
};

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getSchoolPage: getSchoolPage,
};
