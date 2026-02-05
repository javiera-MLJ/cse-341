const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb
            .getDatabase()
            .db()
            .collection('inventory')
            .find()
            .toArray();

        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

const getSingleByInventory = async (req, res) => {
    try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json('Invalid inventory id');
        }

        const result = await mongodb
            .getDatabase()
            .db()
            .collection('inventory')
            .findOne({ _id: new ObjectId(id) });

        if (!result) {
            return res.status(404).json('Inventory not found');
        }

        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

// GET by PRODUCT ID 👇 (ESTA ES LA NUEVA)
const getSingleByProduct = async (req, res) => {
    try {
        const productId = req.params.productId;

        if (!ObjectId.isValid(productId)) {
            return res.status(400).json('Invalid product id');
        }

        const result = await mongodb
            .getDatabase()
            .db()
            .collection('inventory')
            .findOne({ productId: new ObjectId(productId) });

        if (!result) {
            return res.status(404).json('Inventory not found for this product');
        }

        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

const createStock = async (req, res) => {
    try {
        const productId = req.body.productId;

        if (!ObjectId.isValid(productId)) {
            return res.status(400).json('Invalid productId');
        }

        const product = await mongodb
            .getDatabase()
            .db()
            .collection('products')
            .findOne({ _id: new ObjectId(productId) });

        if (!product) {
            return res.status(404).json('Product does not exist');
        }

        const inventory = {
            productId: new ObjectId(req.body.productId),
            stock: req.body.stock,
            warehouse: req.body.warehouse,
            lastUpdated: req.body.lastUpdated
        };

        const existingInventory = await mongodb
            .getDatabase()
            .db()
            .collection('inventory')
            .findOne({ productId: new ObjectId(productId) });

        if (existingInventory) {
            return res.status(409).json('Inventory already exists for this product');
        }

        const response = await mongodb.getDatabase().db().collection('inventory').insertOne(inventory);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the stock.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

const updateStock = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid product id to update a product inventory.');
        }
        const productId = new ObjectId(req.params.id);
        const inventory = {
            productId: productId,
            stock: req.body.stock,
            warehouse: req.body.warehouse,
            lastUpdated: req.body.lastUpdated
        };
        const response = await mongodb.getDatabase().db().collection('inventory').replaceOne({ productId: productId }, inventory);
        console.log(response);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the stock.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

const deleteStock = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid product id to delete a product.');
        }
        const inventoryId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('inventory').deleteOne({ _id: inventoryId }, true);
        console.log(response);
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the product inventory.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAll,
    getSingleByInventory,
    getSingleByProduct,
    createStock,
    updateStock,
    deleteStock
};