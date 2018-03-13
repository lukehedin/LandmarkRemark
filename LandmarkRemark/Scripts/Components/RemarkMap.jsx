class RemarkMap extends React.Component {
	constructor(props) {
		super(props);

		this.onAddRemarkClick = this.onAddRemarkClick.bind(this);
		this.cancelAddRemark = this.cancelAddRemark.bind(this);
		this.submitRemark = this.submitRemark.bind(this);

		this.state = {
			addingRemark: false
		};
	}
	componentDidMount() {
		let remarkMap = this;
		//First load, fetch the remarks

		let getRemarksPromise = new Promise((resolve, reject) => {
			Util.post('GetRemarks', {}, {
				success: function (data) {
					resolve(data);
				},
				failure: function () {
					reject();
				}
			});
		});

		//LH: The getCurrentPosition was not working without a timeout here. Would like to have figured out why!
		//LH: On certain devices the accuracy of this is questionable... Landmark Remark would have a lot of remarks at internet exchange points!
		let getLocationPromise = new Promise((resolve, reject) => {
			setTimeout(() => {
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(function (pos) {
						resolve(pos);
					}, function () {
						reject();
					});
				} else {
					reject();
				}
			}, 100);
		});

		Promise.all([getRemarksPromise, getLocationPromise]).then(data => {
			let markers = data[0];
			let pos = data[1];

			remarkMap.props.userLatLng = {
				lat: pos.coords.latitude,
				lng: pos.coords.longitude
			};

			let mapTheme = [{ "featureType": "administrative", "elementType": "all", "stylers": [{ "saturation": "-100" }] }, { "featureType": "administrative.province", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 65 }, { "visibility": "on" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": "50" }, { "visibility": "simplified" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": "-100" }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.arterial", "elementType": "all", "stylers": [{ "lightness": "30" }] }, { "featureType": "road.local", "elementType": "all", "stylers": [{ "lightness": "40" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "saturation": -100 }, { "visibility": "simplified" }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "hue": "#ffff00" }, { "lightness": -25 }, { "saturation": -97 }] }, { "featureType": "water", "elementType": "labels", "stylers": [{ "lightness": -25 }, { "saturation": -100 }] }];
			let hidePoi = [{ featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }];
			let mapStyles = [...mapTheme, ...hidePoi];

			remarkMap.props.map = new google.maps.Map(document.getElementById("map-container"), {
				center: new google.maps.LatLng(remarkMap.props.userLatLng.lat, remarkMap.props.userLatLng.lng), //TODO make ltlng
				zoom: 14,
				disableDefaultUI: true,
				styles: mapStyles
			});

			for (i = 0; i < markers.length; i++) {
				this.drawRemark(markers[i]);
			}

			//Draw the user's location on the map
			let marker = new google.maps.Marker({
				position: new google.maps.LatLng(remarkMap.props.userLatLng.lat, remarkMap.props.userLatLng.lng),
				map: this.props.map,
				title: 'You are here'
			});
		});
		
	}
	drawRemark(data) {
		let marker = new google.maps.Marker({
			position: new google.maps.LatLng(data.lat, data.lng),
			map: this.props.map,
			title: data.title
		});

		google.maps.event.addListener(marker, "click", function (e) {
			debugger;
		});
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

		Util.post('CreateRemark', {
			remark: remarkMap.refs.remarkTextArea.value,
			lat: remarkMap.props.userLatLng.lat,
			lng: remarkMap.props.userLatLng.lng
		}, {
			success: data => {
				remarkMap.drawRemark(data);
			},
			complete: data => {
				remarkMap.setState({
					addingRemark: false
				});
			}
		});
	}
	cancelAddRemark() {
		this.setState({
			addingRemark: false
		});
	}
	render() {
		return (
			<div className="remark-map">
				<div id="map-container" className="map-container">
				</div>
				<div className="remark-container">
					<div className="remark-container-inner">	
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
			</div>
		);
	}
}
