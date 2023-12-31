import { Helmet } from 'react-helmet-async';
import MoviePreviewsByGenre from '../../components/movie-previews-by-genre/movie-previews-by-genre';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Spinner from '../../components/ui/spinner/spinner';
import UserBlock from '../../components/ui/user-block/user-block';
import { useEffect } from 'react';
import { fetchPromoMovie } from '../../store/api-actions';
import {
  getMovieFetchingStatus,
  getPromoMovie,
} from '../../store/movie-process/selectors';
import Logo from '../../components/ui/logo/logo';
import Footer from '../../components/ui/footer/footer';
import MyListButton from '../../components/ui/my-list-button/my-list-button';
import PlayButton from '../../components/ui/play-button/play-button';

export default function MainPage() {
  const dispatch = useAppDispatch();
  const promoMovie = useAppSelector(getPromoMovie);
  const isFetchingData = useAppSelector(getMovieFetchingStatus);

  useEffect(() => {
    dispatch(fetchPromoMovie());
  }, [dispatch]);

  if (isFetchingData || !promoMovie) {
    return <Spinner isActive />;
  }

  return (
    <>
      <Helmet>
        <title>Main</title>
      </Helmet>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoMovie.backgroundImage} alt={promoMovie.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo />

          <UserBlock />
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img
                src={promoMovie.posterImage}
                alt={`${promoMovie.name} poster`}
                width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoMovie.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoMovie.genre}</span>
                <span className="film-card__year">{promoMovie.released}</span>
              </p>

              <div className="film-card__buttons">
                <PlayButton id={promoMovie.id} />
                <MyListButton
                  id={promoMovie.id}
                  isFavorite={promoMovie.isFavorite}
                  category="promoMovie"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <MoviePreviewsByGenre />

        <Footer />
      </div>
    </>
  );
}
