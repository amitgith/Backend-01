export const apiController = (req, res) => {
  try {
    console.log("Welcome to authentication api");
    return res.status(200).json({
      message: "Welcome to authentication api",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Interval Server error",
    });
  }
};
