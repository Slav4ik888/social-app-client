import {dataActionType} from '../types';
import {extend} from '../../utils/utils';

const initialState = {
  screams: [],
  scream: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case dataActionType.LOADING_DATA:
      return extend(state, {
        loading: true,
      });
    case dataActionType.SET_SCREAMS:
      return extend(state, {
        screams: action.payload,
        loading: false,
      });
    case dataActionType.LIKE_SCREAM:
    case dataActionType.UNLIKE_SCREAM:
      const index = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId);
      if (index !== -1) {
        state.screams[index] = action.payload;
      }
      if (state.scream.screamId === action.payload.screamId) {
        console.log(`Сработал ИФ`);
        state.scream = action.payload;
      }
      return state;
      
  }
  return state;
}