import React from 'react';
import PropTypes from 'prop-types';

import SearchedImage from '../SearchedImage/SearchedImage';

import './ImagesList.css';

const Column = ({ data}) => {

    return (
        <div className='image-list-column'>
            {data && data.map((photo, i) => <SearchedImage key={i} photo={photo}/>)}
        </div>
    );
};

Column.propTypes = {
    data: PropTypes.array
};

export default Column