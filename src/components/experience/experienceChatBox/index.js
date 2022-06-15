import React from 'react'
import CardBox from 'src/components/cardBox'
import ChatLayout from 'src/components/chat/ChatLayout/ChatLayout'
import AvatarImage from 'src/assets/images/instructor.png';

import './style.scss'

const ExperienceChatBox = ({
    chatHistory,
    onClickZumChatButton,
    chatBoxInput,
    onChangeChatBoxInput,
    onSubmitChatInput,
    btn
}) => {
    return (
        <CardBox
            title={'Chat'}
            headerActionContent={
                btn ? null : <div
                    className="chatBoxCardHeaderBtn"
                    onClick={onClickZumChatButton}
                >
                    {'Zum Chat'}
                </div>
            }
            classes={{
                header: 'chatBoxCardHeader',
                actionContent: 'chatBoxCardActionContent'
            }}
        >
            <div className="expChatBox">
                <div className="expChatBoxHistory">
                    {
                        chatHistory?.length > 0 && chatHistory.map((item, index) => (
                            <div
                                className={`expChatBoxHistoryItem ${item?.isSender && btn ? ' expChatBoxHistoryItemReverse2' : ' expChatBoxHistoryItemReverse' || ''}`}
                                key={index}
                            >
                                {btn ?
                                    <div>
                                        <img
                                            src={item?.avatar}
                                            alt={item?.name}
                                            className="expChatBoxHistoryItemAvatar"
                                        />
                                        <button>
                                            Follow
                                        </button>
                                    </div> :
                                    <img
                                        src={item?.avatar}
                                        alt={item?.name}
                                        className="expChatBoxHistoryItemAvatar"
                                    />
                                }
                                <div className={`expChatBoxHistoryMsg ${item?.isSender && btn ? ' expChatBoxHistoryItemReverse2' : ' expChatBoxHistoryItemReverse' || ''}`}>
                                    {item.message}
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="expChatBoxInput">
                    <form onSubmit={onSubmitChatInput}>
                        <input
                            type="text"
                            className="form-control expChatBoxInputField"
                            placeholder=""
                            value={chatBoxInput}
                            onChange={onChangeChatBoxInput}
                        />
                    </form>
                </div>
                {btn &&
                    <button className='btn-send'>
                        send
                    </button>}
            </div>

        </CardBox>
    )
}

export default ExperienceChatBox