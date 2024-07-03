const Product = require('../models/Product.model');
const auth = require('../middlewares/auth');

const getAllProducts = async (req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).send({data: products, message: "Success"});
    }catch(error){
        res.status(500).send({message: error.message});
    }   
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).send("Product not found");
        } else {
            return res.status(200).send({ data: product, message: "Product retrieved successfully" });
        }
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

const addProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);

        if (!newProduct) {
            return res.status(400).send("Bad request");
        } else {
            return res.status(200).send({ message: "New Product created successfully" });
        }
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const editProduct = await Product.findByIdAndUpdate(id, req.body);

        if (!editProduct) {
            return res.status(404).send({ message: "Product not found" });
        } else {
            const updatedProduct = await Product.findById(id);
            return res.status(200).send({ data: updatedProduct, message: "Product updated successfully" });
        }
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

const removeProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const removedProduct = await Product.findByIdAndDelete(id);

        if (!removedProduct) {
            return res.status(404).send({ message: "Product not found" });
        } else {
            return res.status(200).send({ message: "Product was deleted successfully" });
        }
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

module.exports = {
    getAllProducts,
    getProduct,
    addProduct,
    updateProduct,
    removeProduct
};