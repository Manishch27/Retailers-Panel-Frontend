// client/src/actions/authActions.js
import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './types';
import { user } from '../../apis/api';

export const login = (username, password) => async dispatch => {
    try {
        const res = await axios.post(user.login.url, { username, password });

        // Save token and admin status to localStorage
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('isAdmin', JSON.stringify(res.data.admin)); // Save admin status as a JSON string

        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                token: res.data.token,
                admin: res.data.admin
            }
        });
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Login failed';
        dispatch({ type: LOGIN_FAIL, payload: errorMessage });
    }
};

export const logout = () => dispatch => {
    // Remove token and other related data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    dispatch({ type: LOGOUT });
};

export const loadUser = () => dispatch => {
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin');

    if (token) {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                token: token,
                admin: JSON.parse(isAdmin) // Ensure isAdmin is parsed from JSON
            }
        });
    } else {
        dispatch({ type: LOGIN_FAIL });
    }
};