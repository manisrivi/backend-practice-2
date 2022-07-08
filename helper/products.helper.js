const joi = require('joi');
const db = require('../shared/mongo');
const ObjectId = require('mongodb').ObjectId;

// validate products details
const schema = joi.object({
    name: joi.string().required(),
    image: joi.string().required(),
    price: joi.string().required(),
})

const helper = {

    validate(post){
        try {
            return schema.validateAsync(post);
        } catch ({ details: [{ message }] }) {
            throw new Error(message);
        }
    },

    find(){
        return db.products.find().toArray();
    },
    findById(_id){
        return db.products.findOne({ _id: ObjectId(_id) })
    },
    create(post){
        return db.products.insertOne(post)
    },
    update({ _id, ...post }){
        return db.products.findOneAndUpdate(
            { _id: ObjectId(_id) },
            { $set: post },
            { returnDocument: 'after' }
        )
    },
    deleteById(_id){
        return db.products.deleteOne({ _id: ObjectId(_id)})
    }
}

module.exports = helper;