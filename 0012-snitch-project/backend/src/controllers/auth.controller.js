export const apiController = (req, res) => {
  try {
    console.log("Welcome to Snitch Api");
    res.status(200).json({
      message: "Welcome to Snitch Api",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: "Interval Server error",
    });
  }
};
