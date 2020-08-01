import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import loader from '../../assets/svgs/tail-spin.svg'

import './SearchedImage.css';

const SearchedImage = ({ photo }) => {

    const [height, setHeight] = useState();
    const [src, setSrc] = useState('');
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setHeight(photo.height);
        const img = new Image();
        img.src = photo.src;
        img.onload = () => {
            setSrc(img.src);
            setLoading(false)
        }

    }, []);

    const Loader = () => {
        return (
            <img style={{width: '50px'}} src={loader} alt="loading"/>
        );
    };

    return (
        <div className='search-img-container' style={{ height }}>
            {isLoading ? <Loader/> : <img style={{width: '100%'}} src={src} alt=""/>}
        </div>
    )
};

SearchedImage.propTypes = {
    photo: PropTypes.object.isRequired
};

export default SearchedImage;