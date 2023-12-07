import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { redirect } from './redirect';
import { State } from '../../types/state';
import { AnyAction } from '@reduxjs/toolkit';
import { browserHistory } from '../../services/browser-history';
import { redirectToRoute } from '../action';
import { AppRoutes } from '../../const';

vi.mock('../../browser-history', () => ({
  default: {
    location: { pathname: '' },
    push(path: string) {
      this.location.pathname = path;
    },
  },
}));

describe('Redirect middleware', () => {
  let store: MockStore;

  beforeAll(() => {
    const middleware = [redirect];
    const mockStoreCreator = configureMockStore<State, AnyAction>(middleware);
    store = mockStoreCreator();
  });

  beforeEach(() => {
    browserHistory.push('');
  });

  it('redirects to login page with redirectToRoute action', () => {
    const redirectAction = redirectToRoute(AppRoutes.Login);
    store.dispatch(redirectAction);
    expect(browserHistory.location.pathname).toBe(AppRoutes.Login);
  });

  it('doesn\'t redirect to main page with empty action', () => {
    const emptyAction = { type: '', payload: AppRoutes.Main };
    store.dispatch(emptyAction);
    expect(browserHistory.location.pathname).not.toBe(AppRoutes.Main);
  });
});
