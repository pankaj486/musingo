import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';

import AvatarImage from 'src/assets/images/instructor.png';
import Badge from '../../../assets/images/badge.png';
import ChatIcon from '../../../assets/images/chat-icon.png';
import DotsVertical from '../../../assets/images/dots-vertical.png';
import './style.scss';
import Trainer from '../../group/trainer/Trainer';
import ExperienceBg from 'src/assets/images/experience-bg.png';
import BannerBg from 'src/assets/images/image1.jpeg';
import GoogleMapReact from 'google-map-react';
import ListingMapMarkerComponent from '../Listing/mapMarker/ListingMapMarker';
import useWindowResize from '../../../custom-hooks/useWindowResize';
import { BsThreeDotsVertical } from "react-icons/bs";
import ExperienceHeaderBox from '../../experience/experienceHeaderBox'
import ExperienceBox from '../../experience/experienceBox'
import ExperienceLayout from 'src/components/experience/experienceLayout';
import ActivityBox from 'src/components/experience/activityBox';
import ControlPanelBox from 'src/components/experience/controlPanelBox';
import ShareBox from 'src/components/experience/shareBox';
import ExperienceChatBox from 'src/components/experience/experienceChatBox';
import ExperienceModalSlot from 'src/components/experience/experienceModalSlot';
import ExperienceModalChecklist from 'src/components/experience/experienceModalChecklist';
import ExperienceModalWeiter from 'src/components/experience/experienceModalWeiter';

