import React from 'react';
import './Track.css';


class Track extends React.Component {
	constructor(props) {
		super(props);
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
	}
	
	renderAction(isRemoval){
		if (isRemoval === true) {
			return <a className="Track-action" onClick={this.removeTrack}>-</a>
		} else  {
			return <a className="Track-action" onClick={this.addTrack}>+</a>
		}
	}
	addTrack() {
		this.props.onAdd(this.props.track);
	}
	removeTrack(){
		this.props.onRemove(this.props.track);
	}
	render() {
		//console.log('Track this.props: ', this.props);
		return (
			<div className="Track">
				<div className="Track-information">
					<h3>
						{this.props.track.name}
					</h3>
					<p>
						{this.props.track.artist}
						&nbsp;|&nbsp; 
						{this.props.track.album}
					</p>
				</div>
				{this.renderAction(this.props.isRemoval)}
			</div>
		)
	}
};

export default Track;