import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

import './ImageFrameTool.css';
import { connect } from 'react-redux';

const framesBaseUrl = `${window.location.origin}/frames/`;
const birthdayFramesUrl = `${framesBaseUrl}/Birthday`;
const loveFramesUrl = `${framesBaseUrl}/Love`;
const partyTimeFramesUrl = `${framesBaseUrl}/PartyTime`;

const ImageFrameTool = ({
                            activeSubTool,
                            handleSelectedFrame,
                            handleApplyFrame,
                            handleCancelApplyFrame
                        }) => {
    const [activeFrame, setActiveFrame] = useState('');

    const birthdayFrame = [
        `${birthdayFramesUrl}/Birthday_1.png`,
        `${birthdayFramesUrl}/Birthday_2.png`,
        `${birthdayFramesUrl}/Birthday_3.png`,
        `${birthdayFramesUrl}/Birthday_4.png`,
        `${birthdayFramesUrl}/Birthday_5.png`,
        `${birthdayFramesUrl}/Birthday_6.png`,
        `${birthdayFramesUrl}/Birthday_7.png`,
        `${birthdayFramesUrl}/Birthday_8.png`
    ];
    const loveFrame = [
        `${loveFramesUrl}/Love_1.png`,
        `${loveFramesUrl}/Love_2.png`,
        `${loveFramesUrl}/Love_3.png`,
        `${loveFramesUrl}/Love_4.png`,
        `${loveFramesUrl}/Love_5.png`,
        `${loveFramesUrl}/Love_6.png`,
        `${loveFramesUrl}/Love_7.png`,
        `${loveFramesUrl}/Love_8.png`
    ];
    const partyTimeFrame = [
        `${partyTimeFramesUrl}/PartyTime_1.png`,
        `${partyTimeFramesUrl}/PartyTime_2.png`,
        `${partyTimeFramesUrl}/PartyTime_3.png`,
        `${partyTimeFramesUrl}/PartyTime_4.png`,
    ];

    let isApply = false;

    useEffect(() => {
        return () => {
            if (!isApply) handleCancelApplyFrame()
        }
    },);

    const handleSelectFrame = (index) => {
        return (
            () => {
                isApply = false;
                switch (activeSubTool) {
                    case 'birthday':
                        setActiveFrame('birthday' + index);
                        handleSelectedFrame(birthdayFrame[index]);
                        break;
                    case 'love':
                        setActiveFrame('love' + index);
                        handleSelectedFrame(loveFrame[index]);
                        break;
                    case 'party-time':
                        setActiveFrame('partyTime' + index);
                        handleSelectedFrame(partyTimeFrame[index]);
                        break;
                    default:
                }
            }
        )
    };
    const onApply = () => {
        isApply = true;
        handleApplyFrame();
    };

    return (
        <div className='image-frame'>
            {activeSubTool && (activeSubTool === 'birthday' || activeSubTool === 'love' || activeSubTool === 'party-time') &&
            <>
                <div>
                    <Button className='apply-button' color='#2980b9' onClick={onApply}>Apply</Button>
                </div>
                {
                    activeSubTool === 'birthday' &&
                    birthdayFrame.map((frame, index) => (
                        <div onClick={handleSelectFrame(index)} key={'birthday' + index}>
                            <img src={frame} alt='Not found'
                                 className={`frame-img ${activeFrame === 'birthday' + index && 'active'}`}/>
                        </div>
                    ))
                }
                {
                    activeSubTool === 'love' &&
                    loveFrame.map((frame, index) => (
                        <div onClick={handleSelectFrame(index)} key={'love' + index}>
                            <img src={frame} alt='Not found'
                                 className={`frame-img ${activeFrame === 'love' + index && 'active'}`}/>
                        </div>
                    ))
                }
                {
                    activeSubTool === 'party-time' &&
                    partyTimeFrame.map((frame, index) => (
                        <div onClick={handleSelectFrame(index)} key={'partyTime' + index}>
                            <img src={frame} alt='Not found'
                                 className={`frame-img ${activeFrame === 'partyTime' + index && 'active'}`}/>
                        </div>
                    ))
                }

            </>
            }
        </div>
    )
}

ImageFrameTool.propTypes = {
    handleSelectedFrame: PropTypes.func,
    handleApplyFrame: PropTypes.func,
    handleCancelApplyFrame: PropTypes.func,
    activeSubTool: PropTypes.string,
};

const mapStateToProps = (state) => ({
    activeSubTool: state.tool.activeSubTool
});

export default connect(mapStateToProps)(ImageFrameTool)