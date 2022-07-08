const { MongoClient } = require('mongodb');


const mongo = {

    db:null,
    products: null,

    async connect (){
        // connected mongo db url
        const client = await new MongoClient(process.env.MONGO_DB_URL);
        await client.connect();
        console.log(`mongodb connected successfully ${process.env.MONGO_DB_URL}`);

        // connected mongo db name
        this.db = await client.db(process.env.MONGO_DB_NAME);
        console.log(`db name is ${process.env.MONGO_DB_NAME}`);

        // connected mongo db collection
        this.products = this.db.collection('products');
        console.log(`${process.env.MONGO_DB_NAME} collection initillized successfully`);
    }
}

module.exports = mongo;