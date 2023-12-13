// other user profile screen
import React from 'react';
import { useParams } from 'react-router-dom';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useGetOtherUserProfileQuery, useGetOtherUserReviewsQuery } from '../slices/usersApiSlice';

const OtherUserProfileScreen = () => {
    const { id: userId } = useParams();
    const { data: user, isLoading, error } = useGetOtherUserProfileQuery(userId);
    const { data: reviews, isLoading: loadingReviews, error: reviewsError } = useGetOtherUserReviewsQuery(userId);

    if (isLoading || loadingReviews) {
        return <Loader />; // Show loader while data is loading
    }

    if (error || reviewsError) {
        const err = error || reviewsError;
        return <Message variant='danger'>{err}</Message>; // Show error message if there is an error
    }

    if (!user) {
        return <Message variant='info'>User not found</Message>; // Or some other placeholder content
    }
    console.log(reviews);

    return (
 <Row>
      <Col md={3}>
        <h2>User Profile</h2>

        <Form>
          <Form.Group className='my-2' controlId='username'>
            <Form.Label>username</Form.Label>
            <Form.Control
              type='text'
              value={user.userName}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='my-2' controlId='role'>
            <Form.Label>Role</Form.Label>
            <Form.Control
              type='text'
              value={user.role}
            ></Form.Control>
          </Form.Group>
        </Form>
      </Col>

      <Col md={9}>
        <>
            <h2>Reviews</h2>
            {/* {isLoadingManagedUsers ? (
              <Loader />
            ) : managedUsersError ? (
              <Message variant='danger'>{managedUsersError?.data?.message || managedUsersError.error}</Message>
            ) : ( */}
              <Table striped hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>Review ID</th>
                    <th>Review</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review) => (
                    <tr key={review._id}>
                      <td>{review.product}</td>
                      <td>
                        {review.comment}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            {/* )} */}
          </>
      </Col>
    </Row>
    );
}

export default OtherUserProfileScreen;
