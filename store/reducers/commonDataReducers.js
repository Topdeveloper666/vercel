import { COMMON_DATA } from '../actionTypes';
const initialState = {
    isConfirmatiom: false,
    common: {
        booking_time: '',
        coupon_id: '',
        coupon_amount: '',
        coupon_min: '',
    }
}
function commonDataReducers(state = initialState, action) {

    switch (action.type) {
        case COMMON_DATA:
            return {
                ...state,
                isConfirmatiom: true,
                common: action.payload,
            }
        default:
            return state
    }
}
export default commonDataReducers;