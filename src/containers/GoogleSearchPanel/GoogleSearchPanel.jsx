import React from 'react';
import SearchPanel from '../../components/SearchPanel/SearchPanel';
import ImagesList from '../../components/ImagesList/ImagesList';
import './GoogleSearchPanel.css';

const GoogleSearchPanel = () => (
    <div className='d-flex'>
        <div className='search_panel_container pt-3'>
            <SearchPanel/>
            <ImagesList
                newPhotosLoadCount={19}
                firstLoadCount={25}
            />
        </div>
    </div>
)


export default GoogleSearchPanel;