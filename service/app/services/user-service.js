import User from "../models/user.js";
import Patient from "../models/patient.js";
import MedicalRequest from "../models/medicalrequest.js";


// Create User
/**
 * Saves a new user object to the database.
 * @param {Object} user The user data to create a new document.
 * @returns {Promise<Object>} A promise that resolves to the newly created user document.
 */
export const createUser = async (user) => {
    if (user.role == "patient") {
        // create the user, then create the patient
        let savedUser = {}
        try {
            // create the user
            const newUser = new User(user);
            savedUser = await newUser.save();
        } catch (error) {
            console.error('Error creating user:', error.message);
        }
        try {
            // create the patient
            const newPatient = new Patient({ patientId: savedUser._id });
            const savedPatient = await newPatient.save();
        } catch (error) {
            console.error('Error creating patient:', error.message);
        }
        return savedUser;
    }
    // if (role == "doctor") {
    //     // create the user
    //     // create the doctor
    //     const newUser = new User(user);
    //     const savedUser = await newUser.save();
    //     const newDoctor = new Doctor({doctorId:savedUser._id})
    //     const savedDoctor = await newDoctor.save();
    //     return savedUser;
    // }
    // if (role == "lab") {
    //     // create the user
    //     // create the lab
    //     const newUser = new User(user);
    //     const savedUser = await newUser.save();
    //     const newLab = new Lab({labId:savedUser._id})
    //     const savedLab = await newLab.save();
    //     return savedUser;
    // }
};

// Get All
/**
 * Retrieves all notes
 * @param {*} params 
 * @returns 
 */
export const getAll = async () => {
    const users = await User.find();
    return users;
}

/**
 * Updates a single user object based on its ID.
 * @param {String} userId - The ID of the user to update.
 * @param {Object} updatedUserData - The data to update in the user's document.
 * @returns {Promise<Object>} A promise that resolves to the updated user document, or null if no document was found.
 */
export const updateUser = async (userId, updatedUserData) => {
    const uodatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
    return uodatedUser;
};

/**
 * Deletes a user from the database by their ID.
 * @param {String} userId The ID of the user to delete.
 * @returns {Promise<Object>} A promise that resolves to the result of the deletion operation.
 */
export const deleteUser = async (userId) => {
    const user = await User.findById(userId);
    console.log("user:", user)
    if (user.role == "patient") {
        // delete all medical requests associated with the patient
        // delete all lab requests associated with the patient
        // delete the patient
        // delete the user
        const patientMedicalRequestDeletionResult = await MedicalRequest.deleteMany({ patientId: userId })
        const patientDeletionResult = await Patient.deleteOne({ patientId: userId });
        const userDeletionResult = await User.findByIdAndDelete(userId);
        return userDeletionResult;
    }
    // if (role == "doctor") {
    //     // delete all medical requests associated with the doctor
    //     // delete all events associated with the doctor
    //     // delete all blogs associated with the doctor
    //     // delete the doctor
    //     // delete the user
    //     const patientMedicalRequestDeletionResult = await MedicalRequest.deleteMany({ patientId: userId })
    //     const patientDeletionResult = await Patient.deleteOne({ patientId: userId });
    //     const userDeletionResult = await User.findByIdAndDelete(userId);
    //     return userDeletionResult;
    // }
    // if (role == "lab") {
    //     // delete all lab requests associated with the lab
    //     // delete all events associated with the lab
    //     // delete all blogs associated with the lab
    //     // delete the lab
    //     // delete the user
    //     const patientMedicalRequestDeletionResult = await MedicalRequest.deleteMany({ patientId: userId })
    //     const patientDeletionResult = await Patient.deleteOne({ patientId: userId });
    //     const userDeletionResult = await User.findByIdAndDelete(userId);
    //     return userDeletionResult;
    // }
    
};

/**
 * Deletes all users
 * @returns {Promise<Object>} A promise that resolves to the result of the deletion operation.
 */
export const deleteAll = async() => {
    const user = await User.deleteMany();
    return user;
}

/**
 * Retrieves a single user object by ID.
 * @param {String} userId The unique identifier for the user.
 * @returns {Promise<Object>} A promise that resolves to a user object, or null if not found.
 */
export const getById = async (userId) => {
    const user = await User.findById(userId);
    return user;
}