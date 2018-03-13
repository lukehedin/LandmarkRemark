class RemarkMap extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		//First load, fetch the remarks
		debugger;

		Util.post('GetRemarks', {}, {
			success: function (data) {
				debugger;

				let markers = data;

				this.props.map = new google.maps.Map(document.getElementById("dvMap"), {
					center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
					zoom: 8,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				});

				for (i = 0; i < markers.length; i++) {
					this.drawRemark(markers[i]);
				}
			}
		});
	}
	drawRemark(data) {
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(data.lat, data.lng),
			map: this.props.map,
			title: data.title
		});

		google.maps.event.addListener(marker, "click", function (e) {
			debugger;
		});
	}
	render() {
		return (
			<div class="remark-map">
			</div>
		);
	}
}
