require('dotenv').config();
const express = require('express');
const cors = require('cors')
const stripe =require('stripe')(process.env.STRIPE_SECRET_KEY)
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.post('/pay', async (req,res) =>{
    try {
        const {name} = req.body;
        if(!name) return res.status(400).json({message: "Please enter a name "});
            const paymentIntent = await stripe.paymentIntents.create({
                amount:1000,
                currency: 'zar',
                automatic_payment_methods:{enabled:true},
            });
            const clientSecret = paymentIntent.client_secret;
            res.json({message:'payment initiateded', clientSecret})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'internal server error'})
    }
})
app.listen(PORT,() => console.log(`Server running on port ${PORT}`))
