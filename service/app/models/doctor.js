import mongoose from "mongoose";


const Schema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true        
    },
    name: {
        type: String,
        required: true        
    },
    phone : {
        type: String,
        required: true,
    },
    address: {
        street: { type: String, required: false },
        city: { type: String, required: false },
        state: { type: String, required: false },
        country: { type: String, required: false },
        zip: { type: String, required: false }
    },
    gender: {
        type: String,
        required: true
    },
    languagePreference: {
        type: String,
        required: true
    } ,   

    dob: {
        type: Date,
        required: true  
      },
      qualifications: {
        type: String,
        required: true
    } 
});


const model = mongoose.model('doctor', Schema);

export default model; 