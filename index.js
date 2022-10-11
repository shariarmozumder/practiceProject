let express=require("express");
let multer = require("multer");
let app = express();

//fileUpload
let storage= multer.diskStorage({
    destination:(req,file,callBack)=>{
        callBack(null,"./uploads")
    },

    filename:(req,file,callBack)=>{
        callBack(null,file.originalname)

    }
});
const fileFilter =(req,file,cb)=>{
    if(file.mimetype === "image/jpg" || file.mimetype === "image/png"){
        cb(null,true)

    }
    else{
        cb(null,false)
    }

}
let uploads = multer({storage:storage,
limits:{
    fieldSize : 1024 * 1024 *5
},
fileFilter:fileFilter
}).single("photoup")
app.post("/uploads",(req,res)=>{
    
   uploads(req,res,(err)=>{
       if(err){
           res.send("File Upload Faield")
       }
       else{
    
           res.end("File Upload Success")
       }
   })
})
app.listen(8000,()=>{
    console.log("Server Run Success")
})
