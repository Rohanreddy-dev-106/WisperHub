import Audiencerepository from "../repo/follow.repo.js";
export default class AudienceController{
    _Audiencerepo;
    constructor(){
        this._Audiencerepo=new Audiencerepository();
    }
    async Follow(req,res,next){

    }
    async Unfollow(req,res,next){
        
    }
}