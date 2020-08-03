import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchPhotos } from '../../redux/actions';

const SearchPanel = ({ onSearch }) => {
    let input;
    const handleSubmit = (e) => {
        e.preventDefault();
        const searchText = input.value;
        onSearch(searchText);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group has-search search-panel">
                <div
                    className="input-group-append"
                >
                    <button
                        type='submit'
                        className='btn d-flex align-items-center fa fa-search form-control-feedback'
                    >
                        <div className='mini-search-icon'/>
                    </button>
                </div>
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