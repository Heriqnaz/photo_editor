import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchPhotos } from '../../redux/actions';

const SearchPanel = ({ onSearch }) => {
    let input;
    const handleSubmit = (e) => {
        e.preventDefault();
        const searchText = input.value;
        if (searchText) onSearch(searchText);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="has-search search-panel">
                <div className='mini-search-icon'/>
                <input
                    type="text"
                    className="form-control"
                    aria-label='Search...'
                    placeholder="Search..."
                    ref={node => (input = node)}
                />
                <input type="submit" style={{ display: 'none' }}/>
            </div>
        </form>
    )
};

SearchPanel.propTypes = {
    onSearch: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
    onSearch: (searchString) => {
        dispatch(fetchPhotos(searchString));
    }
});

export default connect(null, mapDispatchToProps)(SearchPanel);