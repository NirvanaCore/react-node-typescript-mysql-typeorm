import { Response, Request } from "express";
import multer from "multer";
import path from "path";

export const Upload = (req:Request,res:Response) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads')
        },
        filename: function (req, file, cb) {
            const randomName = Math.random().toString(20).substr(2,12);
            cb(null, `${randomName}${path.extname(file.originalname)}`
                // + '-' + Date.now()
            )
        }
    })

    const upload = multer({storage}).single('image');

    upload(req,res,(err)=>{

        if(err){
            return res.send(400).send(err)
        }
        res.send({
            url:`http://localhost:8000/api/uploads/${req.file.filename}`
        })
    })
}