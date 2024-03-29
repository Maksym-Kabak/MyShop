import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../component/Message';
import Loader from '../component/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userAction';
import { listMyOrders } from '../actions/orderActions';

const ProfileScreen = ({ history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    const orderListMy = useSelector(state => state.orderListMy);
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;


    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'));
                dispatch(listMyOrders());
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, history, userInfo, user])

    const submitHandler = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }
    }


    return <Row>
        <Col md={ 3 }>
            <h2>Профіль користувача</h2>
            { message && <Message variant='danger'>{ message }</Message> }
            { error && <Message variant='danger'>{ error }</Message> }
            { success && <Message variant='success'>Профіль оновлено</Message> }
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

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Підтвердьте пароль</Form.Label>
                    <Form.Control
                        type='password'
                        pleceholder='Підтвердьте пароль'
                        value={ confirmPassword }
                        onChange={ (event) => setConfirmPassword(event.target.value) }
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>Оновити</Button>
            </Form>
        </Col>
        <Col md={ 9 }>
            <h2>Мої замовлення</h2>
            { loadingOrders ? <Loader/> : errorOrders ? <Message variant='danger'>{ errorOrders }</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>ДАТА</th>
                        <th>ВСЬОГО</th>
                        <th>ОПЛАТЕНО</th>
                        <th>ДОСТАВЛЕНО</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>{order.totalPrice}</td>
                            <td>
                                {order.isPaid ? (
                                    order.paidAt.substring(0, 10)
                                ) : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}
                            </td>
                            <td>
                                {order.isDelivered ? (
                                    order.deliveredAt.substring(0, 10)
                                ) : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}
                            </td>
                            <td>
                                <LinkContainer to={`/order/${order._id}`}>
                                    <Button className='btn-sm' variant='dark'>
                                        Деталі
                                    </Button>
                                </LinkContainer>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            ) }
        </Col>
    </Row>
}

export default ProfileScreen;
