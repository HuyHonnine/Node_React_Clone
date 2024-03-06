import * as services from "../services/post";

export const getPostController = async (req, res) => {
  try {
    const response = await services.getPostService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};

export const getPostPaginationController = async (req, res) => {
  const { page, ...query } = req.query;
  try {
    const response = await services.getPostPaginationService(page, query);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};
