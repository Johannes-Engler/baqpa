// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

require('dotenv').config()

const axiosOptions = {
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NEXT_PUBLIC_BACKEND_API_KEY,
    }
}

const fetchProducts = async (req, res) => {

    try {
        let url = `https://reviewr-backend.herokuapp.com/demo/products`
        let axiosResponse = await axios.get(url, axiosOptions)
        res.status(200);
        res.json(axiosResponse.data);
    } catch (e) {
        console.log(e)
        res.status(500);
        res.json({error: "Unable to search products... sorry"});
    }
}

export default fetchProducts;
