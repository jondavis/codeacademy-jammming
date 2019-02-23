import React from 'react';
import './Track.css';


class Track extends React.Component {
	constructor(props) {
		super(props);
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
		this.handleAddClick = this.handleAddClick.bind(this);
		this.handleRemoveClick = this.handleRemoveClick.bind(this);
		this.state = {
			//isHidden: false
		}
	}
	
	handleAddClick(){
		this.addTrack();
		this.setState({
			isHidden: !this.state.isHidden
		});
		console.log('handleAddClick this:');
		console.log(this);
	}

	handleRemoveClick(){
		this.removeTrack();
		console.log('handleRemoveClick this:');
		console.log(this);
	}

	renderAction(isRemoval){
		if (isRemoval === true) {
			return <a className="Track-action" onClick={this.handleRemoveClick}>-</a>
		} else  {
			return <a className="Track-action" onClick={this.handleAddClick}>+</a>
		}
	}

	renderHidden(isHidden) {
		if (isHidden === true) {
			return 'hide'
		} else {
			return ''
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
		//const {isHidden} = this.state;
		return (
			<div className={`Track ${this.renderHidden(this.state.isHidden)} `}>
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
