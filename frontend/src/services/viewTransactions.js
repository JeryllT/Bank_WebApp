import axios from 'axios'
const baseUrl = 'http://localhost:3001'

const getTransactions = async (userToken, accountId) => {
    const config = {
        headers: { Authorization: userToken }
    }

    const res = await axios.get(`${baseUrl}/api/transactions/${accountId}`,config)
    return res.data
}

export default { getTransactions }