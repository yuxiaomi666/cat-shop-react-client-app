import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useGetProductDetailsQuery, useCreateReviewMutation, useGetReviewsByIdQuery} from '../slices/productsApiSlice';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { BASE_URL } from '../constants';

const ProductScreen = () => {
  
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [comment, setComment] = useState('');

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);
  const { userInfo } = useSelector((state) => state.auth);
  const { data: reviews, isLoading: loadingReviews, error: reviewsError } = useGetReviewsByIdQuery(productId);

  const [createReview, { isLoading: loadingCreatingReview }] = useCreateReviewMutation();
  const [createOrder, { isLoading: loadingProductOrder }] = useCreateOrderMutation();

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        comment,
      }).unwrap();
      refetch();
      toast.success('Review created successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

    const handlePlaceOrder = async() => {
    // Check if the user's role is ADMIN
    if (userInfo.role === 'ADMIN') {
      window.alert('Admin users are not allowed to place orders.');
      return;
    }
    const confirm = window.confirm('Are you sure to place order?');
    if (confirm) {
      try {
        const orderData = {
          user: userInfo._id,
          product: productId,
          quantity: qty,
        };
        const response = await createOrder(orderData);
        const orderId = response.data._id; 
        toast.success('Order placed successfully');
        window.alert('Order placed successfully!');
        navigate(`/order/${orderId}`);
      } catch (error) {
        toast.error('Error placing order');
      }
    }
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        
        <>
          <Meta title={product.title} description={product.description} />
          <Row>
            <Col md={4}>
              <Image src={`${BASE_URL}${product.image}`} alt={product.title} fluid />
              
            </Col>
            <Col md={5}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.title}</h3>
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {/* Qty Select */}
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                      onClick={handlePlaceOrder}
                    >
                      Place Order
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row className='review'>
            <Col md={6}>
              <h2>Reviews</h2>
              <ListGroup variant='flush'>
              {loadingReviews ? (
                <Loader />
              ) : reviewsError ? (
                <Message variant='danger'>{reviewsError.message}</Message>
              ) : reviews && reviews.length > 0 ? (
                reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <Link to={`/profile/${userInfo._id}`}>
                      <strong>Review By: {userInfo.email}</strong>
                    </Link>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))
              ) : (
                <Message>No Reviews</Message>
              )}

                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>

                  {loadingCreatingReview && <Loader />}

                  {userInfo ? (
                    <Form onSubmit={submitReviewHandler}>
                      <Form.Group className='my-2' controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          required
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingCreatingReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
