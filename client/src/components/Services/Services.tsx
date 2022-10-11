import React from "react";
import { getToken } from "../../services/auth";
import Title from "../Title/Title";
//import Message from "./Message";
//import ControlBar from "./ControlBar";
import Table from "./Table";
//import "./Services.css";
//import "./ChooseForm.css";
import ChooseForm from "./ChooseForm/ChooseForm";

export type StatusType = "Active" | "Disabled";

export interface Service {
  name: string;
  status: StatusType;
  _id?: string;
}

interface ServicesState {
  services: Array<Service>;
  addedServices: Array<Service>;
  deleteSuccess: boolean;
}

class Services extends React.Component<{}, ServicesState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      services: [],
      addedServices: [],
      deleteSuccess: false,
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/services", {
      method: "get",
      headers: {
        "x-auth-token": getToken(),
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState(() => ({
          services: json,
        }));
      });
  }

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

  addService = (addedService: Service) => {
    const check = this.state.addedServices.filter(
      (x) => x.name === addedService.name
    );
    if (check.length === 0) this.state.addedServices.push(addedService);
    this.setState({
      addedServices: this.state.addedServices,
    });

    console.log(this.state.addedServices);
  };

  render() {
    return (
      <>
        <Title text="Services">
          <small>
            <h4>Choose the services you would like to use </h4>
          </small>
        </Title>

        <ChooseForm
          services={this.state.services}
          addService={this.addService}
        ></ChooseForm>

        <div className="bg-dark bg-opacity-10 border px-2">
          {this.state.addedServices.length === 0 && (
            <div className="alert alert-warning" role="alert">
              No services to display
            </div>
          )}

          <Table
            addedServices={this.state.addedServices}
            deleteService={this.deleteService}
          />
        </div>
      </>
    );
  }
}

export default Services;
