import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import LaunchItem from "./LaunchItem";
import MissionKey from "./MissionKey";

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

export class Launches extends Component {
  render() {
    return (
      <>
        <h1 className="display-4 my-3">Launches</h1>
        <MissionKey />
        <Query query={LAUNCHES_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error)
              return <h2 style={{ marginTop: 40 }}>Can't fetch the data</h2>;
            return (
              <>
                {data.launches.map(launch => (
                  <LaunchItem key={launch.mission_name} launch={launch} />
                ))}
              </>
            );
          }}
        </Query>
      </>
    );
  }
}

export default Launches;