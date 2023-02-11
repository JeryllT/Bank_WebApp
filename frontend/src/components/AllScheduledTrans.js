import Container from 'react-bootstrap/esm/Container';
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
import ScheduledTrans from './ScheduledTrans';
import Spinner from 'react-bootstrap/Spinner';
import TransFilter from './TransFilter';

import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { setTransactions } from '../store/transaction-slice';
import { updateSentDropdown, updateRecDropdown } from '../store/filter-slice';
import transactionService from '../services/viewTransactions';


const AccountTransactions = () => {

    const dispatch = useDispatch();
    const token = useSelector(state => state.accounts.token)
    const accountId = useSelector(state => state.transactions.toView)
    const allTransactions = useSelector(state => state.transactions.data)

    useEffect(() => {
        
        const setStart = async () => {
            const res = await transactionService.getTransactions(token, accountId)
            console.log(res)
            dispatch(setTransactions(res))

            if (res['sent'] != null) {
                for (const transaction in res['sent']) {
                    dispatch(updateSentDropdown(
                        [
                            res['sent'][transaction].Recipient.AccountID, 
                            res['sent'][transaction].Recipient.User.Firstname + " " + res['sent'][transaction].Recipient.User.Lastname
                        ]
                    ))
                }
            } 
        
            if (res['received'] != null) {
                for (const transaction in res['received']) {
                    dispatch(updateRecDropdown(
                        [
                            res['received'][transaction].Sender.AccountID, 
                            res['received'][transaction].Sender.User.Firstname + " " + res['received'][transaction].Sender.User.Lastname, 
                            
                        ]
                        ))
                }
            }
        }
        setStart()

    }, [])

    return (
        <Container fluid="md" style={{marginTop: "2rem"}}>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Sent Scheduled Transactions</Accordion.Header>
                    <Accordion.Body>
                        <TransFilter toSent={true} />
                        <ListGroup style={{marginTop: "1rem"}}>
                            <ListGroup.Item className="d-flex" style={{backgroundColor: "grey", color: "white"}}>
                                <div style={{marginRight: "auto"}}>Details</div>
                                <div>Sent Amount</div>
                            </ListGroup.Item>
                        </ListGroup>
                        <ListGroup>
                            {allTransactions['sent'] != null ? allTransactions['sent'].map(transaction => {
                                return (
                                    <ScheduledTrans 
                                        key={transaction.TransactionID} 
                                        receivingBoolean={false} 
                                        transactionId={transaction.TransactionID}
                                        senderReceiverID={transaction.ReceivingAccountID}
                                        senderReceiverName={transaction.Recipient.User.Firstname + " " + transaction.Recipient.User.Lastname}
                                        date={transaction.Date} 
                                        amt={transaction.TransactionAmount} 
                                        comment={transaction.Comment}
                                    />)
                            }) : <Spinner animation="border" />}
                        </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Received Scheduled Transactions</Accordion.Header>
                    <Accordion.Body>
                        <TransFilter toSent={false} />
                        <ListGroup>
                            <ListGroup.Item className="d-flex" style={{backgroundColor: "grey", color: "white"}}>
                                <div style={{marginRight: "auto"}}>Details</div>
                                <div>Received Amount</div>
                            </ListGroup.Item>
                        </ListGroup>
                        <ListGroup>
                            {allTransactions['received'] != null ? allTransactions['received'].map(transaction => {
                                return (
                                    <ScheduledTrans 
                                        key={transaction.TransactionID}
                                        receivingBoolean={true}
                                        transactionId={transaction.TransactionID}
                                        senderReceiverID={transaction.ReceivingAccountID}
                                        senderReceiverName={transaction.Sender.User.Firstname + " " + transaction.Sender.User.Lastname}
                                        date={transaction.Date} 
                                        amt={transaction.TransactionAmount} 
                                        comment={transaction.Comment}
                                    />)
                            }) : <Spinner animation="border" />}
                        </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>
    );
}

export default AccountTransactions