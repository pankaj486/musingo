// import React, { useState, useEffect, Fragment } from "react";
// import Swiper from "swiper";
// import "./booking.scss";
// import CloseSlot from "../../../assets/images/cancel-icon.png";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { experienceService } from "src/services/api";
// import { useLocation } from 'react-router-dom';
import { useActions } from "src/hooks/use-actions";
import { useSelector } from "react-redux";
// import Booking from "./booking";


// const BookingTimePickerNew = (props) => {
//   let days = [];
//   const [modal, setModal] = useState(false);
//   const location = useLocation();


//   const toggle = () => setModal(!modal);

//   for (let i = 0; i < 28; i++) {
//     days = [...days, { dayId: i + 1, selected: false }];
//   }

//   const [timeSlot, setTimeSlot] = useState([
//     {
//       name: "kw1",
//       days: [],
//     },
//   ]);
//   // const [slots, setSlot] = useState();
//   // const [slotData , setSlotData] = useState([]);
//   // let experienceTimeList

//   const { userSelectedSlots } = useActions();
//   const { Experience } = useActions();

//   const bookingData = useSelector((state) => state);
//   // console.log("bookingData", bookingData);


//   let uniqueDate = [];
//   var slotList = [];

//   useEffect(() => {
//     gerExperience();
//     console.log('uid', props)
//   }, []);

//   const gerExperience = async () => {
//     experienceService.getSingle(props.uid).then((response) => {

//       console.log('i am here ', response)
//       Experience(response);
//       // experienceService.getAll().then((response) => {
//       //   console.log(response)
//       const resposedata = response.time_slots;

//       let sortedCars1 = resposedata.sort(
//         (a, b) =>
//           new Date(...a.start_date.split("/").reverse()) -
//           new Date(...b.start_date.split("/").reverse())
//       );
//       sortedCars1.map((item) => {
//         var findItem = uniqueDate.find((x) => x.start_date === item.start_date);
//         if (!findItem) uniqueDate.push(item);
//       });
//       uniqueDate.map((item, index) => {
//         const slot = [];
//         sortedCars1.map((items) => {
//           if (items.start_date == item.start_date) {
//             items.selected = false;
//             items.type = "Wöchentlich";
//             slot.push(items);
//           }
//         });
//         const arrayvalue = [...timeSlot];
//         arrayvalue[0].days.push({
//           dayId: index,
//           weekDay: "So",
//           date: item.start_date,
//           slots: slot,
//         });

//         setTimeSlot(arrayvalue);


//         const arrayValue = [...timeSlot]

//       });
//     });
//   };

//   // const [newSlot,setNewSlot] = useState([]);
//   const [calendarDays, setCalendarDays] = useState(days);
//   const [weeks, setWeeks] = useState(slotList);
//   const [selectedSlots, setSelectedSlots] = useState([]);
//   const [currentWeek, setCurrentWeek] = useState(1);
//   const [weitererModal, setWeitererModal] = useState(false);
//   const [slots, setSlots] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState({
//     border: '2px solid #4ad9ca',
//     styleBorder: '2px solid #d2d2d2'
//   })
//   const [userSelectedSlots, setUserSelectedSlots] = useState([]);
//   const toggleWeitererModal = () => setWeitererModal(!weitererModal);

//   const handleSlotClick = (
//     slot,
//     weekIndex,
//     dayIndex,
//     slotIndex,
//     isSelected
//   ) => {

//     // setSlots([slot])
//     // console.log("slot", slot);
//     setSlots([slot])
//     if (!slots.includes(slot)) {
//       console.log("slot", slots);
//       userSelectedSlots(slots);
//     }
//     if (isSelected) {

//       removeSlot(slot, weekIndex, dayIndex, slotIndex);
//       console.log("removeSlot", slot);  

//       return;
//     }

