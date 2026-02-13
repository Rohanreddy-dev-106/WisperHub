import server from "./index.js";
import { MongoDBconnection } from "./src/config/mongodb.connection.js";
import generateAnonymousId from "./src/util/generateAnonymousId.js";
const PORT = process.env.PORT
server.listen(PORT, async() => {
    MongoDBconnection();
    console.log(`Server is Up and Running at PORT ${PORT}`);
       const username = await generateAnonymousId();
       
    console.log("Generated Unique_id:", username);

})