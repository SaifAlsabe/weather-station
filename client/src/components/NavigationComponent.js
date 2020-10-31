import React, { useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import gsap from 'gsap';

function NavigationComponent() {


    useEffect(() => {
        gsap.from(".nav-list",{ duration: 1.2, ease: "circ.in", opacity: 0 });
    }, [])

    return (
        <nav className="nav">
            <ul className="nav-list">
                <li className="header-link"><Link to="/#home">CURRENT</Link></li>
                <li className="header-link"><Link to="/#days">NEXT 2 DAYS</Link></li>
                <li className="header-link"><Link to="/#week">NEXT WEEK</Link></li>
                <li className="header-link"><Link to="/#alerts">ALERTS</Link></li>
            </ul>
        </nav>
    )

}

export default NavigationComponent;