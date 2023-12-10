import React, { useState, useEffect } from "react";
import * as client from "./CatAPIClient";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";

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

  const fetchCats = async (search) => {
    const cats = await client.fetchCats(search);
    setCats(cats);
    setSearchTerm(search);
  };

  useEffect(() => {
    if (search) {//if search term is not null, fetch cats
      fetchCats(search);
    } else {
      fetchCats( "Domestic Short Hair");   //if search term is null, fetch cats with default search term
    }
  }, [search]);

  return (
    <div>
      <button
        onClick={() => navigate(`/home/search/${searchTerm}`)}     //redirect to search page, and useParams to get the search term
        className="btn btn-primary float-end"
      >
        Search
      </button>
      <input
        type="text"
        className="form-control w-75"
        placeholder="Search by breed"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

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
                    <div className="col-6">
                      <img src={cat.photos[0].medium} alt={cat.name} />
                    </div>
                  ) : null}

                  <div className="col-6">
                    <p>
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
    </div>
  );
}

export default Search;