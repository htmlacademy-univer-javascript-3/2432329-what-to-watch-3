import { Helmet } from 'react-helmet-async';
import { Link, generatePath, useParams } from 'react-router-dom';
import ReviewForm from '../../components/review-form/review-form';
import { AppRoutes } from '../../const';
import NotFoundPage from '../not-found-page/not-found-page';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { fetchMovie } from '../../store/api-actions';
import UserBlock from '../../components/ui/user-block/user-block';
import Spinner from '../../components/ui/spinner/spinner';
import {
  getMovie,
  getMovieFetchingStatus,
} from '../../store/movie-process/selectors';
import Logo from '../../components/ui/logo/logo';

export default function ReviewPage() {
  const { id } = useParams();
  const movie = useAppSelector(getMovie);
  const isFetchingData = useAppSelector(getMovieFetchingStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchMovie(id));
    }
  }, [id, dispatch]);

  if (isFetchingData) {
    return <Spinner isActive />;
  }

  if (!movie || !id) {
    return <NotFoundPage />;
  }

  return (
    <section
      className="film-card film-card--full"
      style={{ backgroundColor: movie.backgroundColor }}
    >
      <Helmet>
        <title>Review</title>
      </Helmet>

      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={movie.backgroundImage} alt={movie.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link
                  to={generatePath(AppRoutes.Movie, { id: movie.id })}
                  className="breadcrumbs__link"
                >
                  {movie.name}
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <UserBlock />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img
            src={movie.posterImage}
            alt={`${movie.name} poster`}
            width="218"
            height="327"
          />
        </div>
      </div>

      <ReviewForm id={id} />
    </section>
  );
}
