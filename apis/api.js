// User endpoints

export const user = {
    login: {   //done
        method: 'post',
        url: 'http://localhost:8001/api/v1/users/login',
    },

    createUser: { //done
        method: 'post',
        url: 'http://localhost:8001/api/v1/users/register',
    },

    getAllRetailers: {  //done
        method: 'get',
        url: 'http://localhost:8001/api/v1/users/',
    },

    updateRetailers: {
        method: 'put',
        url: 'http://localhost:8001/api/v1/users/:id'
    },

    deleteRetailer: {
        method: 'delete',
        url: 'http://localhost:8001/api/v1/users/:id'
    },

    updateToken: {
        method: 'put',
        url: 'http://localhost:8001/api/v1/users'
    }
};


export const application = {
    getAllApplications: {
        method: 'get',
        url: 'http://localhost:8001/api/v1/applications/',
    },

    updateApplicationStatus: {
        method: 'put',
        url: 'http://localhost:8001/api/v1/applications/:id',
    },

    getRetailersAppliactions: {
        method: 'get',
        url: 'http://localhost:8001/api/v1/applications/retailer',
    },

    createApplication: {
        method: 'post',
        url: 'http://localhost:8001/api/v1/applications/',
    }
};
