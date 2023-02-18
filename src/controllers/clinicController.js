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

// let getAllSpecialty = async (req, res) => {
//   try {
//     let infor = await clinicService.getAllSpecialtyService();
//     return res.status(200).json(infor);
//   } catch (e) {
//     console.log(e);
//     return res.status(200).json({
//       errCode: -1,
//       message: "Error from server",
//     });
//   }
// };

// let getDetailSpecialtyById = async (req, res) => {
//   try {
//     let infor = await clinicService.getDetailSpecialtyService(req.query.id);
//     return res.status(200).json(infor);
//   } catch (e) {
//     console.log(e);
//     return res.status(200).json({
//       errCode: -1,
//       message: "Error from server",
//     });
//   }
// };

module.exports = {
  createNewClinic,
  // getAllSpecialty,
  // getDetailSpecialtyById,
};
