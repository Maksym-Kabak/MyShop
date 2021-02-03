import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../component/Message';
import Loader from '../component/Loader';
import FormContainer from '../component/FormContainer';
import { register } from '../actions/userAction';

const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))
        }
    }


    return <FormContainer>
        <h1>Sign Up</h1>
        { message && <Message variant='danger'>{ message }</Message> }
        { error && <Message variant='danger'>{ error }</Message> }
        { loading && <Loader/> }
        <Form onSubmit={ submitHandler }>
            <Form.Group controlId='name'>
                <Form.Label>Ім'я</Form.Label>
                <Form.Control
                    type='name'
                    pleceholder='Введіть імя'
                    value={ name }
                    onChange={ (event) => setName(event.target.value) }
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
                <Form.Label>Електронна адреса</Form.Label>
                <Form.Control
                    type='email'
                    pleceholder='Введіть електронну адресу'
                    value={ email }
                    onChange={ (event) => setEmail(event.target.value) }
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                    type='password'
                    pleceholder='Введіть пароль'
                    value={ password }
                    onChange={ (event) => setPassword(event.target.value) }
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
                <Form.Label>Підтвердьте пароль</Form.Label>
                <Form.Control
                    type='password'
                    pleceholder='Підтвердьте пароль'
                    value={ confirmPassword }
                    onChange={ (event) => setConfirmPassword(event.target.value) }
                >
                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>Register</Button>
        </Form>

        <Row className='py-3'>
            <Col>
                Вже маєте акаунт? <Link to={ redirect ? `/login?redirect=${ redirect }` : '/register' }>Логін</Link>
            </Col>
        </Row>
    </FormContainer>
}

export default RegisterScreen;
