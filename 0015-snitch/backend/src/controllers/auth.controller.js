export const apiController = (req, res) => {
  try {
    res.status(200).json({
      message: "Welcome to snitch project api",
    });
    console.log("Welcome to snitch project api");
  } catch (error) {
    console.log(error.message);
  }
};
