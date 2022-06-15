import React, { useState } from 'react'

import Conversations from '../Conversations/Conversations'
import ChatHistory from '../Conversations/Conversation/ChatHistory/ChatHistory'
import EmptyConversationTemplate from './../Conversations/Conversation/EmptyConversationTemplate/EmptyConversationTemplate'
import AboutTheExperience from '../../pages/Booking/AboutTheExperience/AboutTheExperience'

import Image from './../../../assets/images/instructor.png'

import './ChatLayout.scss'
import { useHistory } from 'react-router-dom'

const ChatLayout = props => {
  const history = useHistory();

  let [conversations, setConversations] = useState([
    {
      id: 0,
      type: 'provider',
      name: "Felix",
      image: Image,
      chatHistory: [
        { "Felix": { message: "Hello I'm Felix", seen: true } },
        { "Felix": { message: "Hello I'm Felix", seen: true } },
        { "Felix": { message: "Hello I'm Felix", seen: true } },
        { "Me": { message: "I'm fine", seen: true } },
        {
          "Felix": {
            message: `Hi Dimi, wann passt es dir am besten? Ich
              könnte bereits morgen :) Freue mich auf den
              Unterricht mit dir! :-)asdasdasdkjbasfkbhaksf
              aksjfbkabhjsfkjasf askfjbkahsfkhb`,
            seen: false
          }
        }
      ]
    },
    {
      id: 1,
      type: 'provider',
      name: "Dimi",
      image: Image,
      chatHistory: [
        { "Dimi": { message: "Hello I'm Dimi", seen: true } },
        { "Dimi": { message: "Hello I'm Dimi", seen: true } },
        { "Dimi": { message: "Hello I'm Dimi", seen: true } },
        { "Me": { message: "I'm fine", seen: true } },
        {
          "Dimi": {
            message: `Hi Dimi, wann passt es dir am besten? Ich
              könnte bereits morgen :) Freue mich auf den
              Unterricht mit dir! :-)asdasdasdkjbasfkbhaksf
              aksjfbkabhjsfkjasf askfjbkahsfkhb`,
            seen: false
          }
        }
      ]
    },
    {
      id: 2,
      type: 'provider',
      name: "Dan",
      image: Image,
      chatHistory: [
        { "Dan": { message: "Hello I'm Dan", seen: true } },
        { "Dan": { message: "Hello I'm Dan", seen: true } },
        { "Dan": { message: "Hello I'm Dan", seen: true } },
        { "Me": { message: "I'm fine", seen: true } },
        {
          "Dan": {
            message: `Hi Dimi, wann passt es dir am besten? Ich
              könnte bereits morgen :) Freue mich auf den
              Unterricht mit dir! :-)asdasdasdkjbasfkbhaksf
              aksjfbkabhjsfkjasf askfjbkahsfkhb`,
            seen: true
          }
        }
      ]
    },
    {
      id: 3,
      type: 'provider',
      name: "Ryan",
      image: Image,
      chatHistory: [
        { "Ryan": { message: "Hello I'm Ryan", seen: true } },
        { "Ryan": { message: "Hello I'm Ryan", seen: true } },
        { "Ryan": { message: "Hello I'm Ryan", seen: true } },
        { "Me": { message: "I'm fine", seen: true } },
        {
          "Ryan": {
            message: `Hi Dimi, wann passt es dir am besten? Ich
              könnte bereits morgen :) Freue mich auf den
              Unterricht mit dir! :-)asdasdasdkjbasfkbhaksf
              aksjfbkabhjsfkjasf askfjbkahsfkhb`,
            seen: false
          }
        }
      ]
    },
    {
      id: 4,
      type: 'provider',
      name: "Shofol",
      image: Image,
      chatHistory: [
        { "Shofol": { message: "Hello I'm Shofol", seen: true } },
        { "Shofol": { message: "Hello I'm Shofol", seen: true } },
        { "Shofol": { message: "Hello I'm Shofol", seen: true } },
        { "Me": { message: "I'm fine", seen: true } },
        {
          "Shofol": {
            message: `Hi Dimi, wann passt es dir am besten? Ich
              könnte bereits morgen :) Freue mich auf den
              Unterricht mit dir! :-)asdasdasdkjbasfkbhaksf
              aksjfbkabhjsfkjasf askfjbkahsfkhb`,
            seen: true
          }
        }
      ]
    }
  ])
  let index = conversations.findIndex(conversation => conversation.type === 'provider')
  let [activeConversation, setActiveConversation] = useState(index !== -1 ? conversations[index].id : null)
  let [conversationType, setConversationType] = useState('provider')
  const handleConversationTypeChange = (type) => {
    if (type !== conversationType) {
      setConversationType(type)
    }
    if (type === 'provider') {
      let index = conversations.findIndex(conversation => conversation.type === 'provider')
      setActiveConversation(index !== -1 ? conversations[index].id : null)
    }
    if (type === 'customer') {
      let index = conversations.findIndex(conversation => conversation.type === 'customer')
      setActiveConversation(index !== -1 ? conversations[index].id : null)
    }
  }
  const handleActiveConversation = (id) => {
    setActiveConversation(id)
    let updatedConversations = [...conversations]
    let selectedConversation = updatedConversations.find(conversation => conversation.id === id)
    let selectedConversationIndex = updatedConversations.indexOf(conversation => conversation.id === id)
    if (!selectedConversation.chatHistory[selectedConversation.chatHistory.length - 1][selectedConversation.name].seen) {
      selectedConversation.chatHistory[selectedConversation.chatHistory.length - 1][selectedConversation.name].seen = true
    }
    updatedConversations[selectedConversationIndex] = { ...selectedConversation }
    setConversations(updatedConversations)
  }
  return (
    <>
      <div className='container pt-5 mt-5 mr-2 ml-2'>
        <div className='row pt-5 mt-5 align-items-center justify-content-center'>
          <div className='col-6 text-center'>
            <div className='d-flex w-100 align-items-center justify-content-between'>
              <p onClick={() => history.push({
                pathname: '/dashboard',
              })} >Dashboard</p>
              <p onClick={() => history.push({
                pathname: '/conversations',
              })} className='font-weight-bold'>Chat</p>
              <p onClick={() => history.push({
                pathname: '/customerview',
              })}>Meine Buchungen</p>
              <p onClick={() => history.push({
                pathname: '/trainerview',
              })}>Kundenbuchungen</p>
              <p onClick={() => history.push({
                pathname: '/musicianview',
              })}>Meine Inserate</p>
            </div>
          </div>
        </div>
      </div>
      <div className="chat-layout mt-3 mx-2">
        <Conversations
          conversations={conversations}
          conversationType={conversationType}
          activeConversation={activeConversation}
          handleActiveConversation={handleActiveConversation}
          handleConversationTypeChange={handleConversationTypeChange}
        />
        {
          activeConversation !== null ?
            <ChatHistory chatHistory={conversations.find(conversation => conversation.id === activeConversation)} /> :
            <EmptyConversationTemplate />
        }
        <AboutTheExperience emptyInbox={activeConversation === null} chat={true} />
      </div>
    </>
  )
}

export default ChatLayout