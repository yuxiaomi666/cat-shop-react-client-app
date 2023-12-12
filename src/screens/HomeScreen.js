import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import Meta from "../components/Meta";
import { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Details from "../components/CatAPIDetails";
import Search from "../components/CatAPISearch";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import Review from "../components/Review";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams(); //old
  const { data, isLoading, error } = useGetProductsQuery();
  const { userInfo } = useSelector((state) => state.auth);
  //for cat page api
  const [key, setKey] = useState("home");
  const { pathname } = useLocation();
  

  return (
    <div className="container-fluid">
      {/* Row for Search Bar */}
      <div className="row">
        <div className="col-12">
          <Search />
        </div>
      </div>

      {/* Row for Product Display */}
      <div className="row">
        <h1>Latest Products</h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Row>
            {/* Left Spacer Column */}
            <Col lg={2}></Col>

            {/* Middle Column with Product Cards */}
            <Col lg={8}>
              <Row>
                {data &&
                  data.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
                      <Card className="my-3 p-3 rounded">
                        <Link to={`/product/${product._id}`}>
                          <Card.Img src={product.image} variant="top" />
                        </Link>

                        <Card.Body>
                          <Link to={`/product/${product._id}`}>
                            <Card.Title as="div" className="product-title">
                              <strong>{product.title}</strong>
                            </Card.Title>
                          </Link>

                          <Card.Text as="h3">${product.price}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </Col>

            {/* Right Spacer Column */}
            <Col lg={2}></Col>
          </Row>
        )}
      </div>

      {/* Row for User Reviews */}
      <div className="row">
        {/* Left Spacer Column */}
        <Col lg={2}></Col>

        {/* Middle Column with Product Cards */}
        <Col lg={8}>
          <Review />
        </Col>
        <Col lg={2}></Col>
      </div>
    </div>
  );
};

export default HomeScreen;