const StartExperienceGroup = () => {
    const { dimensions } = useWindowResize()
    const screenWidth = dimensions.width

    const initGroupMembers = [
        {
            name: 'John Doe',
            image: AvatarImage,
        },
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

    const initLeftBoxMembers = [
        {
            name: 'John Doe',
            image: AvatarImage,
        },
        {
            name: 'Tom Yun',
            image: AvatarImage,
        },
    ]

    const initRightBoxMembers = [
        {
            name: 'John Doe',
            image: AvatarImage,
        },
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
        {
            name: 'Maria Sarah',
            image: AvatarImage,
        },
    ]

    const initActivities = [
        {
            title: 'Requested booking change',
            avatar: AvatarImage,
        },
        {
            title: 'Requested booking change',
            avatar: AvatarImage,
        },
        {
            title: 'Requested booking change',
            avatar: AvatarImage,
        },
    ]

    const initShareItems = [
        {
            avatar: AvatarImage,
            name: 'John Doe',
            mainImage: ExperienceBg,
            reactions: {
                heart: 9,
                follower: 5,
                share: 0,
                comment: 0
            },
            miniCard: {
                image: BannerBg,
                description: 'Learn Flamenco like a pro experiences'
            }
        },
        {
            avatar: AvatarImage,
            name: 'John Doe',
            mainImage: ExperienceBg,
            reactions: {
                heart: 9,
                follower: 5,
                share: 0,
                comment: 0
            },
            miniCard: {
                image: BannerBg,
                description: 'Learn Flamenco like a pro experiences'
            }
        },
    ]

    const initChatHistory = [
        {
            avatar: AvatarImage,
            name: 'John Doe',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mollis, odio id aliquet euismod.',
            isSender: false
        },
        {
            avatar: AvatarImage,
            name: 'John Doe',
            message: 'Dolor sit amet, consectetur adipiscing elit. Ut mollis, odio id aliquet euismod.',
            isSender: true
        },
    ]

    const initLessonSlots = [
        {
            id: 1,
            date: 'Mittwoch, 12.04.21',
            time: '12:30 Uhr',
            duration: '45 Minuten'
        },
        {
            id: 2,
            date: 'Mittwoch, 19.04.21',
            time: '12:30 Uhr',
            duration: '45 Minuten'
        },
        {
            id: 3,
            date: 'Mittwoch, 26.04.21',
            time: '12:30 Uhr',
            duration: '45 Minuten'
        },
    ]

    const dotSidebarItems = [
        {
            id: 1,
            href: 'control-panel',
            className: 'control-panel',
        },
        {
            id: 2,
            href: 'share-chat',
            className: 'share-chat',
        },
        {
            id: 3,
            href: 'activity',
            className: 'activity',
        },
        {
            id: 4,
            href: 'experience',
            className: 'experience',
        },
    ]

    const [groupMembers, setGroupMembers] = useState(initGroupMembers)
    const [leftBoxMembers, setLeftBoxMembers] = useState(initLeftBoxMembers)
    const [rightBoxMembers, setRightBoxMembers] = useState(initRightBoxMembers)
    const [activities, setActivities] = useState(initActivities)
    const [shareItems, setShareItems] = useState(initShareItems)
    const [chatHistory, setChatHistory] = useState(initChatHistory)
    const [lessonSlots, setLessonSlots] = useState(initLessonSlots)
    const [chatBoxInputText, setChatBoxInputText] = useState('')
    const [selectedLessonSlot, setSelectedLessonSlot] = useState('')
    const [showSlotModal, setShowSlotModal] = useState(false)
    const [showChecklistModal, setShowChecklistModal] = useState(false)
    const [showWeiterModal, setShowWeiterModal] = useState(false)
    const [experienceCategory, setExperienceCategory] = useState(null)

    useEffect(() => {
        setTimeout(() => {
            toggleWeiterModal()
        }, 10000)
    }, [])

    const onClickControlPanelFooterBtn = () => {
        setShowSlotModal(true)
    }
    const toggleSlotModal = (e) => {
        setShowSlotModal(!showSlotModal)
    }
    const toggleWeiterModal = (e) => {
        setShowWeiterModal(!showWeiterModal)
    }
    const toggleChecklistModal = (e) => {
        setShowChecklistModal(!showChecklistModal)
    }

    const handleChangeSelectedSlot = (e, slot) => {
        setSelectedLessonSlot(slot)
        console.log('handleChange Selected Slot: selectedItem', slot)
    }

    const onClickModalSlotSubmitBtn = () => {
        toggleSlotModal()
        console.log('On Clicked Slot Modal Button')
        toggleChecklistModal()
    }

    const onClickModalChecklistSubmitBtn = () => {
        toggleChecklistModal()
        console.log('On Clicked Checklist Modal Button')
    }

    const onClickWeiterModalClose = () => {
        toggleWeiterModal()
    }

    const [active, setActive] = useState(1)
    const [startVideo, setStartVideo] = useState(false)


    return (
        <>
            <div className='container'>
                <div className="row justify-content-center align-items-center">
                    <div className="col-6">
                        <div style={{ marginTop: 100 }} className="navBars">
                        <div onClick={() => setActive(1)} className={active == 1 ? "activeItem" : 'item'}>
                                <p >Control Panel</p>
                            </div>
                            <div onClick={() => setActive(2)} className={active == 2 ? "activeItem share" : 'item share'}>
                                <p >Share</p>
                            </div>
                            <div onClick={() => setActive(3)} className={active == 3 ? "activeItem" : 'item'}>
                                <p >Chat</p>
                                <span></span>
                            </div>
                            <div onClick={() => setActive(4)} className={active == 4 ? "activeItem" : 'item'}>
                                <p >Activity</p>
                                <span></span>
                            </div>
                            <div onClick={() => setActive(5)} className={active == 5 ? "activeItem" : 'item'}>
                                <p >About</p>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ExperienceLayout dotSidebarItems={dotSidebarItems}>
                {active == 1 &&
                    <div className="row scrollBoxSection" id="control-panel">
                        <div className="col-12">
                            <div className="mt-5">
                                <ExperienceHeaderBox
                                    title={'Learn Djambe traditionally'}
                                    subtitle={'Class A'}
                                    screenWidth={screenWidth}
                                    members={groupMembers}
                                    startLesson
                                    onClickStartVideo={() => setStartVideo(true)}
                                />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="mt-5">
                                <ControlPanelBox
                                    title={'Control Panel'}
                                    leftBoxMembers={leftBoxMembers}
                                    leftBoxMemberMaxCount={2}
                                    leftBoxDescription={'Nehmen ab 12.10 teil'}
                                    rightBoxMembers={rightBoxMembers}
                                    rightBoxMemberMaxCount={4}
                                    rightBoxDescription={'4 von 7 Mitgliedern bereit'}
                                    footerBtnText={'Gruppe Starten'}
                                    onClickfooterBtn={onClickControlPanelFooterBtn}
                                    isBorderedBtn={false}
                                    hidefooterBtn={false}
                                />
                            </div>
                        </div>
                    </div>
                }
                {active == 2 &&
                    <div className='row justify-content-center'>
                        <div className="col-12">
                            <div className="mt-4">
                                <ShareBox
                                    shareItems={shareItems}
                                    onClickCameraBtn={() => console.log('Clicked Camera Button')}
                                    onClickVideoBtn={() => console.log('Clicked Video Button')}
                                    onClickPhotoBtn={() => console.log('Clicked Photo Button')}
                                />
                            </div>
                        </div>
                    </div>
                }
                {active == 3 &&
                    <div className='row justify-content-center'>
                        <div className="col-12">
                            <div className="mt-4">
                                <div className="scrollBoxSection mt-4" id="share-chat">
                                    <ExperienceChatBox
                                        onClickZumChatButton={() => console.log('Clicked Zum Chat Button')}
                                        chatHistory={chatHistory}
                                        chatBoxInput={chatBoxInputText}
                                        onChangeChatBoxInput={event => setChatBoxInputText(event.target.value)}
                                        onSubmitChatInput={event => {
                                            event.preventDefault()
                                            console.log('Submitted Chat Input Text: ', chatBoxInputText)
                                            setChatBoxInputText('')
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {active == 4 &&
                    <div className='row justify-content-center'>
                        <div className="col-12">
                            <div className="mt-4">
                                <div className="scrollBoxSection mt-4" id="activity">
                                    <ActivityBox
                                        activities={activities}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {active == 5 &&
                    <div className='row justify-content-center'>
                        <div className="col-12">
                            <div className="mt-4">
                                <div className="scrollBoxSection mt-4" id="experience">
                                    <ExperienceBox
                                        description={'In dieser Experience geht es ums gemeinsame Trommeln. Der Unterricht ist für Anfänger …'}
                                        timingLabel={'Termin'}
                                        timingValue={'Mittwochs 10:30 Uhr, wöchentlich'}
                                        screenWidth={screenWidth}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <Modal
                    isOpen={showSlotModal}
                    toggle={toggleSlotModal}
                    centered={true}
                    modalClassName="startExperiencModalRoot"
                    className="startExperiencModalDialog"
                >
                    <ModalBody className="startExperiencModalBody" style={{ background: 'none' }}>
                        <ExperienceModalSlot
                            slots={lessonSlots}
                            handleChange={handleChangeSelectedSlot}
                            onClickSubmitBtn={onClickModalSlotSubmitBtn}
                        />
                    </ModalBody>
                </Modal>

                <Modal
                    isOpen={showChecklistModal}
                    toggle={toggleChecklistModal}
                    centered={true}
                    modalClassName="startExperiencModalRoot"
                    className="startExperiencModalDialog"
                >
                    <ModalBody className="startExperiencModalBody" style={{ background: 'none' }}>
                        <ExperienceModalChecklist
                            onClickSubmitBtn={onClickModalChecklistSubmitBtn}
                        />
                    </ModalBody>
                </Modal>

                <Modal
                    isOpen={startVideo}
                    centered={true}
                    toggle={()=> setStartVideo(!startVideo)}
                    modalClassName="startExperiencModalRoot"
                    className="startExperiencModalDialog"
                >
                    <ModalBody className="startExperiencModalBody" style={{ background: 'none' }}>
                        <div className='modalStart'>
                            <h2>Video Lesson jetzt starten? </h2>
                            <button className='primary-btn'>Let's Start</button>
                        </div>
                    </ModalBody>
                </Modal>

                <Modal
                    isOpen={showWeiterModal}
                    toggle={toggleWeiterModal}
                    centered={true}
                    modalClassName="startExperiencModalRoot"
                    className="startExperiencModalDialogXs"
                >
                    <ModalBody className="startExperiencModalBody startExperiencModalBodyXs" style={{ background: 'none' }}>
                        <div className="startExperiencModalWeiter">
                            <ExperienceModalWeiter
                                title={'Weitere Experience erstellen?'}
                                description={'Gib Unterricht oder verleihe/verkaufe ein Instrument, dass bei dir herumsteht, biete einen Job an oder gib dein eigenes Konzert'}
                                handleSelection={data => {
                                    console.log(data)
                                    setExperienceCategory(data)
                                }}
                                submitBtnText={'Weitere Experience erstellen'}
                                closeBtnText={'Danke, nicht jetzt'}
                                onClickSubmitBtn={() => console.log('Clicked Weiter Modal Submit Btn')}
                                onClickClose={onClickWeiterModalClose}
                            />
                        </div>
                    </ModalBody>
                </Modal>
            </ExperienceLayout>
        </>
    )
}


export default StartExperienceGroup