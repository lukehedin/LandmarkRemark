class RemarkMap extends React.Component {
	constructor(props) {
		super(props);

		this.submitRemark = this.submitRemark.bind(this);
		this.filterRemarks = this.filterRemarks.bind(this);
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
			let remarks = this.props.remarks = data[0];
			let pos = data[1];

			//Pretty map styles
			let mapTheme = [
				{ "featureType": "administrative", "elementType": "all", "stylers": [{ "saturation": "-100" }] },
				{ "featureType": "administrative.province", "elementType": "all", "stylers": [{ "visibility": "off" }] },
				{ "featureType": "landscape", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 65 }, { "visibility": "on" }] },
				{ "featureType": "poi", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": "50" }, { "visibility": "simplified" }] },
				{ "featureType": "road", "elementType": "all", "stylers": [{ "saturation": "-100" }] },
				{ "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] },
				{ "featureType": "road.arterial", "elementType": "all", "stylers": [{ "lightness": "30" }] },
				{ "featureType": "road.local", "elementType": "all", "stylers": [{ "lightness": "40" }] },
				{ "featureType": "transit", "elementType": "all", "stylers": [{ "saturation": -100 }, { "visibility": "simplified" }] },
				{ "featureType": "water", "elementType": "geometry", "stylers": [{ "hue": "#ffff00" }, { "lightness": -25 }, { "saturation": -97 }] },
				{ "featureType": "water", "elementType": "labels", "stylers": [{ "lightness": -25 }, { "saturation": -100 }] }];
			//Hide POI styles
			let hidePoi = [{ featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }];
			//Combined
			let mapStyles = [...mapTheme, ...hidePoi];

			remarkMap.props.map = new google.maps.Map(document.getElementById("map-container"), {
				center: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude), //TODO make ltlng
				zoom: 14,
				disableDefaultUI: true,
				styles: mapStyles,
				optimized: false
			});
			
			remarkMap.setUserPosition(pos.coords.latitude, pos.coords.longitude);

			//Draw all remarks on the map
			for (i = 0; i < remarks.length; i++) {
				let remark = remarks[i];
				this.drawRemark(remark);
			}
			
			['mousedown', 'touchstart'].map(function (event) {
				//LH: For development purposes, holding a click anywhere on the map for 2 seconds will change the user's location to that area
				google.maps.event.addListener(remarkMap.props.map, event, function (e) {
					remarkMap.props.mouseHoldTimeout = setTimeout(function () {
						remarkMap.setUserPosition(e.latLng.lat(), e.latLng.lng());
					}, 2000);
				});
			});

			['mouseup', 'touchend'].map(function (event) {
				google.maps.event.addListener(remarkMap.props.map, event, function (e) {
					clearTimeout(remarkMap.props.mouseHoldTimeout);
				});
			});
		});
		
	}
	setUserPosition(lat, lng, onClick) {
		let remarkMap = this;

		//Remove existing marker if there is one
		$('.user-location-marker').remove();

		//LH update the property stored for user location
		remarkMap.props.userLatLng = {
			lat: lat,
			lng: lng
		};

		//LH: To style the markers nicely, we use overlayview instead
		let overlay = new google.maps.OverlayView();
		overlay.setMap(remarkMap.props.map);
		overlay.draw = () => {
			remarkMap.drawMarker(overlay, lat, lng, 'user-location-marker', '/Images/marker.svg', function (e) {
				alert('This is you! You can simulate changing your location by clicking and holding for 2 seconds anywhere on the map.');
			});
		}
	}
	drawRemark(remark) {
		let remarkMap = this;

		let overlay = new google.maps.OverlayView();
		overlay.setMap(remarkMap.props.map);
		overlay.draw = () => {
			remarkMap.drawMarker(overlay, remark.latitude, remark.longitude, 'remark-marker', '/Images/point.svg', function (e) {
				//LH: Remove any existing tips
				$('.map-marker-tip').remove();

				//Show the new marker
				let remarkDiv = document.createElement('div');
				remarkDiv.className = 'map-marker-tip';
				remarkDiv.innerHTML = `Remark by <span class="tip-username">` + remark.username + `</span> on ` + remark.createdTimestamp +
					`<div class="tip-remark">` +
						remark.remarkText +
					`</div>`;

				overlay.div.appendChild(remarkDiv);

				//Pan to the marker
				remarkMap.props.map.panTo({ lat: remark.latitude, lng: remark.longitude });
			}, 'data-remark-id', remark.remarkId);
		}
	}
	drawMarker(overlay, lat, lng, cls, img, onClick, idAttrName, idAttrVal) {
		var div = overlay.div;
		const markerHeight = 32;
		const markerWidth = 24;

		if (!div) {
			div = overlay.div = document.createElement('div');
			div.className = (cls || '') + ' map-marker';

			//TODO ?
			div.style.width = markerWidth + 'px';
			div.style.height = markerHeight + 'px';

			div.style.backgroundImage = 'url(' + img + ')';
			div.style.backgroundSize = markerWidth + 'px ' + markerHeight + 'px';

			//Set the data attribute for an id (only for remarks currently)
			div.setAttribute(idAttrName, idAttrVal);

			['mousedown', 'touchend'].map(function (event) {
				div.addEventListener(event, function (e) {
					if (onClick) onClick(e);
				});
			});

			var panes = overlay.getPanes();
			panes.overlayImage.appendChild(div);
		}

		var latLng = new google.maps.LatLng(lat, lng);
		var point = overlay.getProjection().fromLatLngToDivPixel(latLng);

		if (point) {
			div.style.left = (point.x - (markerWidth / 2)) + 'px';
			div.style.top = (point.y - markerHeight) + 'px';
		}
	}
	submitRemark(remark) {
		var remarkMap = this;

		Util.post('CreateRemark', {
			remark: remark,
			lat: remarkMap.props.userLatLng.lat,
			lng: remarkMap.props.userLatLng.lng
		}, {
			success: data => {
				this.props.remarks.push(data);
				remarkMap.drawRemark(data);
			}
		});
	}
	filterRemarks(filterVal) {
		this.props.remarks.forEach(function (remark) {
			if (remark.username.indexOf(filterVal) !== -1 || remark.remarkText.indexOf(filterVal) !== -1) {
				$('[data-remark-id=' + remark.remarkId + ']').show();
			} else {
				$('[data-remark-id=' + remark.remarkId + ']').hide();
			}
		});
	}
	render() {
		return (
			<div className="remark-map">
				<RemarkFilter filterRemarks={this.filterRemarks} />
				<div id="map-container" className="map-container">
				</div>
				<RemarkAddForm submitRemark={this.submitRemark} />
			</div>
		);
	}
}
