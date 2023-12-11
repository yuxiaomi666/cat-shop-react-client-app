import React, { useEffect, useState } from 'react';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';

import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useProfileMutation, useGetManagedUsersQuery, useDeleteUserMutation } from '../slices/usersApiSlice';
import { useGetMyOrdersQuery, useDeleteOrderMutation } from '../slices/ordersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { useGetMyProductsQuery, useDeleteProductMutation, useCreateProductMutation, useUpdateProductMutation } from "../slices/productsApiSlice";

const ProfileScreen = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); 
  const [admin, setAdmin] = useState(''); // everyone has a admin

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [productId, setProductId] = useState('');

  const { userInfo } = useSelector((state) => state.auth);

// Hook Initialization, identifying tags for the data
  const { data: orders, isLoading: isLoadingOrders, error: ordersError } = useGetMyOrdersQuery(userInfo);
  const { data: products, isLoading: isLoadingProducts, error: productsError } = useGetMyProductsQuery(userInfo._id);
  const { data: managedUsers, isLoading: isLoadingManagedUsers, error: managedUsersError } = useGetManagedUsersQuery(userInfo._id);

  const [deleteOrder, { isLoading: isDeletingOrder }] = useDeleteOrderMutation();
  const [deleteProduct, { isLoading: isDeletingProduct }] = useDeleteProductMutation();
  const [createProduct, { isLoading: isCreatingProduct }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdatingProduct }] = useUpdateProductMutation();
  const [deleteUser, { isLoading: isDeletingUser }] = useDeleteUserMutation();
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      const data = await response.json();
      setImage(data.image); // Update the image state
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Error uploading image');
    }
  }
};



  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
        try {
          await deleteOrder(orderId).unwrap();
          toast.success('Order deleted successfully');
        } catch (err) {
          toast.error('Error deleting order: ' + err?.data?.message || err.error);
        }
    }
  };

    const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
        try {
          await deleteProduct(productId).unwrap();
          toast.success('Product deleted successfully');
        } catch (err) {
          toast.error('Error deleting order: ' + err?.data?.message || err.error);
        }
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const productData = { title, image, description, price, countInStock, user: userInfo._id };
    // Check for empty fields
    if (!title || !image || !description || price === 0 || countInStock === 0) {
      alert('Please fill in all the fields.');
      console.log('Please fill in all the fields.');
      return;
    }
    try {
      await createProduct(productData).unwrap();
      toast.success('Product created successfully');
    } catch (err) {
      toast.error('Error creating product: ' + err?.data?.message || err.error);
    }
};

const handleEditProduct = async (product) => {
  setTitle(product.title);
  setImage(product.image);
  setDescription(product.description);
  setPrice(product.price);
  setCountInStock(product.countInStock);
  setProductId(product._id);
};

