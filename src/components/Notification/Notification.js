import React from "react";
import "./Notification.css";

const Notification = () => {
  return (
    <div>
      <div className="Notifi-container">
        <div className="Notifi-inner-container flexbox">
          <div className="imgcontainer">
            <img src="/notification.png" alt="img not found" />
          </div>
          <div className="containtent-container flexcol">
            <div className="timeline-title">
              <h5>
                <b> Upcoming Draw </b>
              </h5>
            </div>
            {/* <div className="timeline-value flexbox">
            <h6> 12-13-2021</h6> <h6> 06:56 PM</h6>
          </div> */}
          </div>
        </div>
      </div>
      <div className="table-timeline">
        <div className=" title flexbox">
          <h5>Date</h5>
          <h5>Time</h5>
        </div>
        <div className="tablebody flexbox">
          <h5>12-3-2021</h5>
          <h5>10: 06 PM</h5>
        </div>
      </div>
    </div>
  );
};

export default Notification;
