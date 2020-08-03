import React from 'react';
import PropTypes from 'prop-types';
import {Col, Container, Row} from 'react-bootstrap';

import {connect} from 'react-redux';

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
        <Container className='image-frame'>
            <Row>
                {activeSubTool && (activeSubTool === 'smile' || activeSubTool === 'butterfly') &&
                <>
                    <Col md="auto">
                        <button className='apply-button' onClick={onApply}>Apply</button>
                    </Col>
                    {
                        activeSubTool === 'smile' &&
                        smileSticker.map((frame, index) => (
                            <Col onClick={handleSelectSticker(index)} key={'sticker' + index}>
                                <img src={frame} alt='Not found' className='frame-img'/>
                            </Col>
                        ))
                    }
                    {
                        activeSubTool === 'butterfly' &&
                        butterflySticker.map((frame, index) => (
                            <Col onClick={handleSelectSticker(index)} key={'sticker' + index}>
                                <img src={frame} alt='Not found' className='frame-img'/>
                            </Col>
                        ))
                    }
                </>
                }
            </Row>
        </Container>
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