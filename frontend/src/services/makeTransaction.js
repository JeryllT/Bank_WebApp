import axios from 'axios'
const baseUrl = 'http://localhost:3001'

const makeTransaction = async ({token, transferAmt, senderAccId, recipientAccId, comment}) => {
    const config = {
        headers: { Authorization: token }
    }

    const res = await axios.post(`${baseUrl}/api/makeTransaction`, {transferAmt, senderAccId, recipientAccId, comment}, config)
    return res.data
}

export default { makeTransaction }