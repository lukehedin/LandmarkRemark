class Button extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<button className={(this.props.className || '')  + " standard-button"} onClick={this.props.onClick}>
				{this.props.text}
			</button>
		);
	}
}
