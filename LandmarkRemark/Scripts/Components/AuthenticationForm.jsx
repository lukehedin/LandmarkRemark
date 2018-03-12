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

	}
	handleRegisterClick() {

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
				<input ref="username" type="text" placeholder="Enter username" />
				<input ref="password" type="password" placeholder="Enter password" />
				<input ref="confirmPassword" type="password" placeholder="Confirm password" />
				<Button text="Register" click={this.handleRegisterClick} />
				<p>
					Existing user? <a onClick={this.handleExistingUserClick}>Log in</a>
				</p>
			</div>
			: <div className="login-form">
				<input ref="username" type="text" placeholder="Enter username" />
				<input ref="password" type="password" placeholder="Enter password" />
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
