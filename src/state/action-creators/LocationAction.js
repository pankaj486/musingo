import { Dispatch } from "redux";
import { ActionType } from '../action-types';
import { service } from "src/services/AuthService/authService";



// export const PrivateLesson = (data) => {

//     return async (dispatch) => {
//         try {
//             dispatch({
//                 type: ActionType.PRIVATE_LESSON,
//                 payload: data
//             })
//         } catch (e) {
//             console.log(e);
//         }
//     }
// }

// export const DeleteLocation = (id) => {
//     return async (dispatch) => {
//         try {
//             const response = await experienceService.deleteLocation(id);
//             if (response.status === 204) {
//                 getLatestLocations(dispatch);
//             }
//         } catch (e) {
//             console.log(e)
//         }
//     }
// };

// async function getLatestLocations(dispatch) {

//     const updateResponse = await experienceService.getLessonLocation();
//     if (updateResponse.status === 200) {
//         dispatch({
//             type: ActionType.GET_LOCATION,
//             payload: updateResponse.data.results,
//         });
//     }
// }

export function getMusicianViewById(id) {
    return async (dispatch) => {
        try {
            const response = await service.getMusicianViewListById(id);
            if (response.status === 200) {
                dispatch({
                    type: ActionType.GET_MUSICIAN_VIEW,
                    payload: response.data,
                });
            }
        }catch(e) {
            console.log(e);
        }
    }
}


// export const getLocation = () => {
//     return async (dispatch) => {
//         try {
//             const updateResponse = await experienceService.getLessonLocation();
//             if (updateResponse.status === 200) {
//                 dispatch({
//                     type: ActionType.GET_LOCATION,
//                     payload: updateResponse.data.results,
//                 });
//             }
//         } catch (e) {
//             console.log(e)
//         }
//     }
// };


// export const createLocation = (data) => {
//     return async (dispatch) => {
//         try {
//             const updateResponse = await experienceService.createLessonLocation(data);
//             if (updateResponse.status === 201) {
//                 getLatestLocations(dispatch);
//             }
//         } catch (e) {
//             console.log(e)
//         }
//     }
// };



export const newEditTimeSlot = (data) => {

    return async (dispatch) => {
        try {
            dispatch({
                type: ActionType.NEW_EVENT_START_TIME,
                payload: data
            })
        } catch (e) {
            console.log(e);
        }

    }
}


export const subscription = (data) => {

    return async (dispatch) => {
        try {
            dispatch({
                type: ActionType.SUBSCRIPTION,
                payload: data
            })
        } catch (e) {
            console.log(e);
        }
    }
}


export const locationCoordinates = (data) => {

    return async (dispatch) => {
        try {
            dispatch({
                type: ActionType.LOCATION_COORDINATES,
                payload: data
            })
        } catch (e) {
            console.log(e);
        }
    }
}