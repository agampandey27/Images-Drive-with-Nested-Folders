import cloudinary from '../utils/cloudinary.js';
import Image from '../models/Image.model.js';

export const uploadImage = async (req , res)=>{
    try{
        const {name} = req.body;
        const folderId = req.params.folderId;

        // console.log(folderId);
        if(!req.file){
            return res.status(400).json({
                message : "Image file is Required"
            })
        }

        const result = await new Promise ((resolve, reject)=>{
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder : "user_images",
                    resource_type : "image"
                },
                (error,result) => {
                    if(error) return reject(error);
                    return resolve(result);
                }
            )
            stream.end(req.file.buffer);
        })

        const image = new Image({
            name ,
            url : result.secure_url,
            owner : req.user.id,
            folder : folderId
        });

        await image.save();

        return res.status(201).json({
            message : "image uploaded",
            image
        })
    
    } catch (e){
        return res.status(500).json({
            message: "Image Upload Failed",
            error : e.message
        })
    }
}

//get image by folders 
export const getImageByFolder = async (req ,res)=>{
    try{
        const folderId = req.params.folderId;
        const images = await Image.find({
            owner : req.user.id,
            folder : folderId
        })

        return res.status(201).json({
            images
        })
    } catch (e){
        return rs.status(500).json({
            message : "Error loading images in this folder",
            error : e.message
        })
    }
}

//search Image controller 
export const searchImage = async (req ,res)=>{
    try{
        const query = req.query.query;
        // console.log(query);

        const image = await Image.find({
            owner : req.user.id,
            name : {
                $regex : query,
                $options : 'i'
            }
        });

        return res.status(201).json({
            image
        })
    } catch (e){
        return res.status(500).json({
            message : "Search didn't work",
            error : e.message
        })
    }
}