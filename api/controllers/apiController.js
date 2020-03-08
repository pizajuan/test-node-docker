const mongoose = require('mongoose');

class APIController {
    static checkParams(Query, params) {
        // Query.limit(2);
        if (params.limit) {
            Query.limit(+params.limit);
        }
        if (params.populate) {
            console.log(params.populate);
            if (typeof params.populate == 'string') {
                Query.populate(params.populate);
            }
            if (Array.isArray(params.populate)) {
                params.populate.array.forEach(populateElem => {
                    Query.populate(populateElem);
                });
            }         
        }
        return Query;
    }
}


module.exports.APIController = APIController;