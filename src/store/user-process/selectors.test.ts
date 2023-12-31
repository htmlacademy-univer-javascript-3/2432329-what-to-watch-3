import { internet } from 'faker';
import { AuthorizationStatus, Namespace } from '../../const';
import { getAuthorizationStatus, getAvatarUrl } from './selectors';

describe('User process selectors', () => {
  const state = {
    [Namespace.User]: {
      authorizationStatus: AuthorizationStatus.Auth,
      avatarUrl: internet.url(),
    },
  };

  it('returns authorizationStatus from state', () => {
    const { authorizationStatus } = state[Namespace.User];
    const result = getAuthorizationStatus(state);
    expect(result).toBe(authorizationStatus);
  });

  it('returns avatarUrl from state', () => {
    const { avatarUrl } = state[Namespace.User];
    const result = getAvatarUrl(state);
    expect(result).toBe(avatarUrl);
  });
});
