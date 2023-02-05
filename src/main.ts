import express, {Request, Response} from "express";
import Order from "./domain/Order";
import Cpf from "./domain/Cpf";

const api = express();
api.use(express.json())
api.listen(8080);

api.post('/checkout', function (request: Request, response: Response) {
    try {
        const order = new Order(new Cpf(request.body.order.document));
    } catch (exception: any) {
        const output: Output = {
            message: exception.message
        }
        return response.json(output)
    }
});

type Output = {
  message: string
};