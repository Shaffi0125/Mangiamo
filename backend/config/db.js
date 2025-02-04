import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://shaffi:HouSeGHAr@cluster0.2zzsd.mongodb.net/food-del').then(() => console.log("DB Connected"));
}