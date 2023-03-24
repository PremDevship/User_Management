
import axios from 'axios';
const base_url = "http://localhost:3005/api/"

export async function getAPI(url) {
    return axios.get(`${base_url}${url}`).then((res) => {
        return res.data
    }).catch((error) => {
        console.log(error);
        return null
    });
}
export async function postAPI(url,data) {
    return axios.post(`${base_url}${url}`,data).then((res) => {
        return res.data
    }).catch((error) => {
        console.log(error);
        return null
    });
}
export async function putAPI(url,data) {
    return axios.put(`${base_url}${url}`,data).then((res) => {
        return res.data
    }).catch((error) => {
        console.log(error);
        return null
    });
}
export async function deleteAPI(url) {
    return axios.delete(`${base_url}${url}`).then((res) => {
        return res.data
    }).catch((error) => {
        console.log(error);
        return null
    });
}