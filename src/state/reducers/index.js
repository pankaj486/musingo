import { combineReducers } from 'redux';
import AllAppReducer from './AllAppReducer';


const reducers = combineReducers({
      allapp: AllAppReducer,
});

export default reducers;
// export type RootState = ReturnType<typeof reducers>;

