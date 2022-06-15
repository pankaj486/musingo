import React from 'react'
import CardBox from 'src/components/cardBox'
import UserAvatarGroup from 'src/components/userAvatarGroup'
import longArrow from 'src/assets/images/new/long-arrow.png'
import './style.scss'

const ControlPanelBox = ({
    title,
    leftBoxMembers,
    leftBoxMemberMaxCount,
    leftBoxDescription,
    rightBoxMembers,
    rightBoxMemberMaxCount,
    rightBoxDescription,
    hideMiddleArrow,
    hidefooterBtn,
    isBorderedBtn,
    footerBtnText,
    footerBtnColor,
    footerBtnTextColor,
    onClickfooterBtn,
    hideLeftBoxMembers,
    hideRightBoxMembers
}) => {
    return (
        <CardBox
            title={title}
        >
            <div className="controlPanelBox">
                <div className="controlPanelBoxBody">
                    <div className="row">
                        {
                            ! hideLeftBoxMembers &&
                            <div className={`col-12 ${hideRightBoxMembers ? '' : 'col-md-5'}`}>
                                <div className="controlPanelBoxLeft">
                                    {
                                        leftBoxMembers?.length > 0 && 
                                        <UserAvatarGroup
                                            members={leftBoxMembers}
                                            max={leftBoxMemberMaxCount}
                                            imageBorderWidth={3}
                                            imageWidth={50}
                                            imageHeight={50}
                                        />
                                    }
                                    {
                                        leftBoxDescription &&                            
                                        <h6 className="controlPanelBoxDesc mt-2">
                                            {leftBoxDescription}
                                        </h6>
                                    }
                                </div>
                            </div>
                        }
                        {
                            ! hideMiddleArrow &&
                            <div className="col-12 col-md-2">
                                <div className="controlPanelBoxArrow text-center">
                                    <img src={longArrow} className="controlPanelBoxArrowImg" />
                                </div>
                            </div>
                        }
                        {
                            ! hideRightBoxMembers &&
                            <div className={`col-12 ${hideLeftBoxMembers ? '' : 'col-md-5'}`}>
                                <div className="controlPanelBoxRight">
                                    {
                                        rightBoxMembers?.length > 0 && 
                                        <UserAvatarGroup
                                            members={rightBoxMembers}
                                            max={rightBoxMemberMaxCount}
                                            imageBorderWidth={3}
                                            imageWidth={50}
                                            imageHeight={50}
                                        />
                                    }
                                    {
                                        rightBoxDescription &&                            
                                        <h6 className="controlPanelBoxDesc mt-2">
                                            {rightBoxDescription}
                                        </h6>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                    
                </div>
                {
                    ! hidefooterBtn &&
                    <div className="controlPanelBoxFooter">
                        <button 
                            className={`btn ${isBorderedBtn ? `btn-outline-${footerBtnColor} controlPanelBoxFooterBtnBordered` : `btn-${footerBtnColor}`} controlPanelBoxFooterBtn`} 
                            onClick={onClickfooterBtn}
                            style={
                                {
                                    color: footerBtnTextColor
                                }
                            }
                        >
                            {footerBtnText}
                        </button>
                    </div>
                }
            </div>
        </CardBox>
    )
}

ControlPanelBox.defaultProps = {
    hideMiddleArrow: false,
    hidefooterBtn: false,
    isBorderedBtn: false,
    footerBtnColor: 'primary',
    footerBtnTextColor: '#ffffff',
    footerBtnStyle: {}
}
export default ControlPanelBox
