import User from "../models/user.js";


// Create User
/**
 * Saves a new user object to the database.
 * @param {Object} user The user data to create a new document.
 * @returns {Promise<Object>} A promise that resolves to the newly created user document.
 */
export const createUser = async (user) => {
        const newUser = new User(user);
        const savedUser = await newUser.save();
        return savedUser;
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
    const result = await User.findByIdAndDelete(userId);
    return result;
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