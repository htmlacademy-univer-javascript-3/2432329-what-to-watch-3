import { FormEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { postReview } from '../../store/api-actions';
import { isButtonDisabled } from './is-button-disabled';

const STARS = 10;

type ReviewFormProps = {
  id: string;
};

export default function ReviewForm({ id }: ReviewFormProps) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({ rating: '0', reviewText: '' });
  const ratings = [...Array(STARS).keys()].map((_, i) => i + 1).reverse();

  function handleFormSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    dispatch(
      postReview({
        id,
        comment: form.reviewText,
        rating: Number(form.rating),
      })
    );
  }

  return (
    <div className="add-review">
      <form action="" className="add-review__form" onSubmit={handleFormSubmit}>
        <div className="rating">
          <div className="rating__stars">
            {ratings.map((rating) => [
              <input
                key={`input-${rating}`}
                onChange={(evt) =>
                  setForm({ ...form, rating: evt.target.value })}
                className="rating__input"
                id={`star-${rating}`}
                type="radio"
                name="rating"
                value={rating}
                data-testid="rating"
              />,
              <label
                key={`label-${rating}`}
                className="rating__label"
                htmlFor={`star-${rating}`}
              >
                Rating {rating}
              </label>,
            ])}
          </div>
        </div>

        <div className="add-review__text">
          <textarea
            value={form.reviewText}
            onChange={(evt) =>
              setForm({ ...form, reviewText: evt.target.value })}
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder="Review text"
          >
          </textarea>
          <div className="add-review__submit">
            <button
              className="add-review__btn"
              type="submit"
              disabled={isButtonDisabled(form)}
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
