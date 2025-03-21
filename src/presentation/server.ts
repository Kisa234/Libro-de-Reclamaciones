import express, { Router } from 'express'
import cors from 'cors'

interface Options{
    port: number;
    router:Router;
    public_path: string;
}

export class Server {
    private app = express();
    private readonly port: number;
    private readonly public_path: string;
    private readonly router: Router;

    constructor(options: Options) {
        const { port, public_path } = options;
        this.port = port;
        this.public_path = public_path;
        this.router = options.router
    }


    async start(){

        // Middlewares
        this.app.use(express.json()); //raw json
        this.app.use(express.urlencoded({extended: true})); // x-www-form-urlencoded

       
        //CORS
        this.app.use(cors());
        
        // ROUTES
        this.app.use(this.router);


        
        

        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });

    }

}