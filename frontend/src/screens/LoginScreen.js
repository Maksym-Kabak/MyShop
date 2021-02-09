import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../component/Message';
import Loader from '../component/Loader';
import { login } from '../actions/userAction';
import FormContainer from '../component/FormContainer';

const LoginScreen = ({ location, history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(login(email, password));
    };


    return <FormContainer>
        <h1>Логін</h1>
        { error && <Message variant='danger'>{ error }</Message> }
        { loading && <Loader/> }
        <Form onSubmit={ submitHandler }>
            <Form.Group controlId='email'>
                <Form.Label>Електронна адреса</Form.Label>
                <Form.Control
                    type='email'
                    pleceholder='Введіть електронну адресу'
                    value={ email }
                    onChange={ (event) => setEmail(event.target.value) }
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                    type='password'
                    pleceholder='Введіть пароль'
                    value={ password }
                    onChange={ (event) => setPassword(event.target.value) }
                ></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'> Логін </Button>
        </Form>

        <Row className='py-3'>
            <Col>
                Новий клієнт? <Link to={ redirect ? `/register?redirect=${ redirect }` : '/register' }>Зареєструйтесь</Link>
            </Col>
        </Row>
    </FormContainer>;
};

export default LoginScreen;
