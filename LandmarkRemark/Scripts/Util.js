const Util = {
	post: function (endpoint, params, callbacks) {
		//jquery- only use?
		$.ajax(endpoint, {
			data: params,
			type: "POST",
			success: function (data) {
				if (data.errorMsg) {
					//LH: A success calback with errorMsg is a 'friendly' error. Things like wrong passwords.
					alert(data.errorMsg);
					if (callbacks.error) callbacks.error(data);
				} else {
					//LH: Successful callback
					if (callbacks.success) callbacks.success(data);
				}
			},
			error: function (data) {
				//LH: This is a serious server error
				if (callbacks.error) callbacks.error(data);
				alert('We\'re sorry, something went wrong. Please wait a moment and try again.');
			},
			complete: function (data) {
				//LH This will be called back every time. Things like loadmasks etc
				if (callbacks.complete) callbacks.complete(data);
			}
		});
	},

	setLoading: function (element) {

	}
};