class AppBase extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: props.user
		};
	}
	render() {
		let baseContent;

		if (this.state.user) {
			
		} else {
			baseContent = <AuthenticationForm />
		}


		return (
			<div className="login-form">
				{baseContent}
			</div>
		);
	}
}
