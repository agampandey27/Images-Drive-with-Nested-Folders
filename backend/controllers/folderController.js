import { Folder } from "../models/Folder.model.js";

//folder creation controller
export const createFolder = async (req ,res) =>{
    try{
        const {name , parent} = req.body;

        const newfolder = new Folder({
            name ,
            parent : parent || null,
            owner : req.user.id
        })

        const saved = await newfolder.save();
        
        return res.status(201).json({
            message : "Folder Created Successfully",
            saved
        })

    }catch(e){
        return res.status(500).json({
            message: "Failed to Create folder",
            error : e.message
        })
    }
}

//get all user folders controller
export const getUserFolders = async (req , res) =>{
    try{
        const folders = await Folder.find({owner : req.user.id});
        return res.status(201).json({
            folders,
        })
    } catch (e) {
        return res.status(500).json({
            message : `Failed Searching for users folders`,
            error : e.message
        })
    }
}

//get users root folders
export const getUserRootFolders = async (req , res) =>{
    try{
        const folders = await Folder.find({
            owner:req.user.id,
            parent : null
        }) 
        return res.status(201).json({
            folders
        })
    }catch(e){
        return res.status(500).json({
            message : "Failed Loading Server",
            error : e.message
        })
    }
}

//get parent-child folders only
export const getParentsSubFolders = async(req , res) =>{
    try{
        const parentId = req.params.parentId ;
        // console.log(parentId);

        // console.log(req.user.id)
        // console.log(req.params.parentId)
        const folders = await Folder.find({
            owner : req.user.id,
            parent : parentId
        })

        return res.status(201).json({
            folders
        })

    } catch(e){
        return res.status(500).json({
            message : "Couldn't load sub folders",
            error : e.message
        })
    }
}