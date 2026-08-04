import {Schema, model} from "mongoose";


interface InterfaceUser {
    email:string
    password:string
    name:string
    subscriptionStatus: 'free' | 'trial' | 'active' | 'cancelled' | 'expired' | 'beta'
}

const userSchema = new Schema<InterfaceUser>(
    {
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true}, 
        name: {type: String, required: true},
        subscriptionStatus: {
            type: String, 
            default:'free',
            enum: ['free', 'trial' , 'active' , 'cancelled' , 'expired' , 'beta']
        },
    },
    {timestamps: true}
);

export const User = model<InterfaceUser>('User', userSchema);

