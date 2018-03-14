/*
Just a simple button used on multiple elements. Mainly used for the sake of consistent styling.
If there ever needed to be other tweaks to the way buttons work (perhaps touch devices etc) they would be put here
*/

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
