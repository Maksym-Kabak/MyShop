import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../component/FormContainer';
import CheckoutSteps from '../component/CheckoutSteps';
import { saveShippingAddress } from '../actions/cartAction';


const ShippingScreen = ({ history }) => {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        history.push('/payment');
    };

    return <FormContainer>
        <CheckoutSteps step1 step2/>
        <h1>Доставка</h1>
        <Form onSubmit={ submitHandler }>
            <Form.Group controlId='address'>
                <Form.Label>Адреса</Form.Label>
                <Form.Control
                    type='text'
                    pleceholder='Введіть адресу'
                    value={ address }
                    required
                    onChange={ (event) => setAddress(event.target.value) }
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='city'>
                <Form.Label>Місто</Form.Label>
                <Form.Control
                    type='text'
                    pleceholder='Введіть місто'
                    value={ city }
                    required
                    onChange={ (event) => setCity(event.target.value) }
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='postalCode'>
                <Form.Label>Поштовий індекс</Form.Label>
                <Form.Control
                    type='text'
                    pleceholder='Введіть поштовий індекс'
                    value={ postalCode }
                    required
                    onChange={ (event) => setPostalCode(event.target.value) }
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='country'>
                <Form.Label>Країна</Form.Label>
                <Form.Control
                    type='text'
                    pleceholder='Введіть країну'
                    value={ country }
                    required
                    onChange={ (event) => setCountry(event.target.value) }
                >
                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>Продовжити</Button>
        </Form>
    </FormContainer>;

};

export default ShippingScreen;
