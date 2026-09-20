export const apiController = (req, res) => {
  try {
    console.log("Welcome to Snitch Integration Api");
    res.status(200).json({
      message: "Welcome to Snitch Integration Api ",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      errors: "Internal server error",
    });
  }
};
export const registerApiController = (req,res)=>{
    
}