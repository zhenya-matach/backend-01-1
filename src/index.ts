import express, {Request, Response} from 'express'
const app = express()
const port = 3000

const products = [{title: 'tomato'},{title: 'orange'}];
const addresses = [{value: 'Nezalezhnasti 12'},{value: 'Selickaga 11'}];

app.get('/products', (req: Request, res: Response) => {
    res.send(products);
})

app.get('/addresses', (req: Request, res: Response) => {
    res.send(addresses);
})
app.get('/', (req: Request, res: Response) => {
    let helloMassage = 'Hello World!!!';
    res.send(helloMassage);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})