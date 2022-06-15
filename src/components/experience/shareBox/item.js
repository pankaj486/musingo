import React from 'react'
import EmojiHeart from 'src/assets/images/new/icon-heart.png'
import EmojiFollower from 'src/assets/images/new/icon-follower.png'
import EmojiShare from 'src/assets/images/new/icon-share.png'
import EmojiComment from 'src/assets/images/new/icon-comment.png'
import './style.scss'
import UserAvatarGroup from 'src/components/userAvatarGroup'
import AvatarImage from 'src/assets/images/instructor.png'

const ShareBoxItem = ({
    avatar,
    name,
    mainImage,
    miniCard,
    reactions,
    onClickShareMiniCard,
    onClickFollowButton,
    onClickReactionHeart,
    onClickReactionFollower,
    onClickReactionShare,
    onClickReactionComment,
}) => {
    
    const members = [
        {
            name: 'Tom Yun',
            image: AvatarImage,
        },
        {
            name: 'Bruce Lee',
            image: AvatarImage,
        },
        {
            name: 'Bruce Lee',
            image: AvatarImage,
        },
        {
            name: 'Maria Sarah',
            image: AvatarImage,
        },
        {
            name: 'Maria Sarah',
            image: AvatarImage,
        },
    ]
    return (
        <div className="shareItemBox">
            <div className="shareItemBoxHeader">
                <div className="shareItemBoxHeaderLeft">
                    <img src={avatar} className="shareItemBoxHeaderImg" />
                    <p className="shareItemBoxName">
                        {name}
                    </p>
                </div>
                <button 
                    className="btn btn-outline-primary shareItemBoxHeaderBtn"
                    onClick={onClickFollowButton}
                >
                    {'Folgen'}
                </button>
            </div>
            <div className="shareItemBoxBody">
                <div 
                    className="shareItemBoxBodyImg"
                    style={{
                        backgroundImage: `url(${mainImage})`
                    }}
                >
                    <UserAvatarGroup 
                        members={members}
                        imageWidth={40} 
                        imageHeight={40}
                        max={3}
                        imageBorderWidth={2}
                        className="shareItemBoxBodyMembers"
                    />
                    <div 
                        className="shareItemMiniCard" 
                        onClick={onClickShareMiniCard}
                    >
                        <img 
                            src={miniCard?.image} 
                            className="shareItemMiniCardImg" 
                        />
                        <p className="shareItemMiniCardDesc">
                            {miniCard?.description}
                        </p>
                    </div>
                </div>
            </div>
            <div className="shareItemBoxFooter">
                <div className="shareItemBoxEmojiItem" onClick={onClickReactionHeart}>
                    <img src={EmojiHeart} className="shareItemBoxEmojiItemImg" />
                    {
                        (reactions?.heart && reactions?.heart != 0) &&
                        <span className="shareItemBoxEmojiItemCount">
                            {reactions?.heart}
                        </span> || <></>
                    }
                </div>
                <div className="shareItemBoxEmojiItem" onClick={onClickReactionFollower}>
                    <img src={EmojiFollower} className="shareItemBoxEmojiItemImg" />
                    {
                        (reactions?.follower && reactions?.follower != 0) &&
                        <span className="shareItemBoxEmojiItemCount">
                            {reactions?.follower}
                        </span> || <></>
                    }
                </div>
                <div className="shareItemBoxEmojiItem" onClick={onClickReactionShare}>
                    <img src={EmojiShare} className="shareItemBoxEmojiItemImg" />
                    {
                        (reactions?.share && reactions?.share != 0) &&
                        <span className="shareItemBoxEmojiItemCount">
                            {reactions?.share}
                        </span> || <></>
                    }
                </div>
                <div className="shareItemBoxEmojiItem" onClick={onClickReactionComment}>
                    <img src={EmojiComment} className="shareItemBoxEmojiItemImg" />
                    {
                        (reactions?.comment && reactions?.comment != 0) &&
                        <span className="shareItemBoxEmojiItemCount">
                            {reactions?.comment}
                        </span> || <></>
                    }
                </div>
            </div>

        </div>
    )
}

export default ShareBoxItem