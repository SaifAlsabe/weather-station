import { GET_WEATHER_ZIPCODE_FAIL, GET_WEATHER_ZIPCODE_REQUEST, GET_WEATHER_ZIPCODE_SUCCESS } from '../constants/weatherConstants';


const weatherReducer = (state = {}, action) => {

    switch (action.type) {
        case GET_WEATHER_ZIPCODE_REQUEST:
            return { loading: true }
        case GET_WEATHER_ZIPCODE_SUCCESS:
            return { loading: false, data: action.payload }
        case GET_WEATHER_ZIPCODE_FAIL:
            console.log(action.payload)
            return { loading: false, data: action.payload.data, error: action.payload.error }
        default:
            return state
    }
}

export { weatherReducer }