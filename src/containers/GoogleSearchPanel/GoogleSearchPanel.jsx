import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchPanel from '../../components/SearchPanel/SearchPanel';
import ImagesList from '../../components/ImagesList/ImagesList';
import { closeSideBar, fetchPhotos, selectPhoto } from '../../redux/actions';
import './GoogleSearchPanel.css';

const GoogleSearchPanel = () => (
    <div className='d-flex'>
        <div className='search_panel_container pt-3'>
            <SearchPanel/>
            <ImagesList
                newPhotosLoadCount={19}
                firstLoadCount={20}
            />
        </div>
    </div>
)


export default GoogleSearchPanel;