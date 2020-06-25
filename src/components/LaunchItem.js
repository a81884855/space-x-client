import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

export default function ({
  launch: { flight_number, mission_name, launch_date_local, launch_success },
}) {
  return (
    <div
      className="card card-body mb-3"
      style={{
        background:
          launch_success === null
            ? "cornflowerblue"
            : launch_success === "true"
            ? "#28a745"
            : "#dc3545",
      }}
    >
      {console.log(launch_success)}
      <div className="row">
        <div className="col-md-9">
          <h4>
            <span>Mission:</span> <span>{mission_name}</span>{" "}
          </h4>
          <p>
            Date: <Moment format="YYYY-MM-DD HH:mm">{launch_date_local}</Moment>
          </p>
        </div>
        <div className="col-md-3">
          <Link to={`/launch/${flight_number}`} className="btn btn-secondary">
            Launch Details
          </Link>
        </div>
      </div>
    </div>
  );
}
