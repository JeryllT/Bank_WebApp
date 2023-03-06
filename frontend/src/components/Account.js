import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {setToViewTran} from '../store/transaction-slice';

const Account = ({accountId, accountType, accountBalance }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleViewTransactions = (e) => {
    e.preventDefault();
    dispatch(setToViewTran(accountId))
    navigate(`/account/${accountId}`)
  }

  return (
    <Card className="px-0 py-0" style={{ minWidth: '18rem', maxWidth: '18rem', margin: "1rem 1rem" }}>
        <Card.Header>Account ID: {accountId}</Card.Header>
        <Card.Body>
            <ListGroup variant="flush">
                <ListGroup.Item>Account Type: {accountType}</ListGroup.Item>
                <ListGroup.Item>Account Balance: ${accountBalance}</ListGroup.Item>
            </ListGroup>
            <Button onClick={handleViewTransactions} variant="primary">View Transactions</Button>
        </Card.Body>
    </Card>
  );
}

export default Account;