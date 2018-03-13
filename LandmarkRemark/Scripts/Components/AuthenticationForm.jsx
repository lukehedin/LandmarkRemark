class AuthenticationForm extends React.Component {
	constructor(props) {
		super(props);

		this.handleLoginClick = this.handleLoginClick.bind(this);
		this.handleRegisterClick = this.handleRegisterClick.bind(this);
		this.handleNewUserClick = this.handleNewUserClick.bind(this);
		this.handleExistingUserClick = this.handleExistingUserClick.bind(this);

		this.state = {
			newUser: false
		}
	}
	handleLoginClick() {
		let username = this.refs.loginUsername.value;
		let password = this.refs.loginPassword.value;

		if (username && password) {
			this.props.handleLoginClick(username, password);
		} else {
			//LH: Should be much prettier/specific
			alert('Please provide a username and password');
		}
	}
	handleRegisterClick() {
		let username = this.refs.regUsername.value;
		let password = this.refs.regPassword.value;
		let confirmPassword = this.refs.regConfirmPassword.value;

		if (username && password && (password === confirmPassword)) {
			this.props.handleRegisterClick(username, password);
		} else {
			//LH: Should be much prettier/specific
			alert('Please provide a username, password and confirmed password');
		}
	}
	handleNewUserClick() {
		this.setState({
			newUser: true
		});
	}
	handleExistingUserClick() {
		this.setState({
			newUser: false
		});
	}
	render() {
		//LH: These forms should also submit when enter is hit while inputs are focused
		let form = this.state.newUser
			? <div className="register-form">
				<input ref="regUsername" type="text" placeholder="Enter username" />
				<input ref="regPassword" type="password" placeholder="Enter password" />
				<input ref="regConfirmPassword" type="password" placeholder="Confirm password" />
				<Button text="Register" onClick={this.handleRegisterClick} />
				<p>
					Existing user? <a onClick={this.handleExistingUserClick}>Log in</a>
				</p>
			</div>
			: <div className="login-form">
				<input ref="loginUsername" type="text" placeholder="Enter username" />
				<input ref="loginPassword" type="password" placeholder="Enter password" />
				<Button text="Log In" onClick={this.handleLoginClick} />
				<p>
					New user? <a onClick={this.handleNewUserClick}>Register here</a>
				</p>
			</div>;

		return (
			<div class="auth-form">
				{form}
			</div>
		);
	}
}
