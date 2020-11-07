import {userActionType, dataActionType} from '../types';
import {extend} from '../../utils/utils';
const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  notifications: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userActionType.LOADING_USER:
      return extend(state, {
        loading: true,
      });

    case userActionType.SET_AUTHENTICATED:
      return extend(state, {
        authenticated: true,
      });

    case userActionType.SET_UNAUTHENTICATED:
      return initialState;

    case userActionType.SET_USER:
      return {
        authenticated: true,
        loading: false,
        credentials: action.payload.credentials,
        likes: action.payload.likes,
        notifications: action.payload.notifications,
      };
    case dataActionType.LIKE_SCREAM:
      console.log(state);
      return extend(state, {
        likes: [...state.likes,
        {
          userHandle: state.credentials.handle,
          screamId: action.payload.screamId,
        }
        ],
      });
    case dataActionType.UNLIKE_SCREAM:
      return extend(state, {
        likes: state.likes.filter((like) => like.screamId !== action.payload.screamId),
      });
    default: return state;
  }
}
