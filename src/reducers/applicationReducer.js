// client/src/reducers/applicationReducer.js
import { GET_APPLICATIONS, CREATE_APPLICATION, UPDATE_APPLICATION_STATUS } from '../actions/types';

const initialState = {
    applications: [],
    loading: true
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_APPLICATIONS:
            return {
                ...state,
                applications: action.payload,
                loading: false
            };
        case CREATE_APPLICATION:
            return {
                ...state,
                applications: [action.payload, ...state.applications],
                loading: false
            };
        case UPDATE_APPLICATION_STATUS:
            return {
                ...state,
                applications: state.applications.map(application =>
                    application._id === action.payload._id ? action.payload : application
                ),
                loading: false
            };
        default:
            return state;
    }
}