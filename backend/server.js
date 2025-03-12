import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import path from "path";
import { fileURLToPath } from "url";
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//app config
const app = express();
const port = 4000; // port on which our server will run

// middleware
app.use(express.json());
app.use(cors({
    origin: ["https://shaffi0125.github.io", "http://localhost:5173"],
    credentials: true
})); // we can acess any backend from the frontend using cors

// db connection
connectDB();


// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

//adding path for serving admin-frontend build
app.use(express.static(path.join(__dirname, '../admin/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../admin/dist', 'index.html'));
});

app.get("/", (req, res) => {
    res.send("API Working");
});// http method used to request the data from the server

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});
