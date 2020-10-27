import React, {Component} from "react";
import {Link} from 'react-router-dom';

class Footer extends Component {

    render() {
        return (
            <div className="bg-dark py-5 mt-auto">
                <div className="w-75 mx-auto p-2 text-center text-light">
                    This is my footer
                </div>
            </div>

        );
    }
}

export default Footer;
