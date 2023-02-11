import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { useDispatch, useSelector } from 'react-redux';
import {useState} from 'react';
import { setTransactions } from '../store/transaction-slice';

import ViewTransService from '../services/viewTransactions';

const TransFilter = ({toSent}) => {

    const [validDates, setValidDates] = useState(true)
    const [dropdownValue, setDropdownValue] = useState("")

    const token = useSelector(state => state.accounts.token)
    const accountId = useSelector(state => state.transactions.toView)
    const sentDropdown = useSelector(state => state.filter.sentDropdown)
    const receivedDropdown = useSelector(state => state.filter.receivedDropdown)

    console.log(receivedDropdown, "hi")
    
    const dispatch = useDispatch();

    const handleTransFilter = async (e) => {
        e.preventDefault();
        const startDate = isNaN(e.target.startDate.value) ? new Date(e.target.startDate.value).setUTCHours(0, 0, 0, 0) : null;
        const endDate = isNaN(e.target.endDate.value) ? new Date(e.target.endDate.value).setUTCHours(0, 0, 0, 0) : null;

        const account = dropdownValue
        console.log(startDate)
        console.log(endDate)
        console.log(account)
         
        if ((startDate == null && endDate != null) || (startDate != null && endDate == null) || startDate > endDate) {
            setValidDates(false);
            setTimeout(() => {
                setValidDates(true);
            }, 5000)
        } else {

            const transactions = await ViewTransService.getTransactions(token, accountId);

            if (startDate != null && endDate != null && account === "") {
                // dispatch setTransaction where the date is between the start and end date
                if (toSent) {
                    const filterSentTrans = transactions['sent'].filter(transaction => new Date(transaction.Date).setUTCHours(0, 0, 0, 0) >= startDate && new Date(transaction.Date).setUTCHours(0, 0, 0, 0) <= endDate);
                    transactions['sent'] = filterSentTrans;
                    dispatch(setTransactions(transactions));
                } else {
                    const filteredRecTrans = transactions['received'].filter(transaction => new Date(transaction.Date).setUTCHours(0, 0, 0, 0) >= startDate && new Date(transaction.Date).setUTCHours(0, 0, 0, 0) <= endDate);
                    transactions['received'] = filteredRecTrans;
                    dispatch(setTransactions(transactions));
                }
            } else if (startDate == null && endDate == null && account !== "") {
                // dispatch setTransaction where the account is the account selected
                if (toSent) {
                    const filterSentTrans = transactions['sent'].filter(transaction => transaction.Recipient.AccountID === Number(account));
                    transactions['sent'] = filterSentTrans;
                    dispatch(setTransactions(transactions));
                } else {
                    const filteredRecTrans = transactions['received'].filter(transaction => transaction.Sender.AccountID === Number(account));
                    transactions['received'] = filteredRecTrans;
                    dispatch(setTransactions(transactions));
                }
            } else if (startDate == null && endDate == null && account === "") {
                dispatch(setTransactions(transactions));
            } else {
                // dispatch setTransaction where the date is between the start and end date and the account is the account selected
                if (toSent) {
                    const filteredSentTrans = transactions['sent'].filter(transaction => new Date(transaction.Date).setUTCHours(0, 0, 0, 0) >= startDate && new Date(transaction.Date).setUTCHours(0, 0, 0, 0) <= endDate && transaction.Recipient.AccountID === Number(account));
                    transactions['sent'] = filteredSentTrans;
                    dispatch(setTransactions(transactions));
                } else {
                    const filteredRecTrans = transactions['received'].filter(transaction => new Date(transaction.Date).setUTCHours(0, 0, 0, 0) >= startDate && new Date(transaction.Date).setUTCHours(0, 0, 0, 0) <= endDate && transaction.Sender.AccountID === account);
                    transactions['received'] = filteredRecTrans;
                    dispatch(setTransactions(transactions));
                }
            }
        } 
    }

    const displaySentDropdown = () => {
        if (sentDropdown != null) {
            const toDisplay = Object.entries(sentDropdown)
            return (
                <>
                    <label>Account: </label>
                    <select value={dropdownValue} onChange={(e) => setDropdownValue(e.target.value)} name="sentAccount" style={{height: "2rem"}}>
                        <option value={""}>All</option>
                        {toDisplay.map((account, index) => {
                            return (
                                <option key={index} 
                                    value={account[0]}>{account[0] + " (" + account[1] + ")"}
                                </option>
                            )
                        })}
                    </select>
                </>
            )
        }
    }

    const displayReceivedDropdown = () => {
        if (receivedDropdown != null) {
            const toDisplay = Object.entries(receivedDropdown)
            return(
                <>
                    <label>Account: </label>
                    <select name="receivedAccount" style={{height: "2rem"}}>
                        <option value={""}>All</option>
                        {toDisplay.map((account, index) => {
                            return (
                                <option key={index} 
                                value={account[0]}>{account[0] + " (" + account[1] + ")"}
                                </option>
                            )
                        })}
                    </select>
                </>
                )
            }
        }

    
    return (
        <Container fluid="md" className="d-flex" style={{flexDirection: "column", alignItems: "start"}}>
            {validDates === false ?
                <Alert className="align-self-stretch" variant="danger">
                <div>Please ensure the following:</div>
                <ul>
                    <li>Start date is before end date</li>
                    <li>Start date and end date are not empty</li>
                </ul>
            </Alert>
            : null}
            <div className="d-flex" style={{justifyContent: "start"}}>
                <Form className="d-flex" onSubmit={handleTransFilter} >
                    <div className="d-flex" style={{marginRight: "10px", flexDirection: "column"}}>
                        <label>Start Date: </label>
                        <input style={{height: "2rem"}} name="startDate" type="date" />
                    </div>
                    <div className="d-flex" style={{marginRight: "10px", flexDirection: "column"}}>
                        <label>End Date: </label>
                        <input style={{height: "2rem"}} name="endDate" type="date" />
                    </div>
                    <div className="d-flex" style={{marginRight: "10px", flexDirection: "column"}}>
                        { toSent === true ? displaySentDropdown() : displayReceivedDropdown()}
                    </div>
                    <Button type="submit" style={{height: "2rem", marginTop: "auto"}} variant="outline-primary">Filter</Button>
                </Form>
            </div>
            <Form.Text>Start date and End date can be left blank.</Form.Text>
        </Container>
    );
}

export default TransFilter