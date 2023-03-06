import axios from 'axios'
const baseUrl = '/api/transactions'

const getTransactions = async (userToken, accountId) => {
    const config = {
        headers: { Authorization: userToken }
    }

    const res = await axios.get(`${baseUrl}/${accountId}`,config)
    return res.data
}

export default { getTransactions }