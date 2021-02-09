import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../component/Message';
import Loader from '../component/Loader';
import FormContainer from '../component/FormContainer';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstans';

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetail = useSelector(state => state.productDetail);
  const { loading, error, product } = productDetail;

  const productUpdate = useSelector(state => state.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/admin/productlist');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }

  }, [history, dispatch, productId, product, successUpdate]);

  const uploadFileHandler = async (event) => {
    const file = event.target.files[0];
    const formDate = new FormData();
    formDate.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      const { data } = await axios.post('/api/upload', formDate, config);

      setImage(data);
      setUploading(false);
    } catch (e) {
      console.error(e);
      setUploading(false);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(updateProduct({
      _id: productId,
      name,
      price,
      image,
      brand,
      category,
      description,
      countInStock
    }));
  };


  return <>
    <Link to={ `/admin/productlist` } className='btn btn-light my-3'>
      Повернутись назад
    </Link>

    <FormContainer>
      <h1>Редагувати продукт</h1>
      { loadingUpdate && <Loader/> }
      { errorUpdate && <Message variant='danger'>{ errorUpdate }</Message> }
      { loading ? <Loader/> : error ? <Message variant='danger'>{ error }</Message> :
        (
          <Form onSubmit={ submitHandler }>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                pleceholder='Enter name'
                value={ name }
                onChange={ (event) => setName(event.target.value) }
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Ціна</Form.Label>
              <Form.Control
                type='number'
                pleceholder='Введіть ціну'
                value={ price }
                onChange={ (event) => setPrice(event.target.value) }
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Зображення</Form.Label>
              <Form.Control
                type='text'
                pleceholder='Введіть URL-адресу зображення'
                value={ image }
                onChange={ (event) => setImage(event.target.value) }
              ></Form.Control>
              <Form.File id='image-file' label='Choose File' custom onChange={ uploadFileHandler }>
                { uploading && <Loader/> }
              </Form.File>
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Бренд</Form.Label>
              <Form.Control
                type='text'
                pleceholder='Введіть бренд'
                value={ brand }
                onChange={ (event) => setBrand(event.target.value) }
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Кількість на слладі</Form.Label>
              <Form.Control
                type='number'
                pleceholder='Введіть кількість на слладі'
                value={ countInStock }
                onChange={ (event) => setCountInStock(event.target.value) }
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Категорія</Form.Label>
              <Form.Control
                type='text'
                pleceholder='Введіть категорію'
                value={ category }
                onChange={ (event) => setCategory(event.target.value) }
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Опис</Form.Label>
              <Form.Control
                type='text'
                pleceholder='Введіть опис'
                value={ description }
                onChange={ (event) => setDescription(event.target.value) }
              ></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>Update</Button>
          </Form>
        ) }
    </FormContainer>;
  </>;
};

export default ProductEditScreen;
;
;

