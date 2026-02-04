const validator = require('../helpers/validate');

const saveProduct = (req, res, next) => {
    const validationRule = {
        name: 'required|string',
        category: 'required|string',
        price: 'required|integer',
        rating: 'required|numeric'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveInventory = (req, res, next) => {
    const validationRule = {
        productId: 'required|string',
        stock: 'required|integer',
        warehouse: 'required|string',
        lastUpdated: 'required|date'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveProduct,
    saveInventory
};