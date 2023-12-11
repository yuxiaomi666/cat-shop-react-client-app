import React from "react";
import { useSelector } from "react-redux";
import { useGetReviewsByUserIdQuery } from "../slices/productsApiSlice";
import Loader from "./Loader";
import Message from "./Message";
import { Link } from "react-router-dom";


const Review = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: reviewsData,
    isLoading: isLoadingReviews,
    error: errorReviews,
  } = useGetReviewsByUserIdQuery(userInfo?._id);

  console.log(userInfo);
  console.log(reviewsData);

  return (
    <div>
      <h2>My Reviews</h2>
      {isLoadingReviews ? (
        <Loader />
      ) : errorReviews ? (
        <Message variant="danger">
          {errorReviews?.data?.message || errorReviews.error}
        </Message>
      ) : (
        reviewsData &&
        reviewsData.map((review) => (
          <div
            key={review._id}
            className="review mb-4 p-3 d-flex justify-content-between align-items-center"
            style={{
              border: "1px solid #ddd",
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#f8f8f8",
            }}
          >
            <div>
              <h5 className="mb-2" style={{ color: "#007bff" }}>
                {review.productTitle}  
              </h5>
              <p>{review.comment}</p>
              {/* Add more details as needed */}
            </div>
            <Link
              to={`/home/details/${review.product}`}
              className="btn btn-primary float-end"
            >
              View Details
            </Link>
          </div>
        ))
      )}
    </div>
  );
};


export default Review;
