export const apiController = (req, res) => {
  try {
    res.status(200).json({
      message: "Welcome to Snitch Project Api",
    });
    console.log("Welcome to Snitch Project Api");
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
