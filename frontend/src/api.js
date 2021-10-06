// send api requests

import Axios from "axios";
import { apiUrl } from "./config";

export const getProduct = async (id) => {
    try {
        const response = await Axios({
            url: `${apiUrl}/api/products/${id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        //evaluate respponse
        if(response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }

        //return data
        return response.data;

    } catch(err) {
        console.log('error in api.js')
        console.log(err);
        return { error: err.response.data.meassage || err.message };
    }
}