//     const tempWeeks = [...weeks];
//     const tempSlots = [...selectedSlots];
//     const tempDays = [...calendarDays];
//     let selectedSlot = null;
//     props.handleBookingAppointmentType(slot.type);
//     if (slot.type === "Wöchentlich") {
//       for (let i = +weekIndex; i < weeks.length; i++) {
//         selectedSlot = tempWeeks[+i].days[+dayIndex].slots[+slotIndex];
//         if (!selectedSlot.selected) {
//           selectedSlot.selected = true;
//           // !selectedSlot.selected

//           if (i < 4) {
//             let selectedDay = tempWeeks[+i].days[+dayIndex];
//             let selectedDayFromDays = tempDays.filter(
//               (day) => day.dayId === selectedDay.dayId
//             )[0];
//             selectedDayFromDays.selected = true;
//           }

//           selectedSlot.dayIndex = dayIndex;
//           selectedSlot.slotIndex = slotIndex;
//           tempSlots.push(selectedSlot);
//         }
//       }
//     } else {
//       for (let i = +weekIndex; i < weeks.length; i = i + 2) {
//         selectedSlot = tempWeeks[+i].days[+dayIndex].slots[+slotIndex];
//         if (!selectedSlot.selected) {
//           selectedSlot.selected = true;

//           if (i < 4) {
//             let selectedDay = tempWeeks[+i].days[+dayIndex];
//             let selectedDayFromDays = tempDays.filter(
//               (day) => day.dayId === selectedDay.dayId
//             )[0];
//             selectedDayFromDays.selected = true;
//             // !selectedDayFromDays.selected
//           }

//           selectedSlot.dayIndex = dayIndex;
//           selectedSlot.slotIndex = slotIndex;
//           tempSlots.push(selectedSlot);
//         }
//       }
//     }
//     setWeeks(tempWeeks);
//     setCalendarDays(tempDays);
//     setSelectedSlots(tempSlots);
//     // setSelectedCategory(selectedCategory.border);
//     // console.log("selectedSlots",selectedSlots);
//   };

//   // const handleSlotClick = (slot,weekIndex,dayIndex,slotIndex,isSelected) => {
//   //   console.log(slot,weekIndex,dayIndex,slotIndex,isSelected)
//   //   if(!userSelectedSlots.length) {
//   //     userSelectedSlots.push(slot)
//   //     setUserSelectedSlots(userSelectedSlots)
//   //   } else {
//   //     // check if slot is already there if it is there remove it  else add
//   //     if (isSlotThere(slot)) {
//   //       // remove the slot from selected slots

//   //     } else {

//   //     }
//   //   }

//   // }

//   const removeSlot = (slot, weekIndex, dayIndex, slotIndex) => {
//     const tempWeeks = [...weeks];
//     const tempSlots = [...selectedSlots];
//     const tempDays = [...calendarDays];
//     let selectedSlot = null;

//     for (let i = 0; i < weeks.length; i++) {
//       selectedSlot = tempWeeks[+i].days[+dayIndex].slots[+slotIndex];
//       selectedSlot.selected = false;

//       if (i < 4) {
//         let selectedDay = tempWeeks[+i].days[+dayIndex];
//         let selectedDayFromDays = tempDays.filter(
//           (day) => day.dayId === selectedDay.dayId
//         )[0];
//         selectedDayFromDays.selected = false;
//       }
//       const index = tempSlots.findIndex(
//         (tempSlot) => tempSlot.slotId === selectedSlot.slotId
//       );
//       tempSlots.splice(index, 1);
//     }

//     const index = tempSlots.findIndex(
//       (tempSlot) => tempSlot.slotId === selectedSlot.slotId
//     );
//     tempSlots.splice(index, 1);

//     setWeeks(tempWeeks);
//     setCalendarDays(tempDays);
//     setSelectedSlots(tempSlots);
//   };

//   let [mySwiper, setMySwiper] = useState(new Swiper());

