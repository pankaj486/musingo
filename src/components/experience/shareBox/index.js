import React from 'react'
import CardBox from 'src/components/cardBox'
import CameraIcon from 'src/assets/images/new/icon-camera.png'
import PhotoIcon from 'src/assets/images/new/icon-photo.png'
import VideoIcon from 'src/assets/images/new/icon-video.png'
import './style.scss'
import ShareBoxItem from './item'

const ShareBox = ({
    shareItems,
    onClickCameraBtn,
    onClickVideoBtn,
    onClickPhotoBtn,
}) => {
    return (
        <CardBox title={'Share'} bodyMaxHeight={1050}>
            <div className="shareBox">
                <div className="shareBoxButtons">
                    <button 
                        className="btn btn-outline-primary shareBoxButtonsSingle"
                        onClick={onClickCameraBtn}
                    >
                        <img src={CameraIcon} className="shareBoxButtonsSingleImg" />
                    </button>
                    <button 
                        className="btn btn-outline-primary shareBoxButtonsSingle"
                        onClick={onClickVideoBtn}
                    >
                        <img src={VideoIcon} className="shareBoxButtonsSingleImg" />
                    </button>
                    <button 
                        className="btn btn-outline-primary shareBoxButtonsSingle"
                        onClick={onClickPhotoBtn}
                    >
                        <img src={PhotoIcon} className="shareBoxButtonsSingleImg" />
                    </button>
                </div>
                {
                    shareItems?.length > 0 &&
                    <div className="shareBoxItems">
                        {
                            shareItems.map((item, index) => (
                                <ShareBoxItem 
                                    key={index}
                                    avatar={item?.avatar}
                                    name={item?.name}
                                    mainImage={item?.mainImage}
                                    miniCard={item?.miniCard}
                                    reactions={item?.reactions}
                                    onClickShareMiniCard={() => console.log('On Clicked ShareMiniCard')}
                                    onClickFollowButton={() => console.log('Clicked follow button.')}
                                    onClickReactionHeart={() => console.log('Clicked Reaction Heart.')}
                                    onClickReactionFollower={() => console.log('Clicked Reaction Follower.')}
                                    onClickReactionShare={() => console.log('Clicked Reaction Share.')}
                                    onClickReactionComment={() => console.log('Clicked Reaction Comment.')}
                                />
                            ))
                        }
                    </div>
                }
            </div>
        </CardBox>
    )
}

export default ShareBox