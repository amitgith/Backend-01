import urlModel from "../models/url.model.js";
import generateCode from "../utils/generateCode.js";

export const createApiController = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({
        error: "Please enter a URL",
      });
    }
    if (
      url.startsWith("http://") == false &&
      url.startsWith("https://") == false
    ) {
      return res.status(400).json({
        error: "Please enter a valid URL starting with http:// or https://",
      });
    }
    if (url.length > 2048) {
      return res.status(400).json({
        error: "Url is too long",
      });
    }
    const code = generateCode();
    const newUrl = await urlModel.create({
      originalUrl: url,
      shortCode: code,
    });
    return res.status(201).json({
      message: "Url shotened successfully",
      data: {
        originalUrl: newUrl.originalUrl,
        shortCode: newUrl.shortCode,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
};

export const getAllApiController = async (req, res) => {
  try {
    const urls = await urlModel.find();
    return res.status(200).json({
      message: "Url fetched successfully",
      data: {
        urls,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const redirectApiController = async (req, res) => {
  const { code } = req.params;
  const url = await urlModel.findOne({
    shortCode: code,
  });
  if (!url) {
    return res.status(404).json({ error: "Url not found" });
  }
  res.redirect(302, url.originalUrl);
  await urlModel.findOneAndUpdate(
    {
      shortCode: code,
    },
    {
      $inc: { clicks: 1 },
    },
  );
};
export const deleteApiController = async (req, res) => {
  try {
    const codeId = req.params.id;
    await urlModel.findByIdAndDelete(codeId);
    return res.status(200).json({
      message: "Url deleted successfully",
      data: {
        codeId,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal server error ",
    });
  }
};
export const getSingleApiController = async (req, res) => {
  try {
    const urlId = req.params.id;
    const url = await urlModel.findOne({ urlId });
    if (!url) {
      return res.status(400).json({
        error: "Url not found",
      });
    }
    return res.status(200).json({
      message: "Single URL fetehed successfully",
      data: {
        url,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal  server error ",
    });
  }
};
