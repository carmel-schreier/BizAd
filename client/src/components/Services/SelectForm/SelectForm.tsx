import { useFormik } from "formik";
import { Service } from "../Services";
import Joi from "joi";
import "./SelectForm.css";

interface SelectProps {
  services: Array<Service>;
  addService: Function;
}

export interface IErrors {
  [key: string]: string;
}

function SelectForm(props: SelectProps) {
  const formik = useFormik({
    initialValues: {
      name: "",
      status: "",
    },

    // validate: (values) => {
    //   const errors: IErrors = {};
    //
    //   const schema = Joi.object().keys({
    //     name: Joi.string().required().min(2).not("Pleas select a service"),
    //     password: Joi.string().required().min(2).not("Define service status"),
    //   });
    //
    //   const { error } = schema.validate(values);
    //
    //   if (error) {
    //   }
    //
    //   return errors;
    // },

    onSubmit: (values) => {
      props.addService(values);
      formik.resetForm();
    },
  });

  function valid() {
    return formik.values.status === "" || formik.values.name == ""
      ? false
      : true;
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="d-flex  align-items-center   p-4"
    >
      <label className="pe-3">Service Name:</label>
      <select
        className="name-input form-select"
        value={formik.values.name}
        name="name"
        onChange={formik.handleChange}
      >
        <option value={""}>Pleas select a service</option>
        {props.services.map((service: Service) => (
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
        <option value={""}>Define service status</option>
        <option value={"Active"}>Active</option>
        <option value={"Disabled"}>Disabled</option>
      </select>
      <button
        type="submit"
        disabled={!valid()}
        className="btn btn-success ms-3"
      >
        Add Service
      </button>
    </form>
  );
}

export default SelectForm;
