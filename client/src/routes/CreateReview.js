import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useUser } from '../providers/UserProvider';
import { CREATE_REVIEW } from '../api/mutations';

export default function CreateReview() {
  const user = useUser();
  const [subjectId, setSubjectId] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [createReview] = useMutation(CREATE_REVIEW);

  const handleSubjectIdChange = (event) => {
    setSubjectId(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(parseFloat(event.target.value));
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const createReviewInput = {
        subjectId: subjectId,
        rating: rating,
        comment: comment,
      };

      const { data } = await createReview({
        variables: { createReviewInput },
      });

      console.log(data.createReview);

      // Restablecer los campos del formulario después de enviar la review
      setSubjectId('');
      setRating(0);
      setComment('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>CreateReview page</h1>
      <h2>You are logged in as {user.name}</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Subject ID:
            <input
              type="text"
              value={subjectId}
              onChange={handleSubjectIdChange}
            />
          </label>
        </div>
        <div>
          <label>
            Rating:
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={rating}
              onChange={handleRatingChange}
            />
          </label>
        </div>
        <div>
          <label>
            Comment:
            <textarea value={comment} onChange={handleCommentChange} />
          </label>
        </div>
        <button type="submit">Submit Review</button>
      </form>

      <Link to="/">Go back home</Link>
    </div>
  );
}
