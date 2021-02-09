import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../component/FormContainer';
import CheckoutSteps from '../component/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartAction';


const PaymentScreen = ({ history }) => {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    if (!shippingAddress) {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const dispatch = useDispatch();

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placeorder');
    }

    return <FormContainer>
        <CheckoutSteps step1 step2 step3/>
        <h1>Спосіб оплати</h1>
        <Form onSubmit={ submitHandler }>
            <Form.Group>
                <Form.Label as='legend'>Виберіть метод</Form.Label>
                <Col>
                    <Form.Check
                        type='radio'
                        label='PayPal aбо Кредитна картка'
                        id='PayPal'
                        name='paymentMethod'
                        value='PayPal'
                        checked
                        onChange={ (event) => setPaymentMethod(event.target.value) }
                    ></Form.Check>
                    <Form.Check
                        type='radio'
                        label='Stripe'
                        id='Stripe'
                        name='paymentMethod'
                        value='Stripe'
                        onChange={ (event) => setPaymentMethod(event.target.value) }
                    ></Form.Check>
                </Col>
            </Form.Group>
            <Button type='submit' variant='primary'>Продовжити</Button>
        </Form>
    </FormContainer>

}

export default PaymentScreen;
