import React from "react";
import Title from "../Title/Title";
import { Service } from "./Services";
import Status from "./Status";

interface Props {
  users: Array<Service>;
  deleteUser: Function;
}

function Table(props: Props) {
  return (
    <>
      <Title text="Services">
        <small>
          <h4>Choose the services you would like to use </h4>
        </small>
      </Title>
      <table className="table table-hover">
        <thead>
          <tr>
            <th className="w-25">Full Name</th>
            <th className="w-25">Status</th>
            <th className="w-50">Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user) => (
            <tr key={user._id} className="bg-light">
              <td>{user.fullName}</td>
              <td>
                <Status type={user.status} />
              </td>
              <td>{user.email}</td>
              <td>
                <button
                  onClick={() => props.deleteUser(user._id)}
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
