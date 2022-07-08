const ObjectId = require("mongodb").ObjectId;
const helper = require("../helper/products.helper");

const service = {
  async getAllProducts(req, res) {
    try {
      const data = await helper.find();
      res.send(data);
    } catch (error) {
      console.log("error:", error.message);
      res.status(500).send({ error: "cannot fetch data" });
    }
  },
  async getProductsById(req, res) {
    try {
      const data = await helper.findById(req.params.id);
      res.send(data);
    } catch (error) {
      console.log("error:", error.message);
      res.status(500).send({ error: `cannot fetch this id ${req.params.id}` });
    }
  },
  async createProducts(req, res) {
    try {
      // data validation
      const post = await helper.validate(req.body);
      // insert data
      const insertData = await helper.create(post);
      res.send(insertData);
    } catch (error) {
      console.log("error:", error.message);
      res.status(500).send({ error: "Incorrect data fetch try again" });
    }
  },
  async updateProducts(req, res) {
    try {
      // data validation
      const newPost = await helper.validate(req.body);
      // post validation
      const oldPost = await helper.findById(req.params.id);
      if (!oldPost)
        return res.status(400).send({ error: "product id invalid" });
      // update data
      const { value } = await helper.update({ _id: oldPost._id, ...newPost });
      res.send(value);
    } catch (error) {
      console.log("error:", error.message);
      res.status(500).send({ error: error.message });
    }
  },
  async deleteProducts(req, res) {
    try {
        const productsId  = await helper.findById(req.params.id);
        if(!productsId) return res.status(400).send({ error: "product id invalid" });

        await helper.deleteById(productsId._id);
        res.end();
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
  },
};

module.exports = service;
