
import { Dispatch } from "redux";
import { ActionType } from '../action-types';
import { service } from "src/services/AuthService/authService";


export const AllAction = (data) => {

    return async (dispatch) => {
        try{
            dispatch({
                type: ActionType.SCREEN_IMAGE,
                payload: data
            })
        }catch(e){
           console.log(e);
        }
    }
}



export const getInstrumentData = () => {
    return async (dispatch) => {
        try {
            const response = await service.getInstrument();
            // console.log("here returning", response);
            if (response.status === 200) {
                dispatch({
                    type: ActionType.INSTRUMENT,
                    payload: response.data.results,
                });
            }
        } catch (e) {
            console.log(e)
        }
    };

}; 



export const getAgeGroupData = () => {
    return async (dispatch) => {
        try {
            const response = await service.getAgeGroup();
            console.log("ageGroupReturningResponse", response);
            if (response.status === 200) {
                dispatch({
                    type: ActionType.AGE_GROUP,
                    payload: response.data.results,
                });
            }
        } catch (e) {
            console.log(e)
        }
    };

}; 



export const userSelectedSlots = (data) => {

    return async (dispatch) => {
        try{
            dispatch({
                type: ActionType.BOOKING,
                payload: data
            })
        }catch(e){
           console.log(e);
        }
    }
}


export const editTimeSlotCalendar = (data) => {

    return async (dispatch) => {
        try{
            dispatch({
                type: ActionType.EDIT_TIME_SLOT,
                payload: data
            })
        }catch(e){
           console.log(e);
        }
        
    }
}


export const Experience = (data) => {
    const newvalue = []
    
    const newArray = data.subscription_types.map((type , index)=>{
        newvalue.push(
            {
                id: index,
                uid:type.uid,
                type: `${index} Monate`,
                price: ` ${29+index}€`,
                discount: type.discount_percent,
                payment: '60€',
                popular: index == 0 ? true :false,
                selected: false,
              },)

    })
    // console.log('dsfsdf',newvalue);

    return async (dispatch) => {
        try{
            dispatch({
                type: ActionType.EXPERIENCE,
                payload: newvalue
            })
        }catch(e){
           console.log(e);
        }
    }
}


export const  lessonLocation = (data) => {

    return async (dispatch) => {
        try{
            dispatch({
                type: ActionType.LESSON_LOCATION,
                payload: data
            })
        }catch(e){
           console.log(e);
        }
    }
}


export const  paymentMethodAction = (data) => {

    return async (dispatch) => {
        try{
            dispatch({
                type: ActionType.PAYMENT_METHOD,
                payload: data
            })
        }catch(e){
           console.log(e);
        }
    }
}