//   useEffect(() => {
//     let swiper = new Swiper(".booking-slider", {
//       speed: 1000,
//       slidesPerView: 1,
//       allowTouchMove: false,
//       navigation: {
//         nextEl: ".button-next",
//         prevEl: ".button-prev",
//       },
//     });
//     setMySwiper(swiper);
//   }, []);

//   return (
//     <>
//       {timeSlot.length ? (
//         <div className="mt-2">
//           <div className="d-flex flex-wrap justify-content-between align-items-start"></div>

//           <div
//             className="swiper-container booking-slider booking-slider-single"
//             id="swiper"
//             style={{ marginTop: "20px" }}
//           >
//             <div className="d-flex justify-content-between">
//               <div className="booking-slider-single__header">
//                 <p className="booking-slider-single__header-title d-none">
//                   {"Wähle deinen Slot"}
//                 </p>
//                 <button
//                   className="btn booking-slider-single__header-button"
//                   onClick={() => setWeitererModal(true)}
//                 >
//                   {"Slot hinzufügen"}
//                 </button>
//                 <button
//                   className="btn booking-slider-single__header-button d-none"
//                   onClick={() => console.log("clicked btn")}
//                 >
//                   {"Weiterer Termin"}
//                 </button>
//                 <div className="slot-tag slot-tag--warning">
//                   <span
//                     className="slot-tag__close"
//                     onClick={() =>
//                       console.log("Clicked Selected slot close btn")
//                     }
//                   >
//                     <i className="fa fa-times"></i>
//                   </span>
//                   <div className="slot-tag__title">
//                     {"Donnerstags 9:00 - 9:45"}
//                   </div>
//                   <div className="slot-tag__desc">{"wöchentlich"}</div>
//                 </div>
//                 <div className="slot-tag slot-tag--primary">
//                   <span
//                     className="slot-tag__close"
//                     onClick={() =>
//                       console.log("Clicked Selected slot close btn")
//                     }
//                   >
//                     <i className="fa fa-times"></i>
//                   </span>
//                   <div className="slot-tag__title">
//                     {"Donnerstags 12:30 - 13:15"}
//                   </div>
//                   <div className="slot-tag__desc">{"zweiwöchentlich"}</div>
//                 </div>
//               </div>
//               <div className="mb-3">
//                 <button
//                   disabled={currentWeek === 1}
//                   className="btn btn-primary text-white button-prev cursor-pointer mr-2"
//                   onClick={() => {
//                     currentWeek !== 1
//                       ? setCurrentWeek(currentWeek - 1)
//                       : setCurrentWeek(1);
//                   }}
//                 >
//                   <i className="fa fa-chevron-left" aria-hidden="true"></i>
//                 </button>
//                 <button
//                   disabled={currentWeek === weeks.length}
//                   className="btn btn-primary text-white button-next cursor-pointer"
//                   onClick={() => {
//                     currentWeek !== weeks.length
//                       ? setCurrentWeek(currentWeek + 1)
//                       : setCurrentWeek(weeks.length);
//                   }}
//                 >
//                   <i className="fa fa-chevron-right" aria-hidden="true"></i>
//                 </button>
//               </div>
//             </div>

//             <div className="swiper-wrapper">
//               {timeSlot.map((week, weekIndex) => (
//                 <Fragment key={weekIndex}>
//                   <div
//                     className="swiper-slide"
//                     style={{ fontSize: "11px", overflowX: "auto" }}
//                   >
//                     <div
//                       className={`d-flex ${props.width > 767 && "flex-column"
//                         } flex-sm-row text-center align-center`}
//                     >
//                       {week.days.map((day, dayIndex) => (
//                         <div
//                           key={dayIndex}
//                           className="d-flex flex-column px-2"
//                           style={{ width: props.width < 768 && "100%" }}
//                         >

//                           <div className="font-weight-bold mb-3 font-14">
//                             {day.weekDay} {day.date}
//                           </div>
//                           {day.slots.map((slot, slotIndex) => (

