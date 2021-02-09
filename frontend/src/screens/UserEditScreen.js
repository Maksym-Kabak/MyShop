import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../component/Message';
import Loader from '../component/Loader';
import FormContainer from '../component/FormContainer';
import { getUserDetails, updateUser } from '../actions/userAction';
import { USER_UPDATE_RESET } from '../constants/userConstanst';

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector(state => state.userUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/userlist');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }

  }, [history, dispatch, userId, user, successUpdate]);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };


  return <>
    <Link to={ `/admin/userlist` } className='btn btn-light my-3'>
      Повернутись назад
    </Link>

    <FormContainer>
      <h1>Редагувати користувача</h1>
      { loadingUpdate && <Loader/> }
      { errorUpdate && <Message variant='danger'>{ errorUpdate }</Message> }
      { loading ? <Loader/> : error ? <Message variant='danger'>{ error }</Message> :
        (
          <Form onSubmit={ submitHandler }>
            <Form.Group controlId='name'>
              <Form.Label>Ім'я</Form.Label>
              <Form.Control
                type='name'
                pleceholder='Введіть імя'
                value={ name }
                onChange={ (event) => setName(event.target.value) }
              ></Form.Control>
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

            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Є адміністратором'
                checked={ isAdmin }
                onChange={ (event) => setIsAdmin(event.target.checked) }
              ></Form.Check>
            </Form.Group>
            <Button type='submit' variant='primary'>Update</Button>
          </Form>
        ) }

    </FormContainer>;
  </>;
};

export default UserEditScreen;

