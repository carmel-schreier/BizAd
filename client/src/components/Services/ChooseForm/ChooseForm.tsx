//import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Service } from "../Services";
import "./ChooseForm.css";
//import { string } from "joi";

interface ChooseProps {
  services: Array<Service>;
  addService: Function;
}

function ChooseForm(chooseProps: ChooseProps) {
  const formik = useFormik({
    initialValues: {
      name: "",
      status: "Active",
    },

    onSubmit: (values) => {
      console.log(values);
      chooseProps.addService(values);
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="d-flex  align-items-center   p-4"
    >
      <label className="pe-3">Service Name:</label>
      <select
        className="name-input form-select text-capitalize"
        value={formik.values.name}
        name="name"
        onChange={formik.handleChange}
      >
        {chooseProps.services.map((service: Service) => (
          <option key={service._id}>{service.name}</option>
        ))}
      </select>
      <label className="pe-3 ms-4">Status:</label>
      <select
        className="status-input form-select text-capitalize"
        value={formik.values.status}
        name="status"
        onChange={formik.handleChange}
      >
        <option value={"Active"}>Active</option>
        <option value={"Disabled"}>Disabled</option>
      </select>
      <button type="submit" className="btn btn-success ms-3">
        Add Service
      </button>
    </form>
  );
}

export default ChooseForm;
