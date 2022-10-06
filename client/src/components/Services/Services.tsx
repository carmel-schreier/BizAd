import React from "react";
import Header from "../Header/Header";
import Message from ".//Message";
import ControlBar from "./ControlBar";
import Table from "./Table";

export type StatusType = "active" | "disabled";

export interface Service {
  name: string;
  status: StatusType;
  _id?: string;
}
interface ServicesState {
  services: Array<Service>;
  //addSuccess: boolean;
  deleteSuccess: boolean;
}

//interface UsersProps {}

interface ServicesState {
  services: Array<Service>;
}

class Services extends React.Component<{}, ServicesState> {
  //[x: string]: Function;
  constructor(props: {}) {
    super(props);
    this.state = {
      services: [],
      //addSuccess: false,
      deleteSuccess: false,
    };
  }
  componentDidMount() {
    fetch("http://localhost:3000/services")
      .then((res) => res.json())
      .then((json) => {
        this.setState(() => ({
          services: json,
        }));
      });
  }

  addService = (service: Service) => {
    fetch("http://localhost:3000/services", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(service),
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState(() => ({
          services: [...this.state.services, json],
          //addSuccess: true,
        }));

        setTimeout(() => {
          this.setState(() => ({
            //addSuccess: false,
          }));
        }, 2000);
      });
  };

  deleteService = (id: string) => {
    fetch("http://localhost:3000/services", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    })
      .then((res) => res.json())
      .then((json) => {
        const updated = this.state.services.filter(
          (service) => service._id !== json._id
        );
        this.setState(() => ({
          services: updated,
          deleteSuccess: true,
        }));

        setTimeout(() => {
          this.setState(() => ({
            deleteSuccess: false,
          }));
        }, 2000);
      });
  };

  render() {
    return (
      <div className="bg-dark bg-opacity-10 border px-2">
        {/* <ControlBar addService={this.addService} /> */}
        {this.state.services.length === 0 && (
          <div className="alert alert-warning" role="alert">
            No services to display
          </div>
        )}
        {/* {this.state.addSuccess && ( */}
        {/* <Message type="success" children="New service was added" /> */}
        {/* )} */}
        {this.state.deleteSuccess && (
          <Message type="success" children="Service was deleted" />
        )}
        <Table users={this.state.services} deleteUser={this.deleteService} />
      </div>
    );
  }
}

export default Services;
