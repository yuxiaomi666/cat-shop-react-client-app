import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as client from "./CatAPIClient";
import { useSelector } from "react-redux";
import {
  useCreateReviewCatAPIMutation,
  useCreateReviewMutation,
  useGetReviewsByIdQuery,
} from "../slices/productsApiSlice";
import {
  Card,
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  Col,
  Image,
  Form,
  Button,
} from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Details() {
  const { catId } = useParams();
  const [catTitle, setCatTitle] = useState("Adopt-A-Cat"); //this just to satisfy the schema requirement
  const [cat, setCat] = useState(null);
  const { userInfo } = useSelector((state) => state.auth); //not sure what this do
  const [comment, setComment] = useState("");
  

  const [createReviewCatAPI, { isLoading: loadingProductReview }] =
    useCreateReviewCatAPIMutation();

  const {
    data: reviews,
    isLoading: loadingReviews,
    error: reviewsError,
    refetch,
  } = useGetReviewsByIdQuery(catId);

  const submitReviewHandler = async (e) => {
    console.log("CatId:", catId); //test if catId is working
    e.preventDefault();
    console.log(e.target.data);
    try {
      await createReviewCatAPI({
        product: catId,
        comment: comment,
        productTitle: catTitle,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const fetchCat = async () => {
    const cat = await client.fetchCatById(catId);
    setCat(cat);
  };

  useEffect(() => {
    fetchCat();
  }, []);

  return (
    <div>
      {cat && (
        <Container>
          <Row className="justify-content-md-center">
            {/* Cat Details Column */}
            <Col md={5}>
              <Row className="justify-content-md-center">
                <Col md={8}>
                  <Card>
                    {cat.photos && cat.photos.length > 0 && (
                      <Card.Img
                        variant="top"
                        src={cat.photos[0].medium}
                        alt={cat.name}
                      />
                    )}
                    <Card.Body>
                      <Card.Title>{cat.name}</Card.Title>
                      <ListGroup className="list-group-flush">
                        <ListGroupItem>
                          <strong>Breed:</strong> {cat.breeds?.primary}
                        </ListGroupItem>
                        <ListGroupItem>
                          <strong>Age:</strong> {cat.age}
                        </ListGroupItem>
                        <ListGroupItem>
                          <strong>Gender:</strong> {cat.gender}
                        </ListGroupItem>
                        <ListGroupItem>
                          <strong>Spayed/Neutered:</strong>{" "}
                          {cat.attributes?.spayed_neutered ? "Yes" : "No"}
                        </ListGroupItem>
                        <ListGroupItem>
                          <strong>Status:</strong> {cat.status}
                        </ListGroupItem>
                        <ListGroupItem>
                          <strong>Published At:</strong> {cat.published_at}
                        </ListGroupItem>
                        <ListGroupItem>
                          <strong>Description:</strong> {cat.description}
                        </ListGroupItem>
                        <ListGroupItem>
                          <strong>Contact:</strong>
                          <div>{cat.contact?.email}</div>
                          <div>{cat.contact?.phone}</div>
                        </ListGroupItem>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>

            {/* Comment Section Column */}
            <Col md={7}>
              {/* Comment section content goes here */}
          
              <Row className="review">
                <Col md={6}>
                  <h2>Reviews</h2>
                  <ListGroup variant="flush">
                    {loadingReviews ? (
                      <Loader />
                    ) : reviewsError ? (
                      <Message variant="danger">{reviewsError.message}</Message>
                    ) : reviews && reviews.length > 0 ? (
                      reviews.map((review) => (
                        <ListGroup.Item key={review._id}>
                          <strong>{review.comment}</strong>
                          <div>
                            {/* Display user's name */}
                            <span>Reviewed by: </span>
                            {/* Link to the user's profile */}
                            {/* Adjust the path as per your routing setup */}
                            <Link to={`/profile/${review.user}`}>
                              {review.userName}
                             
                            </Link>
                          </div>
                        </ListGroup.Item>
                      ))
                    ) : (
                      <Message>No Reviews</Message>
                    )}

                    <ListGroup.Item>
                      <h2>Write a Customer Review</h2>

                      {loadingProductReview && <Loader />}

                      {userInfo ? (
                        <Form onSubmit={submitReviewHandler}>
                          <Form.Group className="my-2" controlId="comment">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                              as="textarea"
                              row="3"
                              required
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            ></Form.Control>
                          </Form.Group>
                          <Button
                            disabled={loadingProductReview}
                            type="submit"
                            variant="primary"
                          >
                            Submit
                          </Button>
                        </Form>
                      ) : (
                        <Message>
                          Please <Link to="/login">sign in</Link> to write a
                          review
                        </Message>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default Details;
