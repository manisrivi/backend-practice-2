require('dotenv').config();

const express = require('express');
const middleware = require('./shared/middleware');
const mongo = require('./shared/mongo');
const route  = require('./routes/index');


const PORT = process.env.PORT || 6987
const app = express();

(async()=> {
    try {
        await mongo.connect();

        // middleware
        app.use(express.json());
        app.use(middleware.logging);
        app.use(middleware.maintenance);
        console.log('middleware initillized sucessfully');

        // routes
        app.get('/', (req, res)=> res.send('hello world'));
        app.use('/products', route.products);
        console.log('routes initillized sucessfully');

        // port
        app.listen(process.env.PORT, ()=> console.log(`server listening at a ${process.env.PORT}`))

    } catch (error) {
        console.log('error starting application', error.message);
    }
})();
