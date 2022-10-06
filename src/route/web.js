import express from "express";
import homeController from "../controllers/homeController";
let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/uni", homeController.getSchoolPage);

  //   router.get("/theanh", (req, res) => {
  //     return res.send("My name is The Anh");
  //   });
  return app.use("/", router);
};

module.exports = initWebRoutes;
