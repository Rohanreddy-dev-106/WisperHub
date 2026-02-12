import server from "./index.js";
import { MongoDBconnection } from "./src/config/mongodb.connection.js";
const PORT = process.env.PORT
server.listen(PORT, () => {
    MongoDBconnection();
    console.log(`Server is Up and Running at PORT ${PORT}`);

})