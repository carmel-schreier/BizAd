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
  let valid = true;

  const formik = useFormik({
    initialValues: {
      name: "",
      status: "",
    },

    validate: (values) => {
      const errors: IErrors = {};

      const schema = Joi.object().keys({
        name: Joi.string().required().min(2).not("Pleas select a service"),
        password: Joi.string().required().min(2).not("Define service status"),
      });

      const { error } = schema.validate(values);

      if (error) {
        valid = false;
      }

      return errors;
    },

    onSubmit: (values) => {
      console.log(values);
      props.addService(values);
    },
  });

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
        <option>Pleas select a service</option>
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
        <option>Define service status</option>
        <option value={"Active"}>Active</option>
        <option value={"Disabled"}>Disabled</option>
      </select>
      <button
        type="submit"
        disabled={!(valid && formik.dirty)}
        className="btn btn-success ms-3"
      >
        Add Service
      </button>
    </form>
  );
}

export default SelectForm;
