'use strict';

// Data can be in one of the following states
module.exports = {
	// Initialized to a default value
	init(data) {
		return {
	        value: data,
	        isInit: true
	    };
	},
	// Loading from a network resource
	loading(data) {
		return {
	        value: data,
	        isLoading: true
	    };
	},
	// Contains valid data
	success(data) {
		return {
	        value: data,
	       	isSuccess: true
	    };
	},
	// Contains invalid data
	failure(err, prevValue) {
	    return {
	        value: prevValue,
	        isError: true,
	        err: err
	    };
	}
};