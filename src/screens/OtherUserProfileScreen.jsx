// other user profile screen
import React from 'react';
import { useParams } from 'react-router-dom';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useGetOtherUserProfileQuery } from '../slices/usersApiSlice';

const OtherUserProfileScreen = () => {
    const { id: userId } = useParams();
    const { data: user, isLoading, error } = useGetOtherUserProfileQuery(userId);

    if (isLoading) {
        return <Loader />; // Show loader while data is loading
    }

    if (error) {
        return <Message variant='danger'>{error}</Message>; // Show error message if there is an error
    }

    if (!user) {
        return <Message variant='info'>User not found</Message>; // Or some other placeholder content
    }

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
                    <th>ID</th>
                    <th>Review</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {managedUsers.map((user) => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                      <td>
                        <LinkContainer to={`/profile/${user._id}`}>
                          <Button className='btn-sm' variant='dark'
                          >
                            Details
                          </Button>
                        </LinkContainer>

                      </td>
                    </tr>
                  ))} */}
                </tbody>
              </Table>
            {/* )} */}
          </>
      </Col>
    </Row>
    );
}

export default OtherUserProfileScreen;
