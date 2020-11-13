import React from "react";
import {Image} from "react-bootstrap";
import inProgress from "../../theme/default/images/work-in-progress.png";

const InProgressPage = () => {

    return (
        <div className="d-flex py-5 justify-content-center">
            <Image src={inProgress}/>
        </div>
    );
}


export default InProgressPage;