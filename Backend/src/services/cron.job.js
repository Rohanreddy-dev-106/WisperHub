import cron from "node-cron";

const UpdateBan=async()=>{
    try{
        console.log(new Date());
    }
    catch(error){
        console.log(error.message);
        
    }
    
}

export const startBanCron = () => {
  cron.schedule("0 0 0 * * *", UpdateBan); //run every day at 12 AM
};