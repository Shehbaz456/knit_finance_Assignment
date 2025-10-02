import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
console.log(process.env.PORT);

import connect_DB from "./db/index.js";
import { app } from "./app.js";

const PORT = process.env.PORT || 8000;

connect_DB().then(() => {
    app.listen(PORT, () => console.log(`Active connection at Port: ${PORT}`) );
}).catch((err) => console.log("mongoDB Connection failed ", err));
