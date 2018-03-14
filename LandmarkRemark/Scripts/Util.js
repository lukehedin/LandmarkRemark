/*
Any common functions/constants would belong here. As you can see, I only used this file to make a consistent POST
*/

const Util = {
	post: function (endpoint, params, callbacks) {
		//jquery- only use?
		$.ajax(endpoint, {
			data: params,
			type: "POST",
			success: function (data) {
				if (data.errorMsg) {
					//A success calback with errorMsg is a 'friendly' error. Things like wrong passwords.
					alert(data.errorMsg);
					if (callbacks.error) callbacks.error(data);
				} else {
					//Successful callback
					if (callbacks.success) callbacks.success(data);
				}
			},
			error: function (data) {
				//This is a serious server error
				alert('We\'re sorry, something went wrong. Please wait a moment and try again.');
				if (callbacks.error) callbacks.error(data);
			},
			complete: function (data) {
				// This will be called back every time. Things like loadmasks etc
				if (callbacks.complete) callbacks.complete(data);
			}
		});
	}
};