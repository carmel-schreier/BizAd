import React from "react";
import { getToken } from "../../services/auth";
import Title from "../Title/Title";
import Table from "./Table";
import SelectForm from "./SelectForm/SelectForm";
import { getRequest } from "../../services/apiService";

export type StatusType = "Active" | "Disabled";

export interface Service {
  name: string;
  status: StatusType;
  _id?: string;
  comment?: string;
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
    const res = getRequest("services/");
    if (!res) {
      return;
    }
    {
      res
        .then((res) => res.json())
        .then((json) => {
          this.setState(() => ({
            services: json,
          }));
          this.getServices();
        });
    }
  }

  addService = (addedService: Service) => {
    const check = this.state.addedServices.filter(
      (x) => x.name === addedService.name
    );
    if (check.length === 0) {
      const res = getRequest("user-services/");
      fetch("http://localhost:3000/user-services", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": getToken(),
        },
        body: JSON.stringify(addedService),
      })
        .then((res) => res.json())
        .then(() => {
          this.getServices();
        });
    }
  };

  getServices = () => {
    const res = getRequest("user-services/");
    if (!res) {
      return;
    }
    res
      .then((res) => res.json())
      .then((json) => {
        this.setState(() => ({
          addedServices: json.services,
        }));
      });
  };

  deleteService = (id: string) => {
    fetch("http://localhost:3000/user-services", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": getToken(),
      },
      body: JSON.stringify({ _id: id }),
    }).then((res) => res.json());
    this.getServices();
  };

  render() {
    return (
      <>
        <Title text="Services">
          <small>
            <h4>Choose the services you would like to use </h4>
          </small>
        </Title>

        <SelectForm
          services={this.state.services}
          addService={this.addService}
        ></SelectForm>

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
