import axios from 'axios';
const baseUrl = '/api/login';

const userAccounts = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const login = async credentials => {
    const res = await axios.post(baseUrl, credentials)
    return res.data
}


export default { userAccounts, login }