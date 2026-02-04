const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const products = await mongodb
            .getDatabase()
            .db()
            .collection('products')
            .find({})
            .toArray();
        
        res.status(200).json(products);
    }  catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


const getSingle = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid product id' });
        }
        const productId = new ObjectId(req.params.id);
        const product = await mongodb
            .getDatabase()
            .db()
            .collection('products')
            .findOne({ _id: productId });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    }   catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createProduct = async (req, res) => {
    const product = {
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        rating: req.body.rating
    };
    const response = await mongodb.getDatabase().db().collection('products').insertOne(product);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the product.');
    }
};

const updateProduct = async (req,res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid product id to update a product.');
    }
    const productId = new ObjectId(req.params.id);
    const product = {
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    rating: req.body.rating
    };
    const response = await mongodb.getDatabase().db().collection('products').replaceOne({ _id: productId}, product);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    }
    else {
        res.status(500).json(response.error || 'Some error ocurred while updating the product.');
    }
};

const deleteProduct = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid product id to delete a product.');
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('products').deleteOne({ _id: userId });
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the product.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createProduct,
    updateProduct,
    deleteProduct
};