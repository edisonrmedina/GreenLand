import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import styled from './Reviews.module.css';
const { VITE_SERVER_URL } = import.meta.env;
import { alertConfirm } from '../SweetAlert/SweetAlert'

const Reviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${VITE_SERVER_URL}/reviews/product/${id}`);
        setReviews(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, [id]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleSubmitReview = async () => {
    try {
      if (reviewText.length > 200) {
        setErrorMessage('Review text cannot exceed 200 characters');
        return;
      }

      const response = await axios.post(`${VITE_SERVER_URL}/reviews/`, {
        productId: id,
        rating: rating,
        reviewText: reviewText,
        date: new Date().toISOString(),
        userId,
      });
      if (response.status === 201) {
        // La reseña se envió correctamente
        setSuccessMessage('Review submitted successfully');
        setRating(0);
        setReviewText('');
        fetchReviews(); // Actualiza la lista de reseñas
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Error submitting review');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
        const confirmed = await alertConfirm("Are you sure you want to delete the review?"); 
        if (confirmed) {
        const config = {
          headers: {
            'Authorization': `Bearer + ${token || null}`, 
          },
        };
        const response = await axios.delete(`http://localhost:3001/reviews/${reviewId}`, config);
        if (response.status === 200) {
        // La reseña se eliminó correctamente
        setSuccessMessage('Review deleted successfully');
        fetchReviews(); // Actualiza la lista de reseñas
      }
     }
    } catch (error) {
      console.error(error);
      setErrorMessage('Error deleting review');
    }
  };

  return (
    <div className={styled.reviewsContainer}>
      <h2 className={styled.reviewsContainerH2}>Reviews</h2>
      <Link to={`/reviews/${id}`} className={styled.linkReviews}>Read {reviews.length} Reviews</Link>
  
      {/* Renderiza las estrellas y las reseñas individualmente */}
      {reviews.map((review) => (
        <div className={styled.reviewItem} key={review.id}>
          {/* Renderiza la información de la reseña */}
          {/* Renderiza el componente DeleteReview */}
          <button className={styled.buttonDelete} onClick={handleDeleteReview}>
            Delete Review
          </button>
        </div>
      ))}
  
      {/* Muestra las estrellas */}
      <div className={styled.starIcons}>
        <h3>Leave a Review</h3>
        {successMessage && <p className={styled.successMessage}>{successMessage}</p>}
        {errorMessage && <p className={styled.errorMessage}>{errorMessage}</p>}
        <div>
          {[1, 2, 3, 4, 5].map((value) => (
            <span key={value} onClick={() => handleRatingChange(value)}>
              {value <= rating ? (
                <BsStarFill className={styled.starIconsSvgFilled} />
              ) : value - 0.5 === rating ? (
                <BsStarHalf className={styled.starIconsSvgHalf} />
              ) : (
                <BsStar className={styled.starIconsSvgEmpty} />
              )}
            </span>
          ))}
        </div>
      </div>
      {/* Muestra el formulario para escribir la reseña */}
      <textarea
        className={styled.reviewFormTextarea}
        value={reviewText}
        onChange={handleReviewTextChange}
        placeholder="Write your review..."
      />
      <button className={styled.reviewFormButton} onClick={handleSubmitReview} disabled={reviewText.length > 200}>
        Submit Review
      </button>
    </div>
  );
  };

  export default Reviews;