//                             <div
//                               key={slotIndex}
//                               style={{ position: "relative" }}
//                               className="slotBlock slotBlock-single"
//                               onClick={() => setSelectedCategory(slot)}
//                             >
//                               <div
//                                 onClick={() => {
//                                   handleSlotClick(
//                                     slot,
//                                     weekIndex,
//                                     dayIndex,
//                                     slotIndex,
//                                     timeSlot[weekIndex].days[dayIndex].slots[
//                                       slotIndex
//                                     ].selected
//                                   );

//                                 }}
//                                 className={`slotBlock-single__body mb-3 ${timeSlot[weekIndex].days[dayIndex].slots[
//                                   slotIndex
//                                 ].selected
//                                   ? "slotBlock-single__body--selected slotBlock-single__body--warning"
//                                   : ""
//                                   }`}
//                                 style={{
//                                   border: selectedCategory === slot ? '2px solid #4ad9ca' : '2px solid #d2d2d2',
//                                 }}
//                               >
//                                 <p className="slotBlock-single__body-timing">
//                                   {slot.start_time}
//                                 </p>
//                                 <p
//                                   className="slotBlock-single__body-desc"
//                                   style={{ borderRadius: "10px" }}
//                                 >
//                                   {`Wöchentlich`}
//                                 </p>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </Fragment>
//               ))}
//             </div>
//             <Modal
//               isOpen={weitererModal}
//               toggle={toggleWeitererModal}
//               centered={true}
//             >
//               <div className="modal-weiterer">
//                 <ModalBody>
//                   <h2 className="modal-weiterer__title">Weiterer Termin</h2>
//                   <p className="modal-weiterer__desc">
//                     Du bist dabei einen weiteren regelmäßigen Termin zu
//                     erstellen.
//                   </p>
//                   <button
//                     className="btn btn-primary modal-weiterer__button"
//                     onClick={toggleWeitererModal}
//                   >
//                     Okay, super
//                   </button>
//                 </ModalBody>
//               </div>
//             </Modal>
//             <Modal isOpen={modal} toggle={toggle} centered={true}>
//               <div className="defBorder">
//                 <ModalHeader toggle={toggle}>Warnung</ModalHeader>
//                 <ModalBody>
//                   <p className="p-4">
//                     Bitte entfernen Sie zuerst einen ausgewählten Steckplatz
//                   </p>
//                 </ModalBody>
//                 <ModalFooter>
//                   <Button color="primary px-4 text-white" onClick={toggle}>
//                     Cancel
//                   </Button>
//                 </ModalFooter>
//               </div>
//             </Modal>
//           </div>
//         </div>
//       ) : (
//         ""
//       )}
//     </>
//   );
// };
// export default BookingTimePickerNew;


