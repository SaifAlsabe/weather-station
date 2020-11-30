import React from 'react';
import { useSelector } from 'react-redux';
import { HashLink as Link } from 'react-router-hash-link';
import './AlertsScreenStyle.css';

const AlertsScreen = () => {

    const { loading, error, data } = useSelector(state => state.weather);

    const timeConverter = (UNIX_timestamp) => {
        const s = new Date(UNIX_timestamp)
        const date = s.toLocaleDateString("en-US");
        const time = s.toLocaleTimeString("en-US");
        const final = `${date} ${time}`;
        return final;
    }

    return (
        <div className="main-alert" id="alerts">
            {//if loading
                loading ? <div></div> :
                    //alerts exist?
                    data.alerts ? (
                        <div className="alert-exist">
                            {/* alert title */}
                            <h1 className="alert-title">WARNING!</h1>
                            {/* alerts */}
                            {data.alerts.map(alert => (
                                <div className="alert-container">
                                    <h1>Event: {alert.event}</h1>
                                    <br></br>
                                    <h3>Sender: {alert.sender_name}</h3>
                                    <br></br>
                                    <p><strong>Starts:</strong> {timeConverter(alert.start * 1000)}</p>
                                    <br></br>
                                    <p><strong>Ends:</strong> {timeConverter(alert.end * 1000)}</p>
                                    <br></br>
                                    <p><strong>Description:</strong> {alert.description}</p>
                                </div>
                            ))}
                        </div>
                    )
                        :
                        <div className="no-alert">
                            <h1 className="no-alert-title">No Warnings</h1>
                        </div>
            }

            <div className="back"><Link to="#home" className="back-to-top"><strong>Back to top</strong></Link></div>

        </div>
    )
}

export default AlertsScreen;