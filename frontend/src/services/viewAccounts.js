import axios from 'axios'
const baseUrl = 'http://localhost:3001'


const userAccounts = async userToken => {
    const config = {
        headers: { Authorization: userToken }
    }

    const res = await axios.get(`${baseUrl}/api/accounts`,config)
    return res.data
}

export default { userAccounts }