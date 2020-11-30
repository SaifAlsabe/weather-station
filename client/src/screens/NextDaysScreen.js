import React, { useEffect, useState } from 'react'
import './NextDaysScreenStyle.css';
import Chart from 'chart.js'
import { useSelector } from 'react-redux';


const NextDaysScreen = () => {

    const { loading, error, data } = useSelector(state => state.weather);
    const [chart, setChart] = useState()

    const timeConverter = (UNIX_timestamp) => {
        const s = new Date(UNIX_timestamp)
        const date = s.toLocaleDateString("en-US");
        const time = s.toLocaleTimeString("en-US");
        const final = `${date}\n${time}`;
        return final;
    }

    useEffect(() => {

        if (data) {

            //get data for chart
            const labels = data.hourly.map(day => timeConverter(day.dt * 1000))
            const temp = data.hourly.map(day => day.temp)
            const feelsLike = data.hourly.map(day => day.feels_like)
            const humidity = data.hourly.map(day => day.humidity)
            const clouds = data.hourly.map(day => day.clouds)
            const description = data.hourly.map(day => day.weather[0].description)

            //get canvas to draw chart
            const ctx = document.getElementById('myChart').getContext("2d");

            //prevent mutiple charts on same canvas
            if (chart) {
                chart.destroy();
            }

            //create chart
            setChart(new Chart(ctx, {
                // The type of chart we want to create
                type: 'bar',

                // The data for our dataset
                data: {
                    labels: labels,
                    datasets: [{
                        backgroundColor: 'rgb(255, 165, 0)',
                        data: temp
                    }]
                },

                // Configuration options go here
                options: {
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                        text: 'Next 48 Hours Forecast'
                    },
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Temperature F'
                            }
                        }]
                    },
                    tooltips: {
                        enabled: true,
                        mode: 'single',
                        callbacks: {
                            label: function (tooltipItems, data) {
                                const show = [`Description: ${description[tooltipItems.index]}`,
                                `temperature: ${tooltipItems.yLabel} F`,
                                `Feels Like: ${feelsLike[tooltipItems.index]} F`,
                                `Humidity: ${humidity[tooltipItems.index]}%`,
                                `Clouds: ${clouds[tooltipItems.index]}%`]
                                return show;
                            }
                        },
                        custom: function (tooltip) {
                            if (!tooltip) return;
                            // disable displaying the color box;
                            tooltip.displayColors = false;
                        },

                    },
                    layout: {
                        padding: {
                            left: 0,
                            right: 30,
                            top: 0,
                            bottom: 30
                        }
                    }



                }
            }));

        }

    }, [data])

    return (
        loading ? <></> :
                <div className="main-next-days" id="days">

                    <div className="main-next-days-container">
                        <canvas id='myChart'></canvas>
                    </div>

                </div>
    )
}

export default NextDaysScreen