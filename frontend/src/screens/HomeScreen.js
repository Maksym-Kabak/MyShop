import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Product from '../component/Product';
import Message from '../component/Message';
import Loader from '../component/Loader';
import Paginate from '../component/Paginate';
import ProductCarousel from '../component/ProductCarousel';
import Meta from '../component/Meta';
import { listProducts } from '../actions/productActions';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta/>
      { !keyword ? <ProductCarousel/> : <Link to='/' className='btn btn-light'>Повернутись назад</Link> }
      <h1>Найновіші продукти</h1>
      { loading ? <Loader/> : error ? <Message variant='danger'>{ error }</Message> : (
        <>
          <Row>
            { products.map(product => (
              <Col key={ product._id } sm={ 12 } md={ 6 } lg={ 4 } xl={ 3 }>
                <Product product={ product }/>
              </Col>
            )) }
          </Row>
          <Paginate pages={ pages } page={ page } keyword={ keyword ? keyword : '' }/>
        </>
      ) }
    </>
  );
};

export default HomeScreen;
