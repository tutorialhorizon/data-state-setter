'use strict';

// Data can be in one of the following states
module.exports = {
	// Initialized to a default value
	init: function (data) {
		return {
	        value: data,
	        isInit: true
	    };
	},
	// Loading from a network resource
	loading: function (data) {
		return {
	        value: data,
	        isLoading: true
	    };
	},
	// Contains valid data
	success: function (data) {
		return {
	        value: data,
	       	isSuccess: true
	    };
	},
	// Contains invalid data
	failure: function (err, prevValue) {
	    return {
	        value: prevValue,
	        isError: true,
	        err: err
	    };
	}
};