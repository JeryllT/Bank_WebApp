import axios from 'axios'
const baseUrl = '/api/accounts'


const userAccounts = async userToken => {
    const config = {
        headers: { Authorization: userToken }
    }

    const res = await axios.get(baseUrl,config)
    return res.data
}

export default { userAccounts }