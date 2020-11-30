import Axios from 'axios';
import { GET_WEATHER_ZIPCODE_FAIL, GET_WEATHER_ZIPCODE_REQUEST, GET_WEATHER_ZIPCODE_SUCCESS } from '../constants/weatherConstants';


//get latitude, longitude and city
const getWeather = (zipcode, country) => (dispatch, getState) => {

    const { weather: { data } } = getState()
    console.log(data)

    dispatch({ type: GET_WEATHER_ZIPCODE_REQUEST });
    Axios.request({
            method: 'POST',
            url: '/getAddress',
            data: {
                zipcode: zipcode,
                country: country,
            },
        })
        .then(res1 => {
            dispatch(_getWeather(res1.data.coord.lat, res1.data.coord.lon));
        }).catch(error => {
            dispatch({ type: GET_WEATHER_ZIPCODE_FAIL, payload: { data: data, error: error.message } });
        })
}

//get all info
const _getWeather = (lat, lon) => (dispatch) => {
    dispatch({ type: GET_WEATHER_ZIPCODE_REQUEST });
    Axios.request({
            method: 'POST',
            url: '/getWeather',
            data: {
                lat: lat,
                lon: lon,
            },
        })
        .then(res2 => {
            dispatch({ type: GET_WEATHER_ZIPCODE_SUCCESS, payload: res2.data });
        }).catch(error => {
            dispatch({ type: GET_WEATHER_ZIPCODE_FAIL, payload: error.message });
        })

}


export { getWeather, _getWeather }