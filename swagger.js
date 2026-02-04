const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'User Api',
        description: 'Users Api'
    },
    host: 'localhost:8034',
    schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = [
    './routes/index.js',
    './routes/products.js',
    './routes/inventory.js'
];


swaggerAutogen(outputFile, endpointsFiles, doc);