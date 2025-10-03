import  express  from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app =express();

app.use(cors({
    origin : ["https://knit-finance-assignment.vercel.app"],
    methods:["GET","HEAD","PUT","PATCH","POST","DELETE"],
    credentials:true,
}))


app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


// Router import
import userRouter from "./routes/user.routes.js";
import noteRouter from "./routes/note.routes.js";
import healthcheckRouter from "./routes/healthcheck.routes.js";
// import dashboardRouter from "./routes/dashboard.routes.js";

// Routers declaration
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/users",userRouter);
app.use("/api/v1/notes",noteRouter);
// app.use("/api/v1/dashboard", dashboardRouter);

export { app }