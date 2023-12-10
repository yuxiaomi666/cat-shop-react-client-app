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

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();    //old
  const { data, isLoading, error } = useGetProductsQuery();

  //for cat page api
  const [key, setKey] = useState("home");
  const { pathname } = useLocation();
  console.log(data);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <h1>This space below header bar</h1>
          </div>
        </div>
        <div className="row">
          <Search />
        </div>
      </div>

      {/* <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link>
    */}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          {/* <Meta
            title="Latest Products - ProShop"
            description="Check out the latest products on ProShop"
          /> */}

          <h1>Latest Products</h1>
          <Row>
            {data &&
              data.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
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

          {/* <Paginate         this is orginally for displaying pages of products
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          /> */}
        </>
      )}
    </>
  );
};

export default HomeScreen;
