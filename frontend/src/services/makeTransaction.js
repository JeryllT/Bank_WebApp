import axios from 'axios'
const baseUrl = '/api/makeTransaction'

const makeTransaction = async ({token, transferAmt, senderAccId, recipientAccId, comment}) => {
    const config = {
        headers: { Authorization: token }
    }

    const res = await axios.post(baseUrl, {transferAmt, senderAccId, recipientAccId, comment}, config)
    return res.data
}

export default { makeTransaction }