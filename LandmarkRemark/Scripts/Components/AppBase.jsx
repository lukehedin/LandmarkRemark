/*
The AppBase holds all subcomponents and is intialised on page load.
Depending on whether there is an authenticated user passed in from the backend, the authentication form or map will be shown.
*/

class AppBase extends React.Component {
	constructor(props) {
		super(props);

		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.register = this.register.bind(this);

		//Session stores user with non-camelCase so we remap here. A bit gross.
		this.state = {
			user: props.user ? {
				userId: props.user.UserId,
				username: props.user.Username
			} : null
		};
	}
	login(username, password) {
		let appBase = this;

		Util.post('Login', {
			username: username,
			password: password
		}, {
			success: function (data) {
				appBase.setState({
					user: data
				});
			}
		});
	}
	logout() {
		let appBase = this;

		Util.post('Logout', {}, {
			success: function () {
				appBase.setState({
					user: null
				});
			}
		});
	}
	register(username, password) {
		let appBase = this;

		Util.post('Register', {
			username: username,
			password: password
		}, {
			success: function (data) {
				appBase.setState({
					user: data
				});
			}
		});
	}
	render() {
		let baseContent;
		let userInfo;

		if (this.state.user) {
			baseContent = <RemarkMap /> 
			userInfo = <div>{this.state.user.username}<br/><a onClick={this.logout}>Log out</a></div>
		} else {
			baseContent = <AuthenticationForm
				handleLoginClick={this.login}
				handleLogoutClick={this.logout}
				handleRegisterClick={this.register} />
			userInfo = ``;
		}
		
		return (
			<div className="app-base">
				<header className="app-header">
					<div className="app-title">
						<img src="/Images/logo.svg"/>
					</div>
					<div className="app-user-info">
						{userInfo}
					</div>
				</header>
				<div class="app-content">
					{baseContent}
				</div>
			</div>
		);
	}
}
