import BackgroundImage from './../assets/images/experience-bg.png'
import moment from 'moment'
import FullCalendar from '@fullcalendar/react'
import React from 'react'

let eventId = 0
let indicator = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
console.log(BackgroundImage)
//
export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T09:00:00',
    end: todayStr + 'T10:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T16:00:00',
    end: todayStr + 'T17:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00',
    end: todayStr + 'T13:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T22:00:00',
    end: todayStr + 'T23:00:00'
  }
]

export const BOOKED_EVENTS = [
  {
    id: createEventId(),
    title: 'Learn Djamble',
    start: moment().startOf('day').add(12, 'hours').format(),
    end: moment().startOf('day').add(12, 'hours').add(45, 'minutes').format(),
    className: ['booked-event'],
    extendedProps: {
      bookedEvent: true,
      backgroundImage: BackgroundImage
    },
    editable: false
  },
]


export function createEventId() {
  return String(eventId++)
}

export function getEventId() {
  return String(eventId - 1)
}

export function getCommonEventIndicator() {
  return String(++indicator)
}
