import React, { useState, useEffect } from "react";
import * as client from "./CatAPIClient";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useGetProductsByKeywordQuery } from "../slices/productsApiSlice";
import { BASE_URL } from "../constants";

function Search() {
  const { search } = useParams();
  const [searchTerm, setSearchTerm] = useState(search || "Domestic Short Hair");
  // const [breed, setBreed] = useState(
  //   "Domestic Short Hair,Domestic Medium Hair,Domestic Long Hair"
  // );
  // const [gender, setGender] = useState("Male,Female");
  // const [age, setAge] = useState("Baby,Young,Adult,Senior");
  // const [location, setLocation] = useState("95134");
  // const [distance, setDistance] = useState("100");
  const [cats, setCats] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isSearchPage = location.pathname.includes("search");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  const handleSearch = () => {
    navigate(`/home/search/${searchTerm}`);
  };

  const fetchCats = async (search) => {
    const cats = await client.fetchCats(search);
    setCats(cats);
  };
  const { data: products, isFetching } =
    useGetProductsByKeywordQuery(debouncedSearchTerm);

  useEffect(() => {
    // Set a timeout to update the debounced search term
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 100); // 500ms delay
    if (searchTerm === "") {
      // Clear products when search term is empty
      setSearchTerm(null);
    }
    if (search) {
      //if search term is not null, fetch cats
      setSearchTerm(search); //calling local api
      fetchCats(search); //calling cat api
    }
    //  else {
    //   fetchCats("Domestic Short Hair"); //if search term is null, fetch cats with default search term
    // }
    // Clear the timeout if searchTerm changes
    return () => clearTimeout(timerId);
  }, [search]);

  return (
    <Container>
      <Row className="justify-content-md-center mt-3 mb-3">
        <Col md={6}>
          <input
            type="text"
            className="form-control"
            placeholder="Search by breed: Domestic Short Hair,Domestic Medium Hair,Domestic Long Hair"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md="auto">
          <button onClick={handleSearch} className="btn btn-primary">
            Search
          </button>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          {isSearchPage && (
            <ul className="list-group">
              {cats &&
                cats.map((cat) => (
                  <li key={cat.id} className="list-group-item">
                    <Link
                      to={`/home/details/${cat.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="row">
                        {cat.photos && cat.photos.length > 0 ? (
                          <div>
                            <img src={cat.photos[0].medium} alt={cat.name} />
                          </div>
                        ) : null}

                        <div className="mt-2">
                          <p >
                            {cat.name} - {cat.breeds?.primary} - {cat.gender}
                          </p>
                          <p>ID: {cat.id}</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
          )}
        </Col>
        <Col md={6}>
          {isSearchPage && isFetching && <p>Loading products...</p>}
          {isSearchPage && products && (
            <div className="row">
              {products.map((product) => (
                <div key={product._id} className="col-md-3 col-lg-8 mb-3">
                  <div className="card h-100">
                    <img
                      src={`${BASE_URL}${product.image}`}
                      className="card-img-top"
                      alt={product.title}
                      style={{ objectFit: "cover", height: "300px" }}
                    />
                    <div className="card-body">
                      <Link to={`/product/${product._id}`}>
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-text">{product.description}</p>
                        <p className="card-text">
                          <b>Price:</b> ${product.price}
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Search;
