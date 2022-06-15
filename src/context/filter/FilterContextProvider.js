import React, { useReducer } from 'react';
import FilterReducer from './FilterReducer';
import {
    SET_FILTER_TYPE, SET_KID_STATE, SET_FILTER_TYPES
} from '../types';
import { createContext } from 'react';
import { boolean } from 'yup';


// Create Context
const initialState = {
    filterType: '',
    filterTypes: '',
    setFilterType: (type) => { },
    setFilterTypes: (type) => { },
    isKidActive: false,
    setKidActiveState: (state) => { },
}

export const FilterContext = createContext(initialState);

// Provider Component
export const FilterContextProvider = (props) => {

    const [state, dispatch] = useReducer(FilterReducer, initialState);

    // Get FilteredContent
    const setFilterType = (type) => {
        dispatch({
            type: SET_FILTER_TYPE,
            payload: type
        })
    }
    const setFilterTypes = (type) => {
        dispatch({
            type: SET_FILTER_TYPES,
            payload: type
        })
    }

    const setKidActiveState = (state) => {
        dispatch({
            type: SET_KID_STATE,
            payload: state
        })
    }


    return (
        <FilterContext.Provider
            value={{
                filterType: state.filterType,
                setFilterType,
                filterTypes: state.filterTypes,
                setFilterTypes,
                isKidActive: state.isKidActive,
                setKidActiveState,
            }}>
            {props.children}
        </FilterContext.Provider>
    );
};

