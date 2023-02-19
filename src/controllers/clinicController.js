import clinicService from "../services/clinicService";

let createNewClinic = async (req, res) => {
  try {
    let infor = await clinicService.createNewClinicService(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

let getAllClinic = async (req, res) => {
  try {
    let infor = await clinicService.getAllClinicService();
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

let getDetaiClinicById = async (req, res) => {
  try {
    let infor = await clinicService.getDetailClinicService(req.query.id);
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
  createNewClinic,
  getAllClinic,
  getDetaiClinicById,
};
