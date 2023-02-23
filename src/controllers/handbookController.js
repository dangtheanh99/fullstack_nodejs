import handbookService from "../services/handbookService";

let createNewHandbook = async (req, res) => {
  try {
    let infor = await handbookService.createNewHandbookService(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

let getAllHandbook = async (req, res) => {
  try {
    let infor = await handbookService.getAllHandbookService();
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

let getDetaiHandbookById = async (req, res) => {
  try {
    let infor = await handbookService.getDetailHandbookService(req.query.id);
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
  createNewHandbook,
  getAllHandbook,
  getDetaiHandbookById,
};
