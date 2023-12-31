import { Namespace } from '../../const';
import { mockMovie } from '../../mocks/movie';
import { mockMoviePreviews } from '../../mocks/movie-previews';
import { mockPromoMovie } from '../../mocks/promo-movie';
import {
  getMovie,
  getMovieFetchingStatus,
  getMoviePreviews,
  getMyList,
  getMyListLength,
  getPromoMovie,
  getSimilarMovies,
} from './selectors';

describe('Movie process selectors', () => {
  const state = {
    [Namespace.Movie]: {
      moviePreviews: mockMoviePreviews,
      movie: mockMovie,
      similarMovies: mockMoviePreviews,
      promoMovie: mockPromoMovie,
      myList: mockMoviePreviews,
      myListLength: mockMoviePreviews.length,
      isFetchingMovieData: false,
    },
  };

  it('returns moviePreviews from state', () => {
    const { moviePreviews } = state[Namespace.Movie];
    const result = getMoviePreviews(state);
    expect(result).toEqual(moviePreviews);
  });

  it('returns movie from state', () => {
    const { movie } = state[Namespace.Movie];
    const result = getMovie(state);
    expect(result).toEqual(movie);
  });

  it('returns similarMovies from state', () => {
    const { similarMovies } = state[Namespace.Movie];
    const result = getSimilarMovies(state);
    expect(result).toEqual(similarMovies);
  });

  it('returns promoMovie from state', () => {
    const { promoMovie } = state[Namespace.Movie];
    const result = getPromoMovie(state);
    expect(result).toEqual(promoMovie);
  });

  it('returns myList from state', () => {
    const { myList } = state[Namespace.Movie];
    const result = getMyList(state);
    expect(result).toEqual(myList);
  });

  it('returns myListLength from state', () => {
    const { myListLength } = state[Namespace.Movie];
    const result = getMyListLength(state);
    expect(result).toEqual(myListLength);
  });

  it('returns isFetchingMovieData from state', () => {
    const { isFetchingMovieData } = state[Namespace.Movie];
    const result = getMovieFetchingStatus(state);
    expect(result).toEqual(isFetchingMovieData);
  });
});
