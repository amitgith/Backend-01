export const apiController = (req, res) => {
  try {
    console.log("Ok got it");
    res.status(200).json({
      message: "Welcome to authentication api",
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      message: "Authentication connection error",
    });
  }
};
