const OrderInvoice = require('../models/Order.model');

const createOrderInvoice = async (req, res) => {
    try {
        const newOrder = await OrderInvoice.create(req.body);
        if (!newOrder) {
            return res.status(400).send("Bad request");
        } else {
            return res.status(200).send({ data: { orderId: newOrder._id }, message: "New Order created successfully" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}


const updateOrderInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const editOrderInvoice = await OrderInvoice.findByIdAndUpdate(id, req.body);

        if (!editOrderInvoice) {
            return res.status(404).send({ message: "Order Invoice not found" });
        } else {
            const updatedOrder = await OrderInvoice.findById(id);
            return res.status(200).send({ data: updatedOrder, message: "Order Invoice updated successfully" });
        }
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

const getAllOrderInvoices = async (req, res) => {
    try{
        const orderInvoices = await OrderInvoice.find({});
        res.status(200).send({data: orderInvoices, message: "Success"});
    }catch(error){
        res.status(500).send({message: error.message});
    }
}

const getOrderInvoice = async (req, res) => {
    try{
        const {id} = req.params;
        const orderInvoice = await OrderInvoice.findById(id);

        if (!orderInvoice) {
            return res.status(404).send("Invoice not found");
        } else {
            return res.status(200).send({ data: orderInvoice, message: "Order Invoice retrieved successfully" });
        }
    }catch(error){
        res.status(500).send({message: error.message});
    }
}

const deleteOrderInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const removedInvoice = await OrderInvoice.findByIdAndDelete(id);

        if (!removedInvoice) {
            return res.status(404).send({ message: "Invoice not found" });
        }

        return res.status(200).send({ message: "Invoice was deleted successfully" });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

module.exports = {
    createOrderInvoice,
    updateOrderInfo,
    getOrderInvoice,
    getAllOrderInvoices,
    deleteOrderInvoice
}