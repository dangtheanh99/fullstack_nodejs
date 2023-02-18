import specialtyService from "../services/specialtyService";

let createNewSpecialty = async (req, res) => {
  try {
    let infor = await specialtyService.createNewSpecialtyService(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

let getAllSpecialty = async (req, res) => {
  try {
    let infor = await specialtyService.getAllSpecialtyService();
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

let getDetailSpecialtyById = async (req, res) => {
  try {
    let infor = await specialtyService.getDetailSpecialtyService(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

module.exports = {
  createNewSpecialty,
  getAllSpecialty,
  getDetailSpecialtyById,
};
