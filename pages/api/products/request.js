// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

require('dotenv').config()

const axiosOptions = {
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NEXT_PUBLIC_BACKEND_API_KEY,
    }
}

const addRequest = async (req, res) => {
    try {
        let url = `https://reviewr-backend.herokuapp.com/showcase/products/request`
        req.body['ip'] = req.connection.remoteAddress
        req.body['timestamp'] = new Date(Date.now()).toISOString();
        let axiosResponse = await axios.put(url, req.body, axiosOptions)
        res.status(200);
        res.json(axiosResponse.data);
    } catch (e) {
        console.log(e)
        res.status(500);
        res.json({error: "Unable to flag products... sorry"});
    }
}


export default addRequest;
