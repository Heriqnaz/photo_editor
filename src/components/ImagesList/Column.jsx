import React from 'react';
import PropTypes from 'prop-types'

import './ImagesList.css';
import SearchedImage from "../SearchedImage/SearchedImage";

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