import React from 'react';
import PropTypes from 'prop-types';
import './ImageRow.css';

const ImageRow = ({ imagePair, onPhotoClick }) => (
    <div
        className={`img_pair_cont mb-1 d-flex 
                    ${imagePair.length === 2 ? 'justify-content-between' : 'justify-content-center'}`}>
        <img
            onDoubleClick={() => onPhotoClick(imagePair[0])}
            src={imagePair[0]}
            className='img-thumbnail'
            alt="Not Found"/>
        {
            imagePair[1] &&
            <img
                onDoubleClick={() => onPhotoClick(imagePair[1])}
                src={imagePair[1]}
                className='img-thumbnail'
                alt="Not Found"/>
        }
    </div>
);

ImageRow.propTypes = {
    imagePair: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    onPhotoClick: PropTypes.func.isRequired
}

export default ImageRow;