import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import Instructor from '../../../assets/images/instructor.png'
import Badge from '../../../assets/images/badge.png'
import ChatIcon from '../../../assets/images/chat-icon.png'
import UserAvatarGroup from 'src/components/userAvatarGroup'

const ExprienceHeaderBox = ({
    title,
    subtitle,
    members,
    video,
    lesson,
    showManageBtn,
    onClickManageBtn,
    startLesson,
    color,
    onClickStartVideo
}) => {
    return (
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start">
            <div style={{ textAlign: 'left' }}>
                {
                    title &&
                    <h2 className="text-center text-white mb-4" style={{ fontWeight: 'bold' }}>
                        {title}
                    </h2>
                }

                {
                    (subtitle || members?.length > 0) &&
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {
                            subtitle &&
                            <h2
                                className="text-center text-white"
                                style={{ fontWeight: 'normal', marginRight: '15px' }}>
                                {subtitle}
                            </h2>
                        }
                        {
                            members?.length > 0 &&
                            <UserAvatarGroup
                                members={members}
                                imageWidth={50}
                                imageHeight={50}
                                imageBorderWidth={3}
                                max={3}
                            />
                        }
                    </div>
                }
            </div>
            {
                showManageBtn &&
                <div className="d-flex flex-column flex-sm-row align-items-center" style={{ textAlign: 'right' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <button
                            className={'btn ml-4'}
                            style={{
                                marginRight: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#FFF',
                                width: '120px',
                                height: '46px',
                                padding: 0,
                            }}
                            onClick={onClickManageBtn}
                        >
                            {'Manage'}
                        </button>
                    </div>
                </div>
            }
            {video &&
                <div>
                    <h2 className="text-left text-white mb-1" style={{ fontWeight: 'bold' }}>
                        1d:20h:40m
                    </h2>
                    <h2 className="text-left text-white"
                        style={{ fontWeight: 'normal', fontSize: '20px', marginRight: '15px' }}>
                        until your next unit starts
                    </h2>
                </div>
            }
            {lesson &&
                <div>
                    <h2 className="text-left text-white mb-4" style={{ fontWeight: 'bold' }}>
                        Start lesson now!
                    </h2>
                </div>
            }
            {startLesson &&
                <div>
                    <div onClick={onClickStartVideo} className={color ? 'startLessonColor' : 'startLesson'}>
                        <h2>Start Video Lesson!</h2>
                    </div>
                    <div>
                        <h2 className="text-left text-white mb-1" style={{ fontWeight: 'bold' }}>
                            1d:20h:40m
                        </h2>
                        <h2 className="text-left text-white mb-0"
                            style={{ fontWeight: 'normal', fontSize: '16px', marginRight: '15px' }}>
                            until your next unit starts
                        </h2>
                    </div>
                </div>
            }
        </div>
    )
}

ExprienceHeaderBox.defaultProps = {
    showManageBtn: false
}

export default ExprienceHeaderBox