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
        return { error: err.response.data.message || err.message };
    }
};

export const signin = async ({email, password}) => {
    try {
        // ping server
        const response = await Axios({
            url: `${apiUrl}/api/users/signin`,
            method: 'POST',
            header: {
                'Content-Type':'application/json'
            },
            // data to be sent to server
            data: {
                email,
                password,
            }
        });
        // handle errors
        if(response.statusText !== "OK") {
            throw new Error(response.data.message);
        }
        // success case
        return response.data;
    } catch(err) {
        console.log(err);
        return { error: err.response.data.message || err.message }
    }
}