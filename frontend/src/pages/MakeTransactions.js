import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import accountService from '../services/viewAccounts';
import makeTransService from '../services/makeTransaction';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAccounts } from '../store/account-slice';
import { useState } from 'react';

const MakeTransactions = () => {

    const dispatch = useDispatch();
    const token = useSelector(state => state.accounts.token)
    const accounts = useSelector(state => state.accounts.data);
    const [selectedAcc, setSelectedAcc] = useState(null);
    const [selectedAccAmt, setSelectedAccAmt] = useState(null);
    const [alertMsg, setAlertMsg] = useState(null);
    const [variant, setVariant] = useState(null);

    const handleAccountChange = (e) => {
        const selected = e.target.value
        setSelectedAcc(selected)
        if (selected === 'Select Account' || selected == null) setSelectedAccAmt(null)
        else {
            const account = accounts.find(account => account.AccountID === Number(selected));
            setSelectedAccAmt(account.AcccountBalance);
        }
    }

    const handleMakeTrans = async (e) => {
        e.preventDefault();

        const transferAmt = Number(e.target.elements.amount.value);
        const senderAccId = Number(selectedAcc)
        const recipientAccId = Number(e.target.elements.accountNumber.value)
        const comment = e.target.elements.comment.value
        // Resets form after submission
        e.target.reset()
        
        try {
            const res = await makeTransService.makeTransaction({
                token,
                senderAccId,
                recipientAccId,
                transferAmt,
                comment

            })
            setAlertMsg(res.message)
            setVariant('success')

            setTimeout(() => {
                setAlertMsg(null)
                setVariant(null)
            }, 5000)

            // Update account balance again after pulling it from backend
            const allAccounts = await accountService.userAccounts(token)
            const account = allAccounts.find(account => account.AccountID === Number(selectedAcc));
            const newBalance = account.AcccountBalance
            setSelectedAccAmt(newBalance);

        } catch (error) {
            setAlertMsg(error.response.data.error)
            setVariant('danger')
            setTimeout (() => {
                setAlertMsg(null)
                setVariant(null)
            }, 5000)
        }
    }

    useEffect(() => {
        accountService.userAccounts(token)
        .then(accounts => {
            dispatch(setAccounts(accounts))
        })
    }, [selectedAcc])

    return (
        <Container fluid="md" style={{width: "50%", marginTop: "2rem"}}>
            {alertMsg !== null ? <Alert variant={variant}>{alertMsg}</Alert> : ""}
            <Card style={{padding: "0", boxShadow: "none", transform: "none"}}>
                <Card.Header>Make a Transaction Below</Card.Header>
                <div className="d-flex" style={{justifyContent: "space-between", padding: "1rem 1rem", border: "1px solid lightGrey", borderWidth: "0px 1px 1px 1px"}}>
                    <div>
                        <div>Transferring From:</div>
                        <Form>
                            <Form.Select onChange={handleAccountChange} aria-label="Default select example">
                                <option>Select Account</option>
                                {accounts?.map(account => {
                                    return (
                                        <option key={account.AccountID} value={account.AccountID}>
                                            {account.AccountID}
                                        </option>
                                    )
                                })}
                            </Form.Select>
                        </Form>
                    </div>
                    {selectedAccAmt !== null ? <div style={{alignSelf: "center"}}>Current Balance: ${selectedAccAmt.toFixed(2)}</div> : null}
                </div>
                <Card.Body>
                    <Form onSubmit={handleMakeTrans}>
                        <Form.Group style={{width: "50%"}} className="mb-3">
                            <Form.Label>Account Number</Form.Label>
                            <Form.Control 
                                name="accountNumber"
                                type="number" 
                                placeholder="Enter Recipient Account Number" 
                                />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Amount</Form.Label>
                            <InputGroup style={{width: "50%"}} className="mb-3">
                                <InputGroup.Text>$</InputGroup.Text>
                                <Form.Control
                                    name="amount" 
                                    type="text" 
                                    pattern="^[1-9][0-9]*(\.[0-9]{2})?$"
                                    placeholder="Enter Amount"
                                    title="Enter a valid amount more than zero with maximum of 2 decimal places"
                                    required />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group style={{width: "50%"}} className="mb-3">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                                name="comment" 
                                as="textarea" 
                                style={{overflow: "auto"}} 
                                type="text" 
                                placeholder="Enter Comment" 
                                />
                        </Form.Group>
                        <Button style={{display: "block", marginLeft: "auto"}} variant="primary" type="submit">Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default MakeTransactions