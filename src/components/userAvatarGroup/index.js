import React from 'react'
import './style.scss'

const UserAvatarGroup = ({ 
    members, 
    imageWidth, 
    imageHeight, 
    imageSpacing, 
    imageBorderColor,
    imageBorderWidth,
    imageBorderStyle,
    imageBgColor,
    max,
    counterTextColor,
    counterFontSize,
    onClickAvatar,
    onClickMore,
    className,
}) => {
    const singleMemberStyles = {
        width: `${imageWidth}px`,
        height: `${imageHeight}px`,
        marginRight: `${imageSpacing}px`,
        borderColor: imageBorderColor,
        borderWidth: `${imageBorderWidth}px`,
        borderStyle: imageBorderStyle,
        backgroundColor: imageBgColor,
    }

    return (
        <div className={`d-flex flex-row userAvatarGroup ${className && className || ''}`}>
            {
                members?.length > 0 && members.map((member, index) => {
                    if((index+1) <= max ) {
                        return (
                            <img 
                                key={index} 
                                src={member.image}
                                alt={member.name}
                                style={{
                                    ...{ zIndex: members?.length - index },
                                    ...singleMemberStyles
                                }}
                                className="userAvatarGroupItem"
                                onClick={onClickAvatar}
                            />
                        )
                    }
                })
            }
            {
                members?.length > max && 
                <div 
                    className="userAvatarGroupItem userAvatarGroupItemCounter" 
                    style={singleMemberStyles}
                    onClick={onClickMore}
                >
                    <span 
                        className="userAvatarGroupItemCounterText"
                        style={{
                            zIndex: max + 1,
                            color: counterTextColor,
                            fontSize: counterFontSize,
                        }}
                    >
                        {`+${ members?.length - max}`}
                    </span>
                </div>
            }
        </div>
    )
}

UserAvatarGroup.defaultProps = {
    imageWidth: 60,
    imageHeight: 60,
    imageSpacing: -15,
    imageBorderColor: '#FFFFFF',
    imageBorderWidth: 4,
    imageBorderStyle: 'solid',
    imageBgColor: '#D8D8D8',
    counterTextColor: '#484848',
    counterFontSize: 16,
    max: 4,
}

export default UserAvatarGroup