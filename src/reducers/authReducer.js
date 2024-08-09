// client/src/reducers/authReducer.js
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token') || null,
    isAuthenticated: false,
    loading: true,
    error: null,
    isAdmin: false,
};

export default function (state = initialState, action) {
    console.log(action.type);
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.token, // Assuming the token is included in the payload
                isAuthenticated: true,
                user: action.payload.user, // Assuming user details are included in the payload
                isAdmin: action.payload.admin, // Assuming admin status is included in the payload
                loading: false,
                error: null
            };
        case LOGIN_FAIL:
        case LOGOUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                error: action.payload,
                isAdmin: false
            };
        default:
            return state;
    }
}