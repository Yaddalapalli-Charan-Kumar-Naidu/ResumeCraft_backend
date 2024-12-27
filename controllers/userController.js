export const profile=async(req,res)=>{
    res.status(200).json({
        id:req.user.id,
        email:req.user.email
    })
}