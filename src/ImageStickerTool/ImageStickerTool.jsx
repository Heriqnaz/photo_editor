import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import Button from "../components/Button/Button";

const stickerBaseUrl = `${window.location.origin}/stickers`;
const smileStickerUrl = `${stickerBaseUrl}/Smile`;
const butterfly = `${stickerBaseUrl}/butterfly`;

const ImageStickerTool = ({
                              activeSubTool,
                              handleSelectedSticker,
                              handleApplySticker,
                          }) => {
    const smileSticker = [
        `${smileStickerUrl}/Smile_1.png`,
        `${smileStickerUrl}/Smile_2.png`,
        `${smileStickerUrl}/Smile_3.png`,
    ];

    const butterflySticker = [
        `${butterfly}/Butterfly_1.png`,
        `${butterfly}/Butterfly_2.png`,
    ];

    const handleSelectSticker = (index) => {
        return (
            () => {
                switch (activeSubTool) {
                    case 'smile':
                        handleSelectedSticker(smileSticker[index]);
                        break;
                    case 'butterfly':
                        handleSelectedSticker(butterflySticker[index]);
                        break;
                    default:
                }
            }
        )
    };
    const onApply = () => {
        handleApplySticker();
    };

    return (
        <div className='image-frame'>
            {activeSubTool && (activeSubTool === 'smile' || activeSubTool === 'butterfly') &&
            <>
                <div md="auto">
                    <Button className='apply-button' color='#2980b9n' onClick={onApply}>Apply</Button>
                </div>
                {
                    activeSubTool === 'smile' &&
                    smileSticker.map((frame, index) => (
                        <div onClick={handleSelectSticker(index)} key={'sticker' + index}>
                            <img src={frame} alt='Not found' className='frame-img'/>
                        </div>
                    ))
                }
                {
                    activeSubTool === 'butterfly' &&
                    butterflySticker.map((frame, index) => (
                        <div onClick={handleSelectSticker(index)} key={'sticker' + index}>
                            <img src={frame} alt='Not found' className='frame-img'/>
                        </div>
                    ))
                }
            </>
            }
        </div>
    )
};

ImageStickerTool.propTypes = {
    handleSelectedSticker: PropTypes.func,
    handleApplySticker: PropTypes.func,
    activeSubTool: PropTypes.string,
};

const mapStateToProps = (state) => ({
    activeSubTool: state.tool.activeSubTool
});

export default connect(mapStateToProps)(ImageStickerTool)