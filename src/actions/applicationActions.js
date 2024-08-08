// client/src/actions/applicationActions.js
import axios from 'axios';
import { GET_APPLICATIONS, CREATE_APPLICATION, UPDATE_APPLICATION_STATUS } from './types';

export const getApplications = () => async dispatch => {
    try {
        const res = await axios.get('/applications');
        dispatch({ type: GET_APPLICATIONS, payload: res.data });
    } catch (error) {
        console.error(error);
    }
};

export const createApplication = (applicationData) => async dispatch => {
    try {
        const res = await axios.post('/applications', applicationData);
        dispatch({ type: CREATE_APPLICATION, payload: res.data });
    } catch (error) {
        console.error(error);
    }
};

export const updateApplicationStatus = (id, status) => async dispatch => {
    try {
        const res = await axios.put(`/applications/${id}`, { status });
        dispatch({ type: UPDATE_APPLICATION_STATUS, payload: res.data });
    } catch (error) {
        console.error(error);
    }
};