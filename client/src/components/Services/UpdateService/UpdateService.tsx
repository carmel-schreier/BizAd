import React, { useEffect, useState } from "react";
import { ErrorMessage, Formik } from "formik";
import { useParams } from "react-router-dom";
import Title from "../../Title/Title";
import { Service } from "../Services";
import { getRequest } from "../../../services/apiService";
import UpdateForm from "./UpdateForm";

function UpdateService() {
  const { serviceName } = useParams();
  const [service, setService] = useState<Service>();

  useEffect(() => {
    const res = getRequest(`user-services/${serviceName}`);
    if (!res) {
      return;
    }

    res
      .then((res) => res.json())
      .then((service) => {
        setService(service);
        //setName(card.name);
      });
  }, [serviceName]);

  return (
    <>
      <Title text="Update Services">
        <small>
          <h4>{serviceName} </h4>
        </small>
      </Title>
      <UpdateForm service={service} />;
    </>
  );
}

export default UpdateService;
