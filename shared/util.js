const request = require('request');

const util = {

    jsonFormat: {spaces: 2},

    successPayload: (data) => {
        return {data};
    },

    errorPayload: (message) => {
        return {
            message: 'Server je pao u trans. ' + (message || '')
        };
    },

    getLanguages: (cb) => {
        request.get('https://dev-cmpapi.greatplacetowork.com/api/Languages', cb);
    }
}

module.exports = util;