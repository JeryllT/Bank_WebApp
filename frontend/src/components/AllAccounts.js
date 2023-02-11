import Account from './Account';
import { useEffect } from 'react';
import { setAccounts } from '../store/account-slice';
import accountService from '../services/viewAccounts';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';

const AllAccounts = () => {

    const dispatch = useDispatch();
    const token = useSelector(state => state.accounts.token)
    const allAccounts = useSelector(state => state.accounts.data);
    
    useEffect(() => {
        accountService.userAccounts(token)
        .then(accounts => {
            dispatch(setAccounts(accounts))
        })
    }, [])

    return (
        <Container fluid="md">
            <div className="d-flex flex-wrap" style={{justifyContent: "start"}}>
                {allAccounts != null ? allAccounts.map(
                    (account, index) => {
                    return (
                        <Account
                            key={account.AccountID} 
                            accountId={account.AccountID} 
                            accountType={account.AccountType} 
                            accountBalance={account.AcccountBalance} 
                        />
                    )}) : null}
            </div>
        </Container>
    )
}

export default AllAccounts;