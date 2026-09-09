export const apiController = (req, res) => {
  console.log("ok got it");
  res.status(200).json({
    message: "Welcome to authentication ap",
  });
};
