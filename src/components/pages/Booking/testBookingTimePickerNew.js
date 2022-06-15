import { experienceService } from "src/services/api";
import React, { useState, useEffect, Fragment } from 'react'
import Swiper from 'swiper';
import './booking.scss';
import CloseSlot from '../../../assets/images/cancel-icon.png';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import moment from "moment";
import { useSelector } from 'react-redux';
import { useActions } from "src/hooks/use-actions";


const TestBookingTimePickerNew = (props) => {

  let uniqueDate = [];
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeSlot, setTimeSlot] = useState([{ name: "kw1", days: [] }]);
  const [weitererModal, setWeitererModal] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(1);

  const userSelecteSlots = useSelector((state) => state.allapp.time_slot_bookings);

  const { userSelectedSlots, Experience } = useActions();


  const toggleWeitererModal = () => setWeitererModal(!weitererModal)
  const toggle = () => setModal(!modal);
  const getDayName = (mydate) => moment(mydate).format('dd')
  const getBookingTimeSlots = async () => {
    experienceService.getSingle(props.uid).then((response) => {
      Experience(response);
      const time_slots = response.time_slots;
      let sortedCars1 = time_slots.sort(
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
          weekDay: getDayName(item.start_date),
          date: item.start_date,
          slots: slot,
        });
        setLoading(!loading)
        setTimeSlot(arrayvalue);
        // console.log(arrayvalue)
      });
    })
  }

  const handleSlotClick = (slot, weekIndex, dayIndex, slotIndex) => {
    if (slot.selected) {
      timeSlot[weekIndex]['days'][dayIndex]['slots'][slotIndex].selected = false
      const arrayvalue = [...timeSlot];
      setTimeSlot(arrayvalue)
      const newSelecteSlots = userSelecteSlots.filter(ele => ele.uid != slot.uid);
      // console.log("newSelectedSlots", newSelecteSlots);
      userSelectedSlots(newSelecteSlots)
    } else {
      userSelecteSlots.push(slot);
      userSelectedSlots(userSelecteSlots)
      timeSlot[weekIndex]['days'][dayIndex]['slots'][slotIndex].selected = true
      const arrayvalue = [...timeSlot];
      setTimeSlot(arrayvalue)
    }
  }

  useEffect(() => {
    getBookingTimeSlots();
  }, [])


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
            <button disabled={currentWeek === timeSlot.length}
              className="btn btn-primary text-white button-next cursor-pointer"
              onClick={() => { currentWeek !== timeSlot.length ? setCurrentWeek(currentWeek + 1) : setCurrentWeek(timeSlot.length); }}>
              <i className="fa fa-chevron-right" aria-hidden="true"></i>
            </button>
          </div>
        </div>

        {loading ?
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
                                : "red"
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
          </div> : <Spinner />
        }
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
  );
}

export default TestBookingTimePickerNew;