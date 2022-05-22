import express from 'express';
import cors from 'cors';
import {routes} from "./routes";
import {createConnection} from "typeorm";


const PORT  = 8000;

  createConnection().then((connection)=>
    {
        const app = express();

        app.use(express.json());
        app.use(cors({
            origin: ["http://loaclhost:3000"]
        }))

        routes(app);

        app.listen(PORT, () => {
            console.log(`Server is Listening at port ${PORT}`)
        })
    }).catch(err=>console.error({err}))

