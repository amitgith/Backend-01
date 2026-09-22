export const authenticate = (req, res, next) => {
  const accessToken = req.headers.Authorization?.split(" ")[1];
  if(!accessToken){
    return res.status(400).json({
        message:"Access token not found "
    })
  }
};
