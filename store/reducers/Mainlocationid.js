import { MAIN_LOCATION_ID } from '../actionTypes';
const initialState = {
    locationid: 2,
}
function Mainlocationid(state = initialState, action) {

    switch (action.type) {
        case MAIN_LOCATION_ID:
            return {
                ...state,
                locationid: action.payload,
            }
        default:
            return state
    }
}
export default Mainlocationid;