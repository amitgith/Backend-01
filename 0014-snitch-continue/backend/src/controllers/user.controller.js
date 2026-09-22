export const apiController = (req, res) => {
  try {
    console.log("Welcome to Snitch Project Api");
    res.status(200).json({
      message: "Welcome to Snitch Project api",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      errors: "Internal server error",
    });
  }
};
export const registerApiController = async (req, res) => {
  const { email, name, password } = req.body;
};
