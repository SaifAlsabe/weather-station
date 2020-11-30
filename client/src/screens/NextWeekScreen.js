import React, { useEffect } from 'react';
import './NextWeekScreenStyle.css';
import { useSelector } from 'react-redux';


const NextWeekScreen = () => {

    const { loading, error, data } = useSelector(state => state.weather)

    let isDown = false;
    let startX;
    let scrollLeft;

    useEffect(() => {
        if (data) {

            const slider = document.querySelector('.slider');

            slider.addEventListener('mousedown', (e) => {
                isDown = true;
                slider.classList.add('active');
                startX = e.pageX - slider.offsetLeft;
                scrollLeft = slider.scrollLeft;
            })

            slider.addEventListener('mouseleave', () => {
                isDown = false;
                slider.classList.remove('active');

            })

            slider.addEventListener('mouseup', () => {
                isDown = false;
                slider.classList.remove('active')

            })

            slider.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - slider.offsetLeft;
                const walk = (x - startX) * 2;
                slider.scrollLeft = scrollLeft - walk
            })
        }

    }, [data])



    return (
        loading ? <div></div> :
                <div className="main-next-week" id="week">

                    <h2>Next Week Forecast</h2>

                    <div className="slider">
                        {data.daily.map(day => (
                            <ul className="card">
                                <li> <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="icon"></img></li>
                                <li>{new Date(day.dt * 1000).toLocaleDateString()}</li>
                                <li>{day.weather[0].description}</li>
                                <li><strong>Max:</strong> {day.temp.max} &#8457;</li>
                                <li><strong>Min:</strong> {day.temp.min} &#8457;</li>
                                <li><strong>Humidity:</strong> {day.humidity}%</li>
                            </ul>
                        ))}
                        {/* fix scrolling problem */}
                        <div>&nbsp;</div>
                    </div>

                </div>

    )
}

export default NextWeekScreen