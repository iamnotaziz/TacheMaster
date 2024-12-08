import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    username :{
        type:String,
        required : [true,"Username is required"],
    },
    email :{
        type:String,
        required : [true,"Email is required"],
        unique: true
    },
    password :{
        type:String,
        required: [true,"Password is required"],
    },
    role: { 
        type: String, 
        enum: ['commercial', 'client'], 
        required: true 
    },
    phone :{
        type:Number,
        required: [true, "Phone number is required"]
    }, 
    cin :{
        type:Number,
        required: [true, "CIN is required"]
    },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }], 
    feedbacks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feedback' }],
    image: {
        type: String, 
        default: 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg', 
    }
},
{
    timestamps:true,
});

const User = mongoose.model("User",userSchema);

export default User;
