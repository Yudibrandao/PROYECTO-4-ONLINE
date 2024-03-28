import { TokenData } from "./types";

declare global {
    //Express
    namespace Express {
        export interface Request {
            //definition of the atributte tokenData fot the request
            tokenData:TokenData
        }
    }
}