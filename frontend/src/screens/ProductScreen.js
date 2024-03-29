import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Rating from '../component/Rating';
import Message from '../component/Message';
import Loader from '../component/Loader';
import Meta from '../component/Meta';
import {
  listProductDetails,
  createProductReview
} from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstans';

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }

    dispatch(listProductDetails(match.params.id));
    dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });

  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${ match.params.id }?qty=${ qty }`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment
      })
    );
  };

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Повернутись назад
      </Link>
      { loading ? (
        <Loader/>
      ) : error ? (
        <Message variant='danger'>{ error }</Message>
      ) : (
        <>
          <Meta title={ product.name }/>
          <Row>
            <Col md={ 6 }>
              <Image src={ product.image } alt={ product.name } fluid/>
            </Col>
            <Col md={ 3 }>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{ product.name }</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={ product.rating }
                    text={ `${ product.numReviews } відгуки` }
                  />
                </ListGroup.Item>
                <ListGroup.Item>Ціна: { product.price } ₴</ListGroup.Item>
                <ListGroup.Item>
                  <h5>Опис: </h5>
                  { product.description }
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={ 3 }>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Ціна:</Col>
                      <Col>
                        <strong>{ product.price } ₴</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Статус:</Col>
                      <Col>
                        { product.countInStock > 0 ? 'В наявності' : 'Немає в наявності' }
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  { product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Кількість</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={ qty }
                            onChange={ (e) => setQty(e.target.value) }
                          >{ [...Array(product.countInStock).keys()].map(
                            (x) => (
                              <option key={ x + 1 } value={ x + 1 }>
                                { x + 1 }
                              </option>
                            )
                          ) }</Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ) }

                  <ListGroup.Item>
                    <Button
                      onClick={ addToCartHandler }
                      className='btn-block'
                      type='button'
                      disabled={ product.countInStock === 0 }
                    >
                      Додати в кошик
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={ 6 }>
              <h2>Відгуки</h2>
              { product.reviews.length === 0 && <Message>Відгуків немає</Message> }
              <ListGroup variant='flush'>
                { product.reviews.map((review) => (
                  <ListGroup.Item key={ review._id }>
                    <strong>{ review.name }</strong>
                    <Rating value={ review.rating }/>
                    <p>{ review.createdAt.substring(0, 10) }</p>
                    <p>{ review.comment }</p>
                  </ListGroup.Item>
                )) }
                <ListGroup.Item>
                  <h2>Написати відгук клієнта</h2>
                  { loadingProductReview && <Loader/> }
                  { errorProductReview && (
                    <Message variant='danger'>{ errorProductReview }</Message>
                  ) }
                  { userInfo ? (
                    <Form onSubmit={ submitHandler }>
                      <Form.Group controlId='rating'>
                        <Form.Label>Рейтинг</Form.Label>
                        <Form.Control
                          as='select'
                          value={ rating }
                          onChange={ (e) => setRating(e.target.value) }
                        >
                          <option value=''>Виберіть ...</option>
                          <option value='1'>1 - Жалюгідний</option>
                          <option value='2'>2 - Досить добрий</option>
                          <option value='3'>3 - Добре</option>
                          <option value='4'>4 - Дуже добре</option>
                          <option value='5'>5 - Відмінно</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Коментар</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={ comment }
                          onChange={ (e) => setComment(e.target.value) }
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={ loadingProductReview }
                        type='submit'
                        variant='primary'
                      >
                        Написати
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Будь ласка <Link to='/login'>Увійдіть</Link> щоб написати відгук{ ' ' }
                    </Message>
                  ) }
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      ) }
    </>
  );
};

export default ProductScreen;
