const notFound=(req,res,next)=>{
    const error=new Error(`Not Found - ${req.originalUrl}-//${req.method}`);
    res.status(404);
    //here next it will سيمرر الخطأ الى تابع التعامل مع الخطأ التابع الذي بعده .
    next(error);
}
module.exports=notFound