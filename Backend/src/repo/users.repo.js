import userModel from "../models/users.schema.js";

export default class UserRepository {

  async register(data) {
    try {
      const user = new userModel(data)
      await user.save();
      return user;

    } catch (error) {
      if (error.code === 11000) {
        throw new Error("USER_ALREADY_EXISTS");
      }
      throw error;
    }
  }

  async findUser(uniqueId) {
    if (!uniqueId) {
      throw new Error("UNIQUE_ID_REQUIRED");
    }

    try {
      return await userModel.findOne({ Uniqueid: uniqueId });
    } catch (error) {
      throw error;
    }
  }
}