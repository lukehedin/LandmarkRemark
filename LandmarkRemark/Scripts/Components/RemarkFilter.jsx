class RemarkFilter extends React.Component {
	constructor(props) {
		super(props);

		this.onFilterChange = this.onFilterChange.bind(this);
	}
	onFilterChange() {
		clearTimeout(this.props.filterDelayTimeout);

		this.props.filterDelayTimeout = setTimeout(() => {
			this.props.filterRemarks(this.refs.filterInput.value);
		}, 600);
	}
	render() {
		return (
			<div className="remark-filter-container">
				<div className="remark-filter-container-inner">
					<img src="/Images/search.svg" />
					<input type="text" ref="filterInput" onChange={this.onFilterChange} />
				</div>
			</div>
		);
	}
}