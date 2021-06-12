// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

require('dotenv').config()

const axiosOptions = {
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NEXT_PUBLIC_BACKEND_API_KEY,
    }
}

const fetchReviews = async (req, res) => {
    const id = req.query.productId

    try {
        let url = `https://reviewr-backend.herokuapp.com/demo/products/${id}/reviews`
        let axiosResponse = await axios.get(url, axiosOptions)
        res.status(200);
        res.json(axiosResponse.data);
    } catch (e) {
        console.log(e)
        res.status(500);
        res.json({error: "Unable to search products... sorry"});
    }
}


export default fetchReviews;
