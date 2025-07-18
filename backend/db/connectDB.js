import mongoose from "mongoose";

const connectDB = async (url) => {

    try{
        await mongoose.connect(url)
        .then(()=>{
            console.log("Connected to Database");
        }) .catch((e)=>{
            console.error("Try Connecting to Db Again");
        })
    } catch(e){
        console.error(`Failed Connecting to Database ${e}`);
        process.exit(1);
    }

}

export default connectDB;