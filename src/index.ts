import express from 'express';
import cors from 'cors';
import {routes} from "./routes";
const PORT  = 8000;

const app = express();

app.use(express.json());
app.use(cors({
    origin:["http://loaclhost:3000"]
}))

routes(app);

app.listen(PORT,()=>{
    console.log(`Server is Listening at port ${PORT}`)
})