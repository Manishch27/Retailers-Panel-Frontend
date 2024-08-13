// User endpoints

export const user = {
    login: {   //done
        method: 'post',
        url: '/api/v1/users/login',
    },

    createUser: { //done
        method: 'post',
        url: '/api/v1/users/register',
    },

    getAllRetailers: {  //done
        method: 'get',
        url: '/api/v1/users/',
    },

    updateRetailers: {
        method: 'put',
        url: '/api/v1/users/:id'
    },

    deleteRetailer: {
        method: 'delete',
        url: '/api/v1/users/:id'
    },

    updateToken: {
        method: 'put',
        url: '/api/v1/users'
    }
};


export const application = {
    getAllApplications: {
        method: 'get',
        url: '/api/v1/applications/',
    },

    updateApplicationStatus: {
        method: 'put',
        url: '/api/v1/applications',
    },

    getRetailersAppliactions: {
        method: 'get',
        url: '/api/v1/applications/retailer',
    },

    createApplication: {
        method: 'post',
        url: '/api/v1/applications/',
    },

    getApplication: {
        method: 'get',
        url: '/api/v1/applications/',
    },
};
