const isAdmin = (req,res,next)=>{

 if(req.user.rol !== "admin"){
   return res.status(403).json({
      error:"Solo administradores pueden hacer esto"
   });
 }

 next();
};

module.exports = isAdmin;