import React, { Component } from 'react'
import "./Landing.css"

class Landing extends Component {

    render() {

        return (
            <main id="landing-main" className="jumbotron vertical-center">
                <div className="container">
                    <p>
                        Hello, I'm <span className="name">Andy Ni</span>.
                    </p>
                        
                    <p>
                        I'm a junior <span className="major">Computer Engineering</span> student at <span className="university">UT Austin</span>.
                    </p>

                    <a>Contact me</a>
                </div>
            </main>
        )
    }
}

export default Landing