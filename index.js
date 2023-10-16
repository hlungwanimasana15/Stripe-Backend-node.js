require('dotenv').config();
const express = require('express');
const cors = require('cors')
const Stripe=require('stripe');
const stripe =Stripe(process.env.STRIPE_SECRET_KEY)
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.post('/pay', async (req,res) =>{
    try {
        const {name} = req.body;
        if(!name) return res.status(400).json({message: "Please enter a name "});
            const paymentIntent = await stripe.paymentIntents.create({
                amount:Math.round(25 * 100),
                currency: 'ZAR',
                payment_method_types:["card"],
                matadata:{name}
            });
            const clientSecret =paymentIntent.client_secret;
            res.json({message:'payment initiatedr', clientSecret})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'internal server error'})
    }
})
app.listen(PORT,() => console.log(`Server running on port ${PORT}`))
