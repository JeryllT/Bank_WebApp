import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import {useState, useEffect} from 'react';
import loginService from '../services/login';
import { useDispatch } from 'react-redux';
import { setUser, setToken } from '../store/account-slice';
import { useNavigate } from 'react-router-dom';
import Background from '../assets/mbs.jpeg';


const Login = () => {
    const [selectedButton, setSelectedButton] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    useEffect(() => {
        const loggedInUser = window.localStorage.getItem('loggedInUser')
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser)
            dispatch(setUser(user))
            dispatch(setToken(user.token))
            navigate("/")
        }
    }, [])

      const login = async (e) => {
        e.preventDefault()
        if (selectedButton === "login") {
            
            const username = e.target.elements.username.value
            const password = e.target.elements.password.value
            try {
                const user = await loginService.login({username, password})
                window.localStorage.setItem('loggedInUser', JSON.stringify(user))
                dispatch(setUser(user))
                dispatch(setToken(user.token))
                navigate("/")
            } catch (error) {
                console.log(error.message)
            }    

        } 
        // else if (selectedButton === "register") {
        //     console.log(e.target.name)
        //     console.log(e.target.elements.email.value)
        //     console.log(e.target.elements.password.value)
        // }
      }

    return (
        <div style={{width: "100%", height: "100%", backgroundImage: `url(${Background})`, backgroundSize: "100% 100%"}}>
            <Container fluid="md" className="d-flex" style={{justifyContent: "center", alignItems: "center", height: "100%"}}>
                <Card style={{minWidth: "10rem", backgroundColor: "grey"}}>
                    <Form onSubmit={login} style={{margin: "2rem 2rem"}}>
                        <Form.Group controlId="formBasicEmail" className="mb-3">
                        <Form.Label style={{color: "white"}}>Username</Form.Label>
                        <Form.Control name="username"  type="text" placeholder="username" required/>
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="mb-3">
                        <Form.Label style={{color: "white"}}>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Password" required/>
                        </Form.Group>
                        <Button name="login" onClick={(e) => setSelectedButton(e.target.name)} className="mb-3" variant="primary" type="submit" >Login</Button>
                        {/* <Button name="register" onClick={(e) => setSelectedButton(e.target.name)} className="mb-3 ms-3" variant="primary" type="submit" >Register New Account</Button> */}
                    </Form>
                </Card>
            </Container>
        </div>
    )
}

export default Login

