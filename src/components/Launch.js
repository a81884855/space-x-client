import React, { useEffect } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Moment from "react-moment";
import { Image, Button } from "react-bootstrap";

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_success
      launch_date_local
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
      links {
        mission_patch
        reddit_campaign
        article_link
      }
    }
  }
`;

const Launch = (props) => {
  let { flight_number } = props.match.params;
  flight_number = parseInt(flight_number);

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    return () => {
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <>
      <Query query={LAUNCH_QUERY} variables={{ flight_number }}>
        {({ loading, error, data }) => {
          if (loading) return <h4>Loading</h4>;
          if (error) return <div>Sorry! Can't fetch the data</div>;

          const {
            mission_name,
            flight_number,
            launch_success,
            launch_date_local,
            rocket: { rocket_id, rocket_name, rocket_type },
            links: { mission_patch, reddit_campaign, article_link },
          } = data.launch;

          return (
            <div>
              <Link to="/" className="btn btn-secondary">
                Back
              </Link>
              <h1 className="display-4 my-3">
                <span
                  className={classNames({
                    "text-planing": launch_success === null,
                    "text-success": launch_success === true,
                    "text-danger": launch_success === false,
                  })}
                >
                  Mission:
                </span>
                {mission_name}
              </h1>
              <Image
                style={{ width: 300, margin: "0 auto", display: "block" }}
                src={mission_patch}
              />
              <h4 className="mb-3">Launch Details</h4>
              <ul className="list-group">
                <li className="list-group-item">
                  Flight Number: {flight_number}
                </li>
                <li className="list-group-item">
                  Launch Date:{" "}
                  <Moment format="YYYY-MM-DD HH:mm">{launch_date_local}</Moment>
                </li>
                <li className="list-group-item">
                  Launch Successful:{" "}
                  <span
                    className={classNames({
                      "text-planing": launch_success === null,
                      "text-success": launch_success === true,
                      "text-danger": launch_success === false,
                    })}
                  >
                    {launch_success === null
                      ? "Unknown"
                      : launch_success
                      ? "Yes"
                      : "No"}
                  </span>
                </li>
              </ul>
              <h4 className="my-3">Rocket Details</h4>
              <ul className="list-group">
                <li className="list-group-item">Rocket ID: {rocket_id}</li>
                <li className="list-group-item">Rocket Name: {rocket_name}</li>
                <li className="list-group-item">Rocket Type: {rocket_type}</li>
              </ul>
              <h4 className="my-3">More Information</h4>
              <Button
                className="mr-3"
                variant="success"
                href={reddit_campaign}
                target="_blank"
              >
                Reddit Campagin
              </Button>
              <Button variant="success" href={article_link} target="_blank">
                Article link
              </Button>
              <hr />
            </div>
          );
        }}
      </Query>
    </>
  );
};

export default Launch;
