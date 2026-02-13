import userModel from "../models/users.schema.js"
import Userrepo from "../repo/users.repo.js";

export default class UserController{
    _userrepository;
    constructor(){
    this._userrepository=new Userrepo();
    }
}