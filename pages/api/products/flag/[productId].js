// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

require('dotenv').config()

const axiosOptions = {
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NEXT_PUBLIC_BACKEND_API_KEY,
    }
}

const flagSummary = async (req, res) => {
    const id = req.query.productId

    try {
        let url = `https://reviewr-backend.herokuapp.com/demo/products/${id}/summary/flag`
        let axiosResponse = await axios.put(url, req.data, axiosOptions)
        res.status(200);
        res.json(axiosResponse.data);
    } catch (e) {
        console.log(e)
        res.status(500);
        res.json({error: "Unable to flag products... sorry"});
    }
}


export default flagSummary;
