const axios = require('axios')

const getAccessToken = async ()=>{

    const response = await axios.post('https://accept.paymob.com/api/auth/tokens',{
        api_key : process.env.API_KEY
    })

    return response.data.token

}


const createPaymobOrder = async (token , amount)=>{

    const response = await axios.post("https://accept.paymob.com/api/ecommerce/orders",{
        auth_token : token,
        delivery_needed : false,
        amount_cents : amount * 100,
        items : []
    })

    return response.data.id
}


const createIntention = async (token , orderId, walletPhoneNumber , bill_reference )=>{

    const response = await axios.post("https://accept.paymob.com/v1/intention/",{
        amount,
        currency : 'EGP',
        payment_method : ['mobile wallet'],
        wallet_Phone_Number : walletPhoneNumber,
        bill_reference,
        order_id : orderId 
    },{
        headers : {
            Authorization : `Bearer ${token}`,
            'Content-Type' : 'application/json'
        }
    })

    return response.data.redirect_url

}


module.exports = {
    getAccessToken,
    createPaymobOrder,
    createIntention
}