import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './HomeScreenStyle.css';
import { getWeather, _getWeather } from '../actions/weatherActions';
import gsap from 'gsap';

function HomeScreen() {

    // UV Index
    const uvi = (uv_index) => {
        uv_index = Number(uv_index);
        switch (Math.floor(uv_index)) {
            case 0:
            case 1:
            case 2:
                return "Low";
            case 3:
            case 4:
            case 5:
                return "Moderate";
            case 6:
            case 7:
                return "High";
            case 8:
            case 9:
            case 10:
                return "Very high";
            default:
                return "Extreme";
        }
    }

    //get data from store
    const { loading, error, data } = useSelector(state => state.weather);

    const dispatch = useDispatch();


    const [country, setCountry] = useState('us');
    const [zipcode, setZipcode] = useState('');

    const formHandlerZipcode = (e) => {
        e.preventDefault();
        dispatch(getWeather(zipcode, country));
    }

    //dispatch user latitude and longitude
    const successFunction = (position) => {
        dispatch(_getWeather(position.coords.latitude, position.coords.longitude));
    }

    //dispatch random latitude and longitude
    const errorFunction = () => {
        dispatch(getWeather("22150", "us"));
    }


    useEffect(() => {

        //get user latitude and longitude
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
        } else {
            //dispatch random latitude and longitude
            errorFunction();
            alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
        }

        const timeLine = gsap.timeline({ defaults: { duration: 0.8, opacity: 0, y: '-10%' } })
        timeLine
            .from('.main-input', {})
            .from('.main-weather', {}, 0)
    }, [])


    useEffect(() => {
        if (data) {
            gsap.from('.info', { duration: 0.8, opacity: 0, stagger: 0.3 })
        }
    }, [data])


    return (
        <div className="main-home" id="home">

            <div className="main-input">

                <form onSubmit={formHandlerZipcode} className="main-form">

                    <label htmlFor="country"><strong>Country Code (ISO 3166-1 alpha-2):</strong></label>
                    <input value={country} onChange={(e) => { setCountry(e.target.value) }} type="text" required maxLength="2" name="country" id="country" autoComplete='off' ></input>

                    <br></br>

                    <label htmlFor="zipcode"><strong>Zipcode</strong></label>
                    <input value={zipcode} onChange={(e) => { setZipcode(e.target.value) }} type="text" required maxLength="5" name="zipcode" id="zipcode" autoComplete='off'></input>

                    <br></br>

                    <button type="submit" className="submit-button">Submit</button>
                </form>

            </div>

            <div className="main-weather">
                {
                    loading ? (
                        <div className="spinner"></div>)
                        //if not loading
                        :
                        error ? <div>{error}</div>
                            // if no error
                            :
                            <>

                                <div className="user-weather-main info">
                                    <h3>Weather <img src={`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`} alt="icon"></img></h3>
                                    <div><strong>Description: </strong> {data.current.weather[0].description} </div>
                                    <div><strong>Temperature: </strong> {data.current.temp} &#8457; </div>
                                    <div><strong>Feels Like: </strong> {data.current.feels_like} &#8457; </div>
                                    <div><strong>Humidity: </strong> {data.current.humidity}%</div>
                                    <div><strong>Clouds: </strong> {data.current.clouds}%</div>
                                    <div><strong>Visibility: </strong> {data.current.visibility / 1000} km</div>
                                </div>

                                <div className="user-location-time info">
                                    <h3>Time and Location</h3>
                                    <br></br>
                                    <div>
                                        <strong>User Local Time: </strong>
                                        {new Date(Date.now() - new Date().getTimezoneOffset() * 60 * 1000).toUTCString("en-US")}
                                    </div>
                                    <div>
                                        <strong>Destination Local Time: </strong>
                                        {new Date(Date.now() + data.timezone_offset * 1000).toUTCString("en-US")}
                                    </div>
                                    <div><strong>Time Zone: </strong> {data.timezone}</div>
                                    <div><strong>longitude: </strong> {data.lon}</div>
                                    <div><strong>Latitude: </strong> {data.lat}</div>
                                </div>

                                <div className="user-weather-details info">
                                    <h3>Details</h3>
                                    <br></br>
                                    <div><strong>Sunrise: </strong> {new Date(data.current.sunrise * 1000).toLocaleTimeString("en-US")}</div>
                                    <div><strong>Sunset: </strong> {new Date(data.current.sunset * 1000).toLocaleTimeString("en-US")}</div>
                                    <div><strong>Midday UV Index: </strong> {data.current.uvi} {uvi(data.current.uvi)} </div>
                                    <div><strong>Dew Point: </strong> {data.current.dew_point} &#8457; </div>
                                    <div><strong>wind speed: </strong> {data.current.wind_speed} miles/hour</div>
                                    <div><strong>wind direction: </strong> {data.current.wind_deg}&deg; </div>
                                    <div><strong>Pressure: </strong> {data.current.pressure} hPa</div>
                                </div>

                            </>
                }
            </div>
        </div>
    )
}

export default HomeScreen