import React from 'react';
import './TrackList.css';
import Track from '../Track/Track'

class TrackList extends React.Component {
	render() {
		 //console.log('Tracklist this.props: ', this.props);
		return (
			<div className="TrackList">
				{
					this.props.tracks.map(track => {
						return <Track track={track} key={track.id} ref={track.id} onRemove={this.props.onRemove} onAdd={this.props.onAdd} onUnhide={this.props.onUnhide}  isRemoval={this.props.isRemoval} />;
					})
				}
			</div>
		)
	}
	
};

export default TrackList;
