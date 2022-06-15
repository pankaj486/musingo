import React from 'react'
import CardBox from 'src/components/cardBox'
import ChatLayout from 'src/components/chat/ChatLayout/ChatLayout'
import AvatarImage from 'src/assets/images/instructor.png';

import './style.scss'

const ExperienceChatBox2 = ({
    chatHistory,
    onClickZumChatButton,
    chatBoxInput,
    onChangeChatBoxInput,
    onSubmitChatInput,
    btn
}) => {
    return (
        <CardBox
            height='70vh'
            title={'Chat'}
            padd={10}
            classes={{
                header: 'chatBoxCardHeader1',
                actionContent: 'chatBoxCardActionContent1'
            }}
        >
            <div className="expChatBox1">
                <div className="expChatBoxHistory1">
                    {
                        chatHistory?.length > 0 && chatHistory.map((item, index) => (
                            <>
                                <div
                                    className={`expChatBoxHistoryItem1 ${item?.isSender ? ' expChatBoxHistoryItemReverse12' : ' expChatBoxHistoryItemReverse1' || ''}`}
                                    key={index}
                                >
                                    <img
                                        src={item?.avatar}
                                        alt={item?.name}
                                        className="expChatBoxHistoryItemAvatar1"
                                    />
                                    <button className='f-btn'>
                                        Follow
                                    </button>

                                </div>
                                <div className={`expChatBoxHistoryMsg1`}>
                                    {item.message}
                                </div>
                            </>
                        ))
                    }
                </div>

            </div>
            <div className='chatB'>
                <div className="expChatBoxInput1">
                    <form onSubmit={onSubmitChatInput}>
                        <input
                            type="text"
                            className="form-control expChatBoxInputField1"
                            placeholder=""
                            value={chatBoxInput}
                            onChange={onChangeChatBoxInput}
                        />
                    </form>
                </div>
                {btn &&
                    <button className='btn-send1'>
                        send
                    </button>}
            </div>
        </CardBox>

    )
}

export default ExperienceChatBox2