import React from "react";
import { Service } from "./Services";
import Status from "./Status";

interface Props {
  addedServices: Array<Service>;
  deleteService: Function;
}

function Table(props: Props) {
  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            <th className="w-25">Name</th>
            <th className="w-25">Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.addedServices.map((service) => (
            <tr key={props.addedServices.indexOf(service)} className="bg-light">
              <td>{service.name}</td>
              <td>
                <Status type={service.status} />
              </td>
              <td>
                <button
                  onClick={() => props.deleteService(service._id)}
                  className="btn btn-default"
                >
                  <i className="bi-trash3"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
