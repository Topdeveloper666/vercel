import HomeReducers from './HomeReducers'
import mainCatReducers from './mainCatReducers'
import Mainlocationid from "./Mainlocationid"
import locationReducers from './locationReducers'
import userDetails from './UserReducers'
import cardAdd from './cart'
import Homemaindata from './HomemainReducers'
import Datalocation from './Datalocation'
import userAddress from './UserAddressReduces'
import storage from "redux-persist/lib/storage";
import { combineReducers } from 'redux'
import { persistReducer } from "redux-persist";
import commonData from './commonDataReducers'
const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    slide: HomeReducers,
    maincat: mainCatReducers,
    loctions: locationReducers,
    cardAdd: cardAdd,
    userdetails: userDetails,
    userAddress: userAddress,
    locationid: Mainlocationid,
    homemaindata: Homemaindata,
    datalocation: Datalocation,
    commonData: commonData,
});

export default persistReducer(persistConfig, rootReducer);