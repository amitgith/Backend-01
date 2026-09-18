export const apiController = (req, res) => {
  try {
    console.log("Welcome to Validators Api");
    res.status(200).json({
      message: "Welcome to Validators Api",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
export const registerApiController = (req, res) => {};
