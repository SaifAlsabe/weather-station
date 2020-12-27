import React from 'react'

const FooterComponent = () => {
    return (

        <footer className="footer">
            <div>
                <h3>About Us</h3>
                <br></br>
                <p>We provide daily and weekly detailed weather forecast. Headquarters in Virginia, US.</p>
            </div>

            <div>
                <h3>Information</h3>
                <br></br>
                <ul>
                    <li>About Us</li>
                    <li>More Search</li>
                    <li>Blog</li>
                    <li>Events</li>
                </ul>
            </div>

            <div>
                <h3>Helpful Links</h3>
                <br></br>
                <ul>
                    <li>Services</li>
                    <li>Support</li>
                    <li>Terms and Conditions</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            <div><b>Copyright &copy; 2020. All rights reserved</b></div>
        </footer>
    )
}

export default FooterComponent