const { where } = require('sequelize')
const orders = require('../models/orders')

const {getAccessToken ,createIntention , createPaymobOrder} = require('../services/paymobService')

const createPayment = async (req , res)=>{

    const orderId = req.params.orderId

    const {amount , walletPhoneNumber , bill_reference} = req.body

    const singleOrder = await orders.findOne({where : {id : orderId}})

    const token = await getAccessToken()

    const paymobOrderId = await createPaymobOrder(token , amount)

    const redirect_url = await createIntention(token , paymobOrderId ,walletPhoneNumber , bill_reference)

    return res.json({redirect_url : redirect_url})


}

const verifyPaymentStatus = async (req, res) => {
    try {
        const { orderId, paymentKey } = req.body;


        const token = await getAccessToken();
        const paymentStatus = await verifyPayment(token, orderId, paymentKey);

        if (paymentStatus === 'approved') {
            const updatedOrder = await orders.update(
                { payment_status: 'approved' },
                { where: { id: orderId } }
            );
            return res.json({ message: 'Payment successfully approved', updatedOrder });
        } else {
            return res.status(400).json({ message: 'Payment failed' });
        }

    } catch (error) {
        console.error('Error in verifyPaymentStatus:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports = {
    createPayment,
    verifyPaymentStatus
}