const handleUpdateProduct = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const productData = { title, image, description, price, countInStock, productId, user: userInfo._id };
    // Check for empty fields
    if (!title || !image || !description || price === 0 || countInStock === 0) {
      // Display an error message or set an error state
      alert('Please fill in all the fields.');
      return; // Stop the form submission
    }
    try {
      await updateProduct(productData).unwrap();
      toast.success('Product updated successfully');
    } catch (err) {
      toast.error('Error updating product: ' + err?.data?.message || err.error);
    }
};

  const handleDeleteUser = async (userId) => {
    console.log(userId);
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId).unwrap();
        toast.success('User deleted successfully');
      } catch (err) {
        toast.error('Error deleting user: ' + err?.data?.message || err.error);
      }
    }
  };



  const dispatch = useDispatch();
  const deleteHandler = async (id) => {
    // delete order
    // useDeleteOrderMutation

    };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          firstName,
          lastName,
          email,
          password,
          role,
          isAdmin,
          admin,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  useEffect(() => {
    setUsername(userInfo.username);
    setFirstName(userInfo.firstName);
    setLastName(userInfo.lastName);
    setEmail(userInfo.email);
    setRole(userInfo.role);
    setIsAdmin(userInfo?.role === 'ADMIN'); // according to role or according to db?
    setAdmin(userInfo.admin);
  }, [userInfo]);

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>

        <Form onSubmit={submitHandler}>
          <Form.Group className='my-2' controlId='username'>
            <Form.Label>username</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter name'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='my-2' controlId='firstname'>
            <Form.Label>First Name</Form.Label>
            <Form.Control
                type='text'
                placeholder='Enter first name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='my-2' controlId='lastname'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
                type='text'
                placeholder='Enter last name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='my-2' controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='my-2' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='my-2' controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='my-2' controlId='role'>
            <Form.Label>Role</Form.Label>
            <Form.Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
            >
                <option value='BUYER'>Buyer</option>
                <option value='SELLER'>Seller</option>
                <option value='ADMIN'>Admin</option>
            </Form.Select>
          </Form.Group>

        <Form.Group className='my-2' controlId='admin'>
            <Form.Label>Admin</Form.Label>
            <Form.Control
                type='text'
                placeholder='Enter admin'
                value={admin}
                onChange={(e) => setAdmin(e.target.value)}
            ></Form.Control>
        </Form.Group>

          <Button type='submit' variant='primary'>
            Update
          </Button>
          {loadingUpdateProfile && <Loader />}
        </Form>
      </Col>

      <Col md={9}>
        {userInfo && role === 'ADMIN' && (
        <>
            <h2>Managed Users</h2>
            {isLoadingManagedUsers ? (
              <Loader />
            ) : managedUsersError ? (
              <Message variant='danger'>{managedUsersError?.data?.message || managedUsersError.error}</Message>
            ) : (
              <Table striped hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Admin</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {managedUsers.map((user) => (
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


                        <Button
                            variant="danger"
                            className="btn-sm"
                            onClick={() => handleDeleteUser(user._id)}
                            disabled={isDeletingUser}
                            >
                            {isDeletingUser ? 'Deleting...' : 'Delete User'}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </>
        )}
        {userInfo && role === 'SELLER' && (
        <>
            <h2>My Products</h2>
            {isLoadingProducts ? (
              <Loader />
            ) : productsError ? (
              <Message variant='danger'>{productsError?.data?.message || productsError.error}</Message>
            ) : (
              <Table striped hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Count In Stock</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.title}</td>
                      <td>{product.price}</td>
                      <td>{product.CountInStock}</td>
                      <td>
                        <LinkContainer to={`/product/${product._id}`}>
                          <Button className='btn-sm' variant='dark'>
                            Details
                          </Button>
                        </LinkContainer>
                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() => handleDeleteProduct(product._id)}
                          disabled={isDeletingProduct}
                      >
                          {isDeletingProduct ? 'Deleting...' : 'Delete'}
                        </Button>
                        <Button
                          variant='light'
                          className='btn-sm'
                          onClick={() => handleEditProduct(product)}
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            
            <h2>Create or Update Product</h2>
            <Form onSubmit={handleCreateProduct}>
              <Form.Group className='my-2' controlId='title'>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className='my-2' controlId='price'>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter price'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className='my-2' controlId='image'>
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type='file'
                  placeholder='Enter image url'
                  value={image}
                  onChange={handleFileChange}
                ></Form.Control>
              </Form.Group>
              <Form.Group className='my-2' controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className='my-2' controlId='countInStock'>
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter countInStock'
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type='submit' variant='primary'>
                Create Product
              </Button>
              {isCreatingProduct && <Loader />}
              <Button type='submit' variant='primary' onClick={handleUpdateProduct}>
                Update Product
              </Button>
              {isUpdatingProduct && <Loader />}
            </Form>

        <h2> My Orders</h2>
        {isLoadingOrders ? (
          <Loader />
        ) : ordersError ? (
          <Message variant='danger'>
            {ordersError?.data?.message || ordersError.error}
          </Message>
        ) : (
          <Table striped hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Product ID</th>
                <th>Product Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.product}</td>
                  <td>{order.productPrice}</td>
                  <td>{order.quantity}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {/* detail = product page, not order page */}
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='dark'>
                        Details
                      </Button>
                    </LinkContainer>
                    <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => handleDeleteOrder(order._id)}
                        disabled={isDeletingOrder}
                    >
                        {isDeletingOrder ? 'Deleting...' : 'Delete Order'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        </>
        )}
        {userInfo && role === 'BUYER' && (
        <>
        <h2> My Orders</h2>
        {isLoadingOrders ? (
          <Loader />
        ) : ordersError ? (
          <Message variant='danger'>
            {ordersError?.data?.message || ordersError.error}
          </Message>
        ) : (
          <Table striped hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Product ID</th>
                <th>Product Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.product}</td>
                  <td>{order.productPrice}</td>
                  <td>{order.quantity}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {/* detail = product page, not order page? */}
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                    <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => handleDeleteOrder(order._id)}
                        disabled={isDeletingOrder}
                    >
                        {isDeletingOrder ? 'Deleting...' : 'Delete Order'}
                    </Button>
                    <Button
                      className='btn-sm'
                      variant='danger'
                      onClick={() => deleteHandler(order._id)}
                    >
                       Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        </>
        )}
        {!userInfo && (
            // show nothing. display Reviews TBD
            <></>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
