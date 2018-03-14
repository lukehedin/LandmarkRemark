/*
Responsible for logging in and registering users. Different forms shown depending on newUser bool.
This component handles any validation of its forms, but once validated, the AppBase handles the submit action
*/

class AuthenticationForm extends React.Component {
	constructor(props) {
		super(props);

		this.regKeyDown = this.regKeyDown.bind(this);
		this.loginKeyDown = this.loginKeyDown.bind(this);
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
			//Could be nicer
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
			//Could be nicer
			if (password === confirmPassword) {
				alert('Please provide a username, password and confirmed password');
			} else {
				alert('Passwords do not match');
			}
		}
	}
	regKeyDown(e) {
		if (e.keyCode == 13) this.handleRegisterClick();
	}
	loginKeyDown(e) {
		if (e.keyCode == 13) this.handleLoginClick();
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
		let form = this.state.newUser
			? <div className="register-form">
				<div className="auth-inputs">
					<input className="auth-input" onKeyDown={this.regKeyDown} ref="regUsername" type="text" placeholder="Enter username" />
					<input className="auth-input" onKeyDown={this.regKeyDown} ref="regPassword" type="password" placeholder="Enter password" />
					<input className="auth-input" onKeyDown={this.regKeyDown} ref="regConfirmPassword" type="password" placeholder="Confirm password" />
					<Button text="Register" onClick={this.handleRegisterClick} />
				</div>
				<p>Existing user?</p>
				<a onClick={this.handleExistingUserClick}>Log in</a>
			</div>
			: <div className="login-form">
				<div className="auth-inputs">
					<input className="auth-input" onKeyDown={this.loginKeyDown} ref="loginUsername" type="text" placeholder="Enter username" />
					<input className="auth-input" onKeyDown={this.loginKeyDown} ref="loginPassword" type="password" placeholder="Enter password" />
					<Button text="Log In" onClick={this.handleLoginClick} />
				</div>
				<p>New user?</p>
				<a onClick={this.handleNewUserClick}>Register here</a>
			</div>;

		return (
			<div class="auth-form">
				{form}
			</div>
		);
	}
}
