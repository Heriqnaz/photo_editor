import React from 'react';
import PropTypes from 'prop-types';
import {Search} from 'react-bootstrap-icons';

const SearchPanel = ({ onSearch }) => {
    let input;
    const handleSubmit = (e) => {
        e.preventDefault();
        const searchText = input.value.replace(/ +/g, '+');
        onSearch(searchText);
        input.value = '';
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group has-search">
                <div
                    className="input-group-append"
                >
                    <button
                        type='submit'
                        className='btn d-flex align-items-center fa fa-search form-control-feedback'
                    >
                        <Search color='#999' size={15}/>
                    </button>
                </div>
                <input
                    type="text"
                    className="form-control"
                    aria-label='Search...'
                    placeholder="Search..."
                    ref={node => (input = node)}
                />
                <input type="submit" style={{display: 'none'}}/>
            </div>
        </form>
    )
}

SearchPanel.propTypes = {
    onSearch: PropTypes.func.isRequired
}

export default SearchPanel;