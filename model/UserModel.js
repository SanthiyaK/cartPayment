const { default: mongoose } = require("mongoose");


const UserSchema=new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})
const UserModels= mongoose.models.UserForm ||mongoose.model("UserForm",UserSchema)
export default UserModels;