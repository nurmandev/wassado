const PaymentModel = require('../models/PaymentModel');

// ----------------GET ALL PAYMENTS API START-------------------------
// @Request  GET
// @Route    /api/payments/
// @access   Private

const getAllPayments = async (req, res) => {
    try {
        const payments = await PaymentModel.find()
            .populate('booking');
        res.status(200).json(payments);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching payments' });
    }
};

// ----------------GET PAYMENT BY ID API START-------------------------
// @Request  GET
// @Route    /api/payments/:id
// @access   Private

const getPaymentById = async (req, res) => {
    const { id } = req.params;

    try {
        const payment = await PaymentModel.findById(id)
            .populate('booking');
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        res.status(200).json(payment);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching payment' });
    }
};

// ----------------CREATE PAYMENT API START-------------------------
// @Request  POST
// @Route    /api/payments/
// @access   Private

const createPayment = async (req, res) => {
    const { booking, amount, paymentMethod } = req.body;

    try {
        const newPayment = await PaymentModel.create({
            booking,
            amount,
            paymentMethod
        });

        res.status(201).json(newPayment);
    } catch (err) {
        res.status(500).json({ error: 'Error creating payment' });
    }
};

// ----------------UPDATE PAYMENT API START-------------------------
// @Request  PUT
// @Route    /api/payments/:id
// @access   Private

const updatePayment = async (req, res) => {
    const { id } = req.params;
    const { booking, amount, paymentMethod, paymentDate, paymentStatus } = req.body;

    try {
        const updatedPayment = await PaymentModel.findByIdAndUpdate(
            id,
            {
                booking,
                paymentDate,
                amount,
                paymentMethod,
                paymentStatus
            },
            { new: true }
        );

        if (!updatedPayment) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        res.status(200).json(updatedPayment);
    } catch (err) {
        res.status(500).json({ error: 'Error updating payment' });
    }
};

// ----------------DELETE PAYMENT API START-------------------------
// @Request  DELETE
// @Route    /api/payments/:id
// @access   Private

const deletePayment = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPayment = await PaymentModel.findByIdAndDelete(id);

        if (!deletedPayment) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        res.status(200).json({ success: 'Payment deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting payment' });
    }
};

// ----------------EXPORTING CONTROLLERS-------------------------

module.exports = {
    getAllPayments,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment
};
