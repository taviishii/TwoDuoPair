import React, { useState } from 'react';
import './ReviewPage.css'; 

const Review = () => {
  const [reviews, setReviews] = useState([
    { id: 1, name: 'John Doe', review: 'Great service and amazing experience!' },
    { id: 2, name: 'Jane Smith', review: 'I loved the ambiance and the friendly staff.' },
    { id: 3, name: 'Mark Johnson', review: 'Good value for money, will visit again.' },
  ]);
  const [newReview, setNewReview] = useState({ name: '', review: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.review) {
      setReviews([...reviews, { id: Date.now(), ...newReview }]);
      setNewReview({ name: '', review: '' });
    } else {
      alert('Please fill in both fields');
    }
  };

  return (
    <div className="review-page">
      <h1>Customer Reviews</h1>
      <div className="reviews">
        {reviews.map((review) => (
          <div key={review.id} className="review-box">
            <h3>{review.name}</h3>
            <p>{review.review}</p>
          </div>
        ))}
      </div>

      <h2>Leave a Review</h2>
      <form onSubmit={handleSubmit} className="review-form">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={newReview.name}
          onChange={handleInputChange}
        />
        <textarea
          name="review"
          placeholder="Your Review"
          value={newReview.review}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReviewPage;