import React, { useState, useEffect, Fragment } from 'react'
import Swiper from 'swiper';
import './booking.scss';
import CloseSlot from '../../../assets/images/cancel-icon.png';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const BookingTimePickerNew = (props) => {

  let days = [];
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  for (let i = 0; i < 28; i++) {
    days = [...days, { dayId: i + 1, selected: false }];
  }

  const [timeSlot, setTimeSlot] = useState([
    {
      name: "kw1",
      days: [],
    },
  ]);

  const { userSelectedSlots } = useActions();
  const { Experience } = useActions();

  // const [categories, setCategories] = useState(new Set());
  const [calendarDays, setCalendarDays] = useState(days);
  const [weeks, setWeeks] = useState(timeSlot);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [weitererModal, setWeitererModal] = useState(false);
  const toggleWeitererModal = () => setWeitererModal(!weitererModal)

  const handleSlotClick = (slot, weekIndex, dayIndex, slotIndex, isSelected) => {
    if (isSelected) {
      // setModal(true);
      removeSlot(slot, weekIndex, slotIndex, dayIndex);

      // alert('Bitte entfernen Sie zuerst einen ausgewählten Steckplatz')
      return
    }
    console.log(selectedSlots);
   

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
            // selectedDayFromDays.selected = false;
          }

          selectedSlot.dayIndex = dayIndex;
          selectedSlot.slotIndex = slotIndex;
          const newTimeSlot = {
            "time_slot": selectedSlot.uid,
            "period": 2,
            "start_date": selectedSlot.start_date
          }

          tempSlots.push(newTimeSlot);
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
            let selectedDayFromDays = tempDays.filter(day => day.dayId === selectedDay.dayId);
            selectedDayFromDays.selected = true;
            // !selectedDayFromDays.selected
          }

          selectedSlot.dayIndex = dayIndex;
          selectedSlot.slotIndex = slotIndex;
          tempSlots.push(selectedSlot);
        }
      }
    }

    setWeeks(tempWeeks);
    setCalendarDays(tempDays);
    setSelectedSlots(tempSlots);
    userSelectedSlots(tempSlots);
  }

  let uniqueDate = [];
  var slotList = [];

  useEffect(() => {
    gerExperience();
    // console.log('uid', props)
  }, []);

  const gerExperience = async () => {
    experienceService.getSingle(props.uid).then((response) => {

      // console.log('i am here ', response)
      Experience(response);
      // experienceService.getAll().then((response) => {
      //   console.log(response)
      const resposedata = response.time_slots;

      let sortedCars1 = resposedata.sort(
        (a, b) =>
          new Date(...a.start_date.split("/").reverse()) -
          new Date(...b.start_date.split("/").reverse())
      );
      sortedCars1.map((item) => {
        var findItem = uniqueDate.find((x) => x.start_date === item.start_date);
        if (!findItem) uniqueDate.push(item);
      });
      uniqueDate.map((item, index) => {
        const slot = [];
        sortedCars1.map((items) => {
          if (items.start_date == item.start_date) {
            items.selected = false;
            items.type = "Wöchentlich";
            slot.push(items);
          }
        });
        const arrayvalue = [...timeSlot];
        arrayvalue[0].days.push({
          dayId: index,
          weekDay: "So",
          date: item.start_date,
          slots: slot,
        });

        setTimeSlot(arrayvalue);


        const arrayValue = [...timeSlot]

      });
    });
  };



  const removeSlot = (slot, weekIndex, dayIndex, slotIndex, e) => {

    // const filterSlot = selectedSlots.map((slot) => {
    //   return slot.time_slot
    // })

    const tempWeeks = [...weeks];
    const tempSlots = [...selectedSlots];
    const tempDays = [...calendarDays];
    // let selectedSlot = null;
    for (let i = 0; i < weeks.length; i++) {
      // selectedSlot = tempWeeks[+i].days[+dayIndex].slots[+slotIndex];
      slot.selected = false
      // selectedSlot.selected = false;

      if (i < 4) {
        let selectedDay = tempWeeks[+i].days[+dayIndex];
        let selectedDayFromDays = tempDays.filter(
          (day) => day.dayId === selectedDay.dayId
        );
        selectedDayFromDays.selected = false;
      }
      const index = tempSlots.findIndex(tempSlot => tempSlot.time_slot === slot.uid)
      tempSlots.splice(index, 1);
    }

    // const index = tempSlots.findIndex(
    //   (tempSlot) => tempSlot.slotId === filterSlot
    // );
    // tempSlots.splice(index, 1);

    let index = tempSlots.findIndex((tempSlot) => tempSlot.time_slot === slot.uid);
    // console.log("index", index);
    tempSlots.splice(index, 1);
    setSelectedSlots(tempSlots);



    setWeeks(tempWeeks);
    setCalendarDays(tempDays);
    setSelectedSlots(tempSlots);
    userSelectedSlots(tempSlots);
  };



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


  // console.log("tempSlot", timeSlot);
  console.log("selectedSlot", selectedSlots);

  return (
    <div className="mt-2">
      <div className="d-flex flex-wrap justify-content-between align-items-start">
      </div>
      <div className="swiper-container booking-slider booking-slider-single" id="swiper" style={{ marginTop: '20px' }} >
        <div className="d-flex justify-content-between">
          <div className="booking-slider-single__header">
            <p className="booking-slider-single__header-title d-none">{'Wähle deinen Slot'}</p>
            <button className="btn booking-slider-single__header-button" onClick={() => setWeitererModal(true)}>
              {'Slot hinzufügen'}
            </button>
            <button className="btn booking-slider-single__header-button d-none" onClick={() => console.log('clicked btn')}>
              {'Weiterer Termin'}
            </button>
            <div className="slot-tag slot-tag--warning">
              <span className="slot-tag__close" onClick={() => console.log('Clicked Selected slot close btn')}>
                <i className="fa fa-times"></i>
              </span>
              <div className="slot-tag__title">{'Donnerstags 9:00 - 9:45'}</div>
              <div className="slot-tag__desc">{'wöchentlich'}</div>
            </div>
            <div className="slot-tag slot-tag--primary">
              <span className="slot-tag__close" onClick={() => console.log('Clicked Selected slot close btn')}>
                <i className="fa fa-times"></i>
              </span>
              <div className="slot-tag__title">{'Donnerstags 12:30 - 13:15'}</div>
              <div className="slot-tag__desc">{'zweiwöchentlich'}</div>
            </div>
          </div>
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
          {timeSlot.map((week, weekIndex) => (
            <Fragment key={weekIndex}>
              <div
                className="swiper-slide"
                style={{ fontSize: "11px", overflowX: "auto" }}
              >
                <div
                  className={`d-flex ${props.width > 767 && "flex-column"
                    } flex-sm-row text-center align-center`}
                >
                  {week.days.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className="d-flex flex-column px-2"
                      style={{ width: props.width < 768 && "100%" }}
                    >

                      <div className="font-weight-bold mb-3 font-14">
                        {day.weekDay} {day.date}
                      </div>
                      {day.slots.map((slot, slotIndex) => (

                        <div
                          key={slotIndex}
                          style={{ position: "relative" }}
                          className="slotBlock slotBlock-single"
                        // onClick={() => setSelectedCategory(slot)}
                        >
                          <div
                            onClick={() => {
                              handleSlotClick(
                                slot,
                                weekIndex,
                                dayIndex,
                                slotIndex,
                                timeSlot[weekIndex].days[dayIndex].slots[
                                  slotIndex
                                ].selected
                              );

                            }}
                            className={`slotBlock-single__body mb-3 ${timeSlot[weekIndex].days[dayIndex].slots[
                              slotIndex
                            ].selected
                              ? "slotBlock-single__body--selected slotBlock-single__body--warning"
                              : ""
                              }`}
                          >
                            <p className="slotBlock-single__body-timing">
                              {slot.start_time}
                            </p>
                            <p
                              className="slotBlock-single__body-desc"
                              style={{ borderRadius: "10px" }}
                            >
                              {`Wöchentlich`}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </Fragment>
          ))}
        </div>
        <Modal isOpen={weitererModal} toggle={toggleWeitererModal} centered={true}  >
          <div className="modal-weiterer">
            <ModalBody>
              <h2 className="modal-weiterer__title">Weiterer Termin</h2>
              <p className="modal-weiterer__desc">
                Du bist dabei einen weiteren regelmäßigen Termin zu erstellen.
              </p>
              <button className="btn btn-primary modal-weiterer__button" onClick={toggleWeitererModal}>Okay, super</button>
            </ModalBody>
          </div>
        </Modal>
        <Modal isOpen={modal} toggle={toggle} centered={true}  >
          <div className="defBorder">
            <ModalHeader toggle={toggle}>Warnung</ModalHeader>
            <ModalBody>
              <p className="p-4">
                Bitte entfernen Sie zuerst einen ausgewählten Steckplatz
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary px-4 text-white" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </div>
        </Modal>
      </div>
    </div>
  )
}
export default BookingTimePickerNew;