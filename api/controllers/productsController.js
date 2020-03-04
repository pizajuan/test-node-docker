class ProductsController {
    static getAllProducts(req, res, next){
        res.status(200).json({
            message: 'Handling GET requests to /products'
        });
    }
}


module.exports.ProductsController = ProductsController;