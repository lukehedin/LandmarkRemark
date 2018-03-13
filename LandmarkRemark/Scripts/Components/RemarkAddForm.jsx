class RemarkAddForm extends React.Component {
	constructor(props) {
		super(props);

		this.onAddRemarkClick = this.onAddRemarkClick.bind(this);
		this.cancelAddRemark = this.cancelAddRemark.bind(this);
		this.submitRemark = this.submitRemark.bind(this);

		this.state = {
			addingRemark: false
		};
	}
	onAddRemarkClick() {
		this.setState({
			addingRemark: true
		});

		//LH: This could be done better. remarkTextArea doesnt exist in refs until created, but could be simply hidden with css
		setTimeout(() => {
			this.refs.remarkTextArea.focus();
		}, 100)
	}
	submitRemark() {
		let remarkMap = this;

		if (!remarkMap.refs.remarkTextArea.value) {
			alert('You must enter a remark!');
			return;
		}

		this.props.submitRemark(remarkMap.refs.remarkTextArea.value);

		this.setState({
			addingRemark: false
		});
	}
	cancelAddRemark() {
		this.setState({
			addingRemark: false
		});
	}
	render() {
		return (
			<div className="add-remark-container">
				<div className="add-remark-container-inner">
					{this.state.addingRemark
						? <div className="add-remark-panel">
							<textarea className="remark-text-area" ref="remarkTextArea" />
							<div className="remark-buttons">
								<Button className="remark-button" text="Cancel" onClick={this.cancelAddRemark}></Button>
								<Button className="remark-button" text="Save" onClick={this.submitRemark}></Button>
							</div>
						</div>
						: <Button className="add-remark-button" onClick={this.onAddRemarkClick} text="Add Remark"></Button>}
				</div>
			</div>
		);
	}
}