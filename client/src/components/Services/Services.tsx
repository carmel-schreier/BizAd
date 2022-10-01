import React from "react";
import Title from "../Title/Title";
interface ServicesProps {}

interface ServicesState {}

class Services extends React.Component<ServicesProps, ServicesState> {
  //state = { :  }
  render() {
    return (
      <>
        <Title text="Services">
          <small>
            <h4>Choose the services you would like to use </h4>
          </small>
        </Title>
        <div>Services</div>
      </>
    );
  }
}

export default Services;
