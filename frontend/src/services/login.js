import axios from 'axios';
const baseUrl = 'http://localhost:3001';

const userAccounts = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const login = async credentials => {
    const res = await axios.post(`${baseUrl}/api/login`, credentials)
    return res.data
}


export default { userAccounts, login }