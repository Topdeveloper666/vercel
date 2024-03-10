import { HOME_DATA_MAIN } from '../actionTypes';
const initialState = {
    isConfirmatiom: false,
    homemain: [],
}
function HomemainReducers(state = initialState, action) {

    switch (action.type) {
        case HOME_DATA_MAIN:
            return {
                ...state,
                isConfirmatiom: true,
                media: action.payload,
            }
        default:
            return state
    }
}
export default HomemainReducers;