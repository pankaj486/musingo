import { ActionType } from "../action-types";

const AllApp = {
    mode: 'Automatic',
    loaderBar: false,
}


export const INITIAL_STATE = {
    AllApp,
    instrument: [],
    ageGroup: [],
    payment_method: "",
    subscription_type: "",
    time_slot_bookings: [],
    edit_time_slot: '',
    experience: [],
    lesson_location: "",
    get_location: [],
    new_event_start_time: '',
    payment_method: "",
    private_lesson: [],
    subscription_type: "",
    musician_view: [],
    location_coordinates:[],
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case ActionType.SCREEN_IMAGE:
            return { ...state, AllApp: action.payload }
        case ActionType.INSTRUMENT:
            return { ...state, instrument: action.payload }
        case ActionType.AGE_GROUP:
            return { ...state, ageGroup: action.payload }
        case ActionType.BOOKING:
            return { ...state, time_slot_bookings: action.payload }
        case ActionType.SUBSCRIPTION:
            return { ...state, subscription_type: action.payload }
        case ActionType.EDIT_TIME_SLOT:
            return { ...state, edit_time_slot: action.payload }
        case ActionType.EXPERIENCE:
            return { ...state, experience: action.payload }
        case ActionType.LESSON_LOCATION:
            return { ...state, lesson_location: action.payload }
        case ActionType.GET_LOCATION:
            return { ...state, get_location: action.payload }
        case ActionType.NEW_EVENT_START_TIME:
            return { ...state, new_event_start_time: action.payload }
        case ActionType.PAYMENT_METHOD:
            return { ...state, payment_method: action.payload }
        case ActionType.PRIVATE_LESSON:
            return { ...state, private_lesson: action.payload }
        case ActionType.SUBSCRIPTION:
            return { ...state, subscription_type: action.payload }
        case ActionType.GET_MUSICIAN_VIEW:
            return { ...state, musician_view: action.payload }
        case ActionType.LOCATION_COORDINATES:
            return { ...state, location_coordinates: action.payload }
        default:
            return state;
    }

};