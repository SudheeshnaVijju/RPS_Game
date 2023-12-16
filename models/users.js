import mongoose, { Types } from "mongoose";
const schema = mongoose.Schema

const user = new schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    pwd:{
        type:String,
        required:true
    },
    total:{
        type:Number,
        required:true
    },
    win:{
        type:Number,
        required:true
    },
    lose:{
        type:Number,
        required:true 
    },
    winrate:{
        type:Types.Decimal128,
        required:true
    }
})
export default mongoose.model('users',user)