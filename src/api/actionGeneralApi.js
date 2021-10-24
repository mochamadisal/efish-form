const {API_URL} = require('~/constants/variable');
const SteinStore = require('stein-js-client');

const store = new SteinStore(API_URL);

export const apiService = async (endpoint, data) => {
    let result= [];
    const {method, url} = endpoint;

    await store[method](url, data).then((response) => {
        result = response;
    }).catch(function(error) {
        result = error.response;
    });

    return result;
};
