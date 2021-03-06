import {userActionType, uiActionType} from '../types';
import axios from 'axios';


axios.defaults.baseURL =
  `https://europe-west1-socialapp-103bb.cloudfunctions.net/api`;


export const loginUser = (userData, history) => (dispatch) => {
  dispatch({type: uiActionType.LOADING_UI});
  return axios.post(`/login`, userData)
    .then((res) => {
      // console.log(res.data.token);
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({type: uiActionType.CLEAR_ERRORS});
      history.push(`/`);
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch({
        type: uiActionType.SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({type: uiActionType.LOADING_UI});
  return axios.post(`/signup`, newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.userToken);
      dispatch(getUserData());
      dispatch({type: uiActionType.CLEAR_ERRORS});
      history.push(`/`);
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch({
        type: uiActionType.SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem(`FBidToken`);
  delete axios.defaults.headers.common[`Authorization`];
  dispatch({type: userActionType.SET_UNAUTHENTICATED});
};

export const getUserData = () => (dispatch) => {
  dispatch({type: userActionType.LOADING_USER});
  return axios.get(`/user`)
    .then((res) => {
      dispatch({
        type: userActionType.SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const uploadImage = (formData) => (dispatch) => {
  console.log('formData: ', formData);
  dispatch({type: userActionType.LOADING_USER});
  return axios.post(`/user/image`, formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({type: userActionType.LOADING_USER});
  return axios
    .post(`/user`, userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

const setAuthorizationHeader = (token) => {
  const FBidToken = `Bearer ${token}`;
  localStorage.setItem(`FBidToken`, FBidToken);
  // console.log(`H axios: `, axios.defaults.headers);
  axios.defaults.headers.common[`Authorization`] = FBidToken;
};
