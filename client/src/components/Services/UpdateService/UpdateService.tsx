import React, { useEffect, useState } from "react";
import { ErrorMessage, Formik } from "formik";
import { useParams } from "react-router-dom";
import Title from "../../Title/Title";
import { Service } from "../Services";
import { getRequest } from "../../../services/apiService";
import UpdateForm from "./UpdateForm/UpdateForm";
import { getToken } from "../../../services/auth";

function UpdateService() {
  const { serviceName } = useParams();
  const [service, setService] = useState<Service>();

  useEffect(() => {
    fetch("http://localhost:3000/user-services", {
      method: "get",
      headers: {
        "x-auth-token": getToken(),
      },
    })
      .then((res) => res.json())
      .then((json) => {
        let service = json.services.filter(
          (x: Service) => x.name === serviceName
        );
        console.log(service);
        setService(service);
      });
  }, []);
  //
  return (
    <>
      <Title text="Update Services">
        <small>
          <h4>{serviceName} </h4>
        </small>
      </Title>
      {service && <UpdateForm service={service} />}
    </>
  );
}

export default UpdateService;
