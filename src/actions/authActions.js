// client/src/actions/authActions.js
import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './types';
import { user } from '../../apis/api';

let autoLogoutTimer = null;

// Function to start the auto logout timer
const startAutoLogoutTimer = (dispatch) => {
    // Clear any existing timer
    if (autoLogoutTimer) {
        clearTimeout(autoLogoutTimer);
    }

    // Set a new timer for 1 day
    autoLogoutTimer = setTimeout(() => {
        dispatch(logout()); // Dispatch logout action
    }, 24 * 60 * 60 * 1000 ); // 1 day in milliseconds
};

// Function to reset the auto logout timer on user activity
const resetAutoLogoutTimer = (dispatch) => {
    if (autoLogoutTimer) {
        clearTimeout(autoLogoutTimer);
    }
    startAutoLogoutTimer(dispatch); // Restart the timer
};

// Action to handle login
export const login = (username, password) => async dispatch => {
    try {
        const res = await axios.post(user.login.url, { username, password });

        // Save token and admin status to localStorage
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('isAdmin', JSON.stringify(res.data.admin)); // Save admin status as a JSON string
        localStorage.setItem('id', res.data.id);
        localStorage.setItem('username', res.data.name);
        console.log(res);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                token: res.data.token,
                admin: res.data.admin,
                id: res.data.id,
                username: res.data.name
            }
        });

        // Start auto logout timer on successful login
        startAutoLogoutTimer(dispatch);
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Login failed';
        dispatch({ type: LOGIN_FAIL, payload: errorMessage });
    }
};

// Action to handle logout
export const logout = () => dispatch => {
    // Remove token and other related data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    dispatch({ type: LOGOUT });

    // Clear the auto logout timer
    if (autoLogoutTimer) {
        clearTimeout(autoLogoutTimer);
    }
};

// Action to load user data
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

        // Start auto logout timer if user is loaded
        startAutoLogoutTimer(dispatch);
    } else {
        dispatch({ type: LOGIN_FAIL });
    }
};

// Event listeners for user activity
const setupEventListeners = (dispatch) => {
    window.addEventListener('mousemove', () => resetAutoLogoutTimer(dispatch));
    window.addEventListener('keypress', () => resetAutoLogoutTimer(dispatch));
    window.addEventListener('click', () => resetAutoLogoutTimer(dispatch));
};

// Initialize event listeners
export const initializeAutoLogout = (dispatch) => {
    setupEventListeners(dispatch);
    // Start timer on initial load
    startAutoLogoutTimer(dispatch);
};