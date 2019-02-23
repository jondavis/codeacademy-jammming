import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList'

class SearchResults extends React.Component {
	render() {
		// console.log('SearchResults this.props.searchResults: ', this.props.searchResults);
		// console.log('SearchResults: ',this.props);
		return (
			<div className="SearchResults">
				<h2>Results</h2>
				<TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false} isHidden={this.props.isHidden} />
			</div>
		)
	}
};

export default SearchResults;
