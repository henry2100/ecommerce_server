const Category = require('../models/Category.model');

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).send({ data: categories, message: "Success" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const getCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).send({ message: "Category not found or Invalid!" });
        }
        res.status(200).send({ data: category, message: "Success" });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

const addCategory = async (req, res) => {
    try {
        const newCategory = await Category.create(req.body);

        if (!newCategory) {
            return res.status(400).send("Bad request");
        } else {
            return res.status(200).send({ message: "New Category was added successfully" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const editCategory = await Category.findByIdAndUpdate(id, req.body)

        if (!editCategory) {
            return res.status(404).send({ message: "Category not found or Invalid!" });
        }

        const updatedCategory = await Category.findById(id);
        res.status(200).send({ data: updatedCategory, message: "Category updated successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const removeCategory = async (req, res) => {
    try{
        const {id} = req.params;
        const removedCategory = await Category.findByIdAndDelete(id);

        if (!removedCategory) {
            return res.status(404).send({ message: "Category not found or Invalid!" });
        }

        res.status(200).send({message: "Category removed successfully"});
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

module.exports = {
    getAllCategories,
    getCategory,
    addCategory,
    updateCategory,
    removeCategory
}