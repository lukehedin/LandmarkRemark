/*
The filter for remarks. Simply the visual element, and the filter delay belongs here.
Takes in a filterRemarks function, so this filter could be used for other remark stores (maybe a page with a list view of remarks).
*/

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
					<div class="remark-filter">
						<img src="/Images/search.svg" />
						<input className="remark-filter-input" type="text" ref="filterInput" placeholder="Filter by username or remark..." onChange={this.onFilterChange} />
					</div>
				</div>
			</div>
		);
	}
}