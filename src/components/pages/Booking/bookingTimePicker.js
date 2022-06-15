import React, { useState, useEffect, Fragment } from 'react'
import Swiper from 'swiper';
import './booking.scss';
import CloseSlot from '../../../assets/images/cancel-icon.png';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const BookingTimePicker = (props) => {

    let days = [];
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    for (let i = 0; i < 28; i++) {
        days = [...days, { dayId: i + 1, selected: false }];
    }
    let initialWeeks = [
        {
            name: 'kw1',
            days: [
                {
                    dayId: 1, weekDay: 'Mo', date: '03.10',
                    slots: [
                        { slotId: 1, time: '11:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 2, time: '12:30 uhr', type: 'zwei Wöchentlich', selected: false }
                    ]
                },
                {
                    dayId: 2, weekDay: 'Di', date: '04.10', slots: [
                        { slotId: 3, time: '10:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 4, time: '10:30 uhr', type: 'zwei Wöchentlich', selected: false },
                        { slotId: 5, time: '12:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 3, weekDay: 'Mi', date: '05.10', slots: [
                        { slotId: 6, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 7, time: '9:30 uhr', type: 'zwei Wöchentlich', selected: false },
                        { slotId: 8, time: '11:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 4, weekDay: 'Do', date: '06.10', slots: [
                        { slotId: 9, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 10, time: '4:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 5, weekDay: 'Fr', date: '07.10', slots: [
                        { slotId: 11, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 12, time: '1:30 uhr', type: 'zwei Wöchentlich', selected: false },
                        { slotId: 13, time: '2:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 6, weekDay: 'Sa', date: '08.10', slots: [
                        { slotId: 14, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 15, time: '3:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 7, weekDay: 'So', date: '09.10', slots: [
                        { slotId: 16, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 17, time: '2:30 uhr', type: 'zwei Wöchentlich', selected: false },
                        { slotId: 18, time: '1:30 uhr', type: 'zwei Wöchentlich' }]
                }
            ]
        },
        {
            name: 'kw2',
            days: [
                {
                    dayId: 8, weekDay: 'Mo', date: '03.10', slots: [
                        { slotId: 19, time: '11:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 20, time: '12:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 9, weekDay: 'Di', date: '04.10', slots: [
                        { slotId: 21, time: '10:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 22, time: '10:30 uhr', type: 'zwei Wöchentlich', selected: false },
                        { slotId: 23, time: '12:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 10, weekDay: 'Mi', date: '05.10', slots: [
                        { slotId: 24, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 25, time: '9:30 uhr', type: 'zwei Wöchentlich', selected: false },
                        { slotId: 26, time: '11:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 11, weekDay: 'Do', date: '06.10', slots: [
                        { slotId: 27, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 28, time: '4:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 12, weekDay: 'Fr', date: '07.10', slots: [
                        { slotId: 29, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 30, time: '1:30 uhr', type: 'zwei Wöchentlich', selected: false },
                        { slotId: 31, time: '2:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 13, weekDay: 'Sa', date: '08.10', slots: [
                        { slotId: 32, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 33, time: '3:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 14, weekDay: 'So', date: '09.10', slots: [
                        { slotId: 34, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 35, time: '2:30 uhr', type: 'zwei Wöchentlich', selected: false },
                        { slotId: 36, time: '1:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                }
            ]
        },
        {
            name: 'kw3',
            days: [
                {
                    dayId: 15, weekDay: 'Mo', date: '03.10', slots: [
                        { slotId: 37, time: '11:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 38, time: '12:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 16, weekDay: 'Di', date: '04.10', slots: [
                        { slotId: 39, time: '10:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 40, time: '10:30 uhr', type: 'zwei Wöchentlich', selected: false },
                        { slotId: 41, time: '12:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 17, weekDay: 'Mi', date: '05.10', slots: [
                        { slotId: 42, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 43, time: '9:30 uhr', type: 'zwei Wöchentlich', selected: false },
                        { slotId: 44, time: '11:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 18, weekDay: 'Do', date: '06.10', slots: [
                        { slotId: 45, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 46, time: '4:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 19, weekDay: 'Fr', date: '07.10', slots: [
                        { slotId: 47, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 48, time: '1:30 uhr', type: 'zwei Wöchentlich', selected: false },
                        { slotId: 49, time: '2:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 20, weekDay: 'Sa', date: '08.10', slots: [
                        { slotId: 50, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 51, time: '3:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 21, weekDay: 'So', date: '09.10', slots: [
                        { slotId: 52, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 53, time: '2:30 uhr', type: 'zwei Wöchentlich', selected: false },
                        { slotId: 54, time: '1:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                }
            ]
        },
        {
            name: 'kw4',
            days: [
                {
                    dayId: 22, weekDay: 'Mo', date: '03.10', slots: [
                        { slotId: 55, time: '11:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 56, time: '12:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 23, weekDay: 'Di', date: '04.10', slots: [
                        { slotId: 57, time: '10:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 58, time: '10:30 uhr', type: 'zwei Wöchentlich', selected: false },
                        { slotId: 59, time: '12:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 24, weekDay: 'Mi', date: '05.10', slots: [
                        { slotId: 60, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 61, time: '9:30 uhr', type: 'zwei Wöchentlich', selected: false },
                        { slotId: 62, time: '11:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 25, weekDay: 'Do', date: '06.10', slots: [
                        { slotId: 63, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 64, time: '4:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 26, weekDay: 'Fr', date: '07.10', slots: [
                        { slotId: 65, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 66, time: '1:30 uhr', type: 'zwei Wöchentlich', selected: false },
                        { slotId: 67, time: '2:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 27, weekDay: 'Sa', date: '08.10', slots: [
                        { slotId: 68, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 69, time: '3:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 28, weekDay: 'So', date: '09.10', slots: [
                        { slotId: 70, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 71, time: '2:30 uhr', type: 'zwei Wöchentlich', selected: false },
                        { slotId: 72, time: '1:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                }
            ]
        },
        {
            name: 'kw5',
            days: [
                {
                    dayId: 29, weekDay: 'Mo', date: '03.10',
                    slots: [
                        { slotId: 73, time: '11:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 74, time: '12:30 uhr', type: 'zwei Wöchentlich', selected: false }
                    ]
                },
                {
                    dayId: 30, weekDay: 'Di', date: '04.10', slots: [
                        { slotId: 75, time: '10:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 76, time: '10:30 uhr', type: 'zwei Wöchentlich', selected: false },
                        { slotId: 77, time: '12:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 31, weekDay: 'Mi', date: '05.10', slots: [
                        { slotId: 78, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 79, time: '9:30 uhr', type: 'zwei Wöchentlich', selected: false },
                        { slotId: 80, time: '11:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 32, weekDay: 'Do', date: '06.10', slots: [
                        { slotId: 81, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 82, time: '4:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 33, weekDay: 'Fr', date: '07.10', slots: [
                        { slotId: 83, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 84, time: '1:30 uhr', type: 'zwei Wöchentlich', selected: false },
                        { slotId: 85, time: '2:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 34, weekDay: 'Sa', date: '08.10', slots: [
                        { slotId: 86, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 87, time: '3:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 35, weekDay: 'So', date: '09.10', slots: [
                        { slotId: 88, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 89, time: '2:30 uhr', type: 'zwei Wöchentlich', selected: false },
                        { slotId: 90, time: '1:30 uhr', type: 'zwei Wöchentlich' }]
                }
            ]
        },
        {
            name: 'kw6',
            days: [
                {
                    dayId: 36, weekDay: 'Mo', date: '03.10', slots: [
                        { slotId: 91, time: '11:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 92, time: '12:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 37, weekDay: 'Di', date: '04.10', slots: [
                        { slotId: 93, time: '10:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 94, time: '10:30 uhr', type: 'zwei Wöchentlich', selected: false },
                        { slotId: 95, time: '12:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 38, weekDay: 'Mi', date: '05.10', slots: [
                        { slotId: 96, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 97, time: '9:30 uhr', type: 'zwei Wöchentlich', selected: false },
                        { slotId: 98, time: '11:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 39, weekDay: 'Do', date: '06.10', slots: [
                        { slotId: 99, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 100, time: '4:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 40, weekDay: 'Fr', date: '07.10', slots: [
                        { slotId: 101, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 102, time: '1:30 uhr', type: 'zwei Wöchentlich', selected: false },
                        { slotId: 103, time: '2:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 41, weekDay: 'Sa', date: '08.10', slots: [
                        { slotId: 104, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 105, time: '3:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 42, weekDay: 'So', date: '09.10', slots: [
                        { slotId: 106, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 107, time: '2:30 uhr', type: 'zwei Wöchentlich', selected: false },
                        { slotId: 108, time: '1:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                }
            ]
        },
        {
            name: 'kw7',
            days: [
                {
                    dayId: 43, weekDay: 'Mo', date: '03.10', slots: [
                        { slotId: 109, time: '11:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 110, time: '12:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 44, weekDay: 'Di', date: '04.10', slots: [
                        { slotId: 111, time: '10:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 112, time: '10:30 uhr', type: 'zwei Wöchentlich', selected: false },
                        { slotId: 113, time: '12:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 45, weekDay: 'Mi', date: '05.10', slots: [
                        { slotId: 114, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 115, time: '9:30 uhr', type: 'zwei Wöchentlich', selected: false },
                        { slotId: 116, time: '11:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 46, weekDay: 'Do', date: '06.10', slots: [
                        { slotId: 117, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 118, time: '4:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 47, weekDay: 'Fr', date: '07.10', slots: [
                        { slotId: 119, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 120, time: '1:30 uhr', type: 'zwei Wöchentlich', selected: false },
                        { slotId: 121, time: '2:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 48, weekDay: 'Sa', date: '08.10', slots: [
                        { slotId: 122, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 123, time: '3:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 49, weekDay: 'So', date: '09.10', slots: [
                        { slotId: 124, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 125, time: '2:30 uhr', type: 'zwei Wöchentlich', selected: false },
                        { slotId: 126, time: '1:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                }
            ]
        },
        {
            name: 'kw8',
            days: [
                {
                    dayId: 50, weekDay: 'Mo', date: '03.10', slots: [
                        { slotId: 127, time: '11:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 128, time: '12:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 51, weekDay: 'Di', date: '04.10', slots: [
                        { slotId: 129, time: '10:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 130, time: '10:30 uhr', type: 'zwei Wöchentlich', selected: false },
                        { slotId: 131, time: '12:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 52, weekDay: 'Mi', date: '05.10', slots: [
                        { slotId: 132, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 133, time: '9:30 uhr', type: 'zwei Wöchentlich', selected: false },
                        { slotId: 134, time: '11:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 53, weekDay: 'Do', date: '06.10', slots: [
                        { slotId: 135, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 136, time: '4:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 54, weekDay: 'Fr', date: '07.10', slots: [
                        { slotId: 137, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 138, time: '1:30 uhr', type: 'zwei Wöchentlich', selected: false },
                        { slotId: 139, time: '2:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 55, weekDay: 'Sa', date: '08.10', slots: [
                        { slotId: 140, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 141, time: '3:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                },
                {
                    dayId: 56, weekDay: 'So', date: '09.10', slots: [
                        { slotId: 142, time: '12:30 uhr', type: 'Wöchentlich', selected: false },
                        { slotId: 143, time: '2:30 uhr', type: 'zwei Wöchentlich', selected: false },
                        { slotId: 144, time: '1:30 uhr', type: 'zwei Wöchentlich', selected: false }]
                }
            ]
        }
    ];

    const [calendarDays, setCalendarDays] = useState(days);
    const [weeks, setWeeks] = useState(initialWeeks);
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [currentWeek, setCurrentWeek] = useState(1);

    const handleSlotClick = (slot, weekIndex, dayIndex, slotIndex) => {
        if (selectedSlots.length > 0) {
            setModal(true);
            // alert('Bitte entfernen Sie zuerst einen ausgewählten Steckplatz');
            return;
        }
        const tempWeeks = [...weeks];
        const tempSlots = [...selectedSlots];
        const tempDays = [...calendarDays];
        let selectedSlot = null;
        props.handleBookingAppointmentType(slot.type)
        if (slot.type === 'Wöchentlich') {
            for (let i = +weekIndex; i < weeks.length; i++) {
                selectedSlot = tempWeeks[+i].days[+dayIndex].slots[+slotIndex];
                if (!selectedSlot.selected) {
                    selectedSlot.selected = true;
                    // !selectedSlot.selected

                    if (i < 4) {
                        let selectedDay = tempWeeks[+i].days[+dayIndex];
                        let selectedDayFromDays = tempDays.filter(day => day.dayId === selectedDay.dayId)[0];
                        selectedDayFromDays.selected = true;
                    }

                    selectedSlot.dayIndex = dayIndex;
                    selectedSlot.slotIndex = slotIndex;
                    tempSlots.push(selectedSlot);
                }
            }
        }
        else {
            for (let i = +weekIndex; i < weeks.length; i = i + 2) {
                selectedSlot = tempWeeks[+i].days[+dayIndex].slots[+slotIndex];
                if (!selectedSlot.selected) {
                    selectedSlot.selected = true;

                    if (i < 4) {
                        let selectedDay = tempWeeks[+i].days[+dayIndex];
                        let selectedDayFromDays = tempDays.filter(day => day.dayId === selectedDay.dayId)[0];
                        selectedDayFromDays.selected = true;
                        // !selectedDayFromDays.selected
                    }

                    selectedSlot.dayIndex = dayIndex;
                    selectedSlot.slotIndex = slotIndex;
                    tempSlots.push(selectedSlot);
                }
            }
        }

        // if (selectedSlot.selected) {
        // selectedSlot.weekIndex = i;
        // selectedSlot.dayIndex = dayIndex;
        // selectedSlot.slotIndex = slotIndex;
        // tempSlots.push(selectedSlot);
        // } else {
        //     const index = tempSlots.findIndex(tempSlot => tempSlot.slotId === selectedSlot.slotId);
        //     tempSlots.splice(index, 1);
        // }

        setWeeks(tempWeeks);
        setCalendarDays(tempDays);
        setSelectedSlots(tempSlots)
    }



    const removeSlot = (slot, weekIndex, dayIndex, slotIndex) => {
        const tempWeeks = [...weeks];
        const tempSlots = [...selectedSlots];
        const tempDays = [...calendarDays];
        let selectedSlot = null;

        // if (slot.type === 'Wöchentlich') {
        for (let i = 0; i < weeks.length; i++) {
            selectedSlot = tempWeeks[+i].days[+dayIndex].slots[+slotIndex];
            selectedSlot.selected = false;
            // !selectedSlot.selected

            if (i < 4) {
                let selectedDay = tempWeeks[+i].days[+dayIndex];
                let selectedDayFromDays = tempDays.filter(day => day.dayId === selectedDay.dayId)[0];
                selectedDayFromDays.selected = false;
            }
            const index = tempSlots.findIndex(tempSlot => tempSlot.slotId === selectedSlot.slotId);
            tempSlots.splice(index, 1);
        }
        // }
        // else {
        //     for (let i = +weekIndex; i < weeks.length; i = i + 2) {
        //         selectedSlot = tempWeeks[+i].days[+dayIndex].slots[+slotIndex];
        //         selectedSlot.selected = false;

        //         if (i < 4) {
        //             let selectedDay = tempWeeks[+i].days[+dayIndex];
        //             let selectedDayFromDays = tempDays.filter(day => day.dayId === selectedDay.dayId)[0];
        //             selectedDayFromDays.selected = true;
        //             // !selectedDayFromDays.selected
        //         }
        //     }
        // }

        // if (selectedSlot.selected) {
        // selectedSlot.weekIndex = i;
        // selectedSlot.dayIndex = dayIndex;
        // selectedSlot.slotIndex = slotIndex;
        // tempSlots.push(selectedSlot);
        // } else {
        const index = tempSlots.findIndex(tempSlot => tempSlot.slotId === selectedSlot.slotId);
        tempSlots.splice(index, 1);
        // }

        setWeeks(tempWeeks);
        setCalendarDays(tempDays);
        setSelectedSlots(tempSlots)
    }


    let [mySwiper, setMySwiper] = useState(new Swiper());

    useEffect(() => {
        let swiper = new Swiper('.booking-slider', {
            speed: 1000,
            slidesPerView: 1,
            allowTouchMove: false,
            navigation: {
                nextEl: '.button-next',
                prevEl: '.button-prev',
            },
        });
        setMySwiper(swiper);
    }, []);

    // const removeSlot = (slot, slotIndex) => {
    //     const tempSlots = selectedSlots;
    //     tempSlots.splice(slotIndex, 1);
    //     setSelectedSlots(tempSlots);

    //     const tempWeeks = weeks;
    //     tempWeeks[+(slot.weekIndex)].days[+(slot.dayIndex)].slots[+(slot.slotIndex)].selected = false;
    //     setWeeks(tempWeeks);
    // }

    return (
        <div className="mt-2">
            <div className="d-flex flex-wrap justify-content-between align-items-start">
                <div className="calendarView">
                    {
                        calendarDays.map((day, index) => {
                            return <div key={index} className={"calendarItem " + (calendarDays[index].selected ? 'bg-primary' : '')}></div>
                        })
                    }
                </div>
                {/* <div className="mt-3">
                    <div className="slots mt-3">
                        {
                            selectedSlots.map((slSlot, slIndex) => {
                                return <div className="d-flex text-center" key={slIndex}>
                                    <p key={slIndex} className="bg-primary text-white mx-1 slotLine mb-1">
                                        {weeks[0].days[slSlot.dayIndex].weekDay} {slSlot.time} - {+slSlot.time.split(':')[0] + 1 > 12 ? (+slSlot.time.split(':')[0] + 1) - 12 : +slSlot.time.split(':')[0] + 1}:{15} {slSlot.type}</p>
                                </div>
                            })
                        }
                    </div>
                </div> */}
            </div>


            <div className="swiper-container booking-slider" id="swiper" style={{ marginTop: '20px' }} >
                <div className="d-flex justify-content-between">
                    <p>KW{currentWeek}</p>
                    <div className="mb-3">
                        <button disabled={currentWeek === 1}
                            className="btn btn-primary text-white button-prev cursor-pointer mr-2"
                            onClick={() => { currentWeek !== 1 ? setCurrentWeek(currentWeek - 1) : setCurrentWeek(1); }}>
                            <i className="fa fa-chevron-left" aria-hidden="true"></i>
                        </button>
                        <button disabled={currentWeek === weeks.length}
                            className="btn btn-primary text-white button-next cursor-pointer"
                            onClick={() => { currentWeek !== weeks.length ? setCurrentWeek(currentWeek + 1) : setCurrentWeek(weeks.length); }}>
                            <i className="fa fa-chevron-right" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>

                <div className="swiper-wrapper">
                    {
                        weeks.map((week, weekIndex) => {
                            return <Fragment key={weekIndex}>
                                <div key={weekIndex} className="swiper-slide" style={{ fontSize: '11px', overflowX: 'auto' }}>
                                    {
                                        <div className={`d-flex ${props.width > 767 && 'flex-column'} flex-sm-row text-center align-center`}>
                                            {weeks[0].days.map(
                                                (day, dayIndex) => {
                                                    return <div className="d-flex flex-column px-1 " key={dayIndex} style={{ width: props.width < 768 && '100%' }}>
                                                        <div className="font-weight-bold font-14 mb-3">
                                                            {day.weekDay} {day.date}
                                                        </div>
                                                        {
                                                            day.slots.map(
                                                                (slot, slotIndex) => {
                                                                    return <div style={{ position: 'relative' }} className="slotBlock">
                                                                        {weeks[weekIndex].days[dayIndex].slots[slotIndex].selected &&
                                                                            <button className="btn btn-light closingButton" style={{ width: '12px', height: '12px' }} onClick={() => removeSlot(slot, weekIndex, dayIndex, slotIndex)}>
                                                                                <img src={CloseSlot} width="8px" height="8px" alt="closeSlot" /></button>}
                                                                        <div
                                                                            onClick={() => {
                                                                                handleSlotClick(slot, weekIndex, dayIndex, slotIndex)
                                                                            }}
                                                                            className={"cursor-pointer d-flex flex-column align-items-center justify-content-center mb-2 slot circle py-3 px-2 " + (weeks[weekIndex].days[dayIndex].slots[slotIndex].selected ? 'bg-primary' : '')}
                                                                            key={slotIndex}>
                                                                            <p className={"mb-0 font-weight-bold " + (weeks[weekIndex].days[dayIndex].slots[slotIndex].selected ? 'text-white' : '')}>{slot.time}</p>
                                                                            <p className="mb-0 bg-white mt-1 px-2 py-1 font-weight-bold" style={{ borderRadius: '10px' }}>{slot.type}</p>
                                                                        </div>
                                                                    </div>
                                                                }
                                                            )
                                                        }
                                                    </div>
                                                }
                                            )}
                                        </div>
                                    }
                                </div>
                            </Fragment>
                        })
                    }
                </div>
                {/* <div className="swiper-pagination position-relative mt-2"></div> */}
                <Modal isOpen={modal} toggle={toggle} centered={true}  >
                    <div className="defBorder">
                        <ModalHeader toggle={toggle}>Warnung</ModalHeader>
                        <ModalBody>
                            <p className="p-4">
                                Bitte entfernen Sie zuerst einen ausgewählten Steckplatz
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            {/* <Button color="primary" onClick={toggle}>Do Something</Button>{' '} */}
                            <Button color="primary px-4 text-white" onClick={toggle}>Cancel</Button>
                        </ModalFooter>
                    </div>
                </Modal>
            </div>
        </div>
    )
}
export default BookingTimePicker;


