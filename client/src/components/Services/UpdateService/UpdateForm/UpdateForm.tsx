import { Service } from "../../Services";
import { ErrorMessage, Formik, Field } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { IErrors } from "../../../auth/Login";
import { patchRequest } from "../../../../services/apiService";
import "./UpdateForm.css";

interface Props {
  service: Service;
}

function UpdateForm(prop: Props) {
  const service = prop.service;
  const navigate = useNavigate();
  const [errMsg, setErrorMsg] = useState<string>("");

  function handleSubmit(values: Service) {
    const res = patchRequest(`user-services/${service._id}`, values);

    if (!res) {
      return;
    }

    res.then((res) => {
      if (res.ok) {
        navigate("/services");
        setErrorMsg("");
      } else {
        setErrorMsg("something went wrong");
      }
    });
  }

  function validate(values: Service): IErrors {
    const errors: IErrors = {};

    if (values.name.length < 2) {
      errors.name = "invalid name";
    }
    if (!values.status) {
      errors.price = "invalid status";
    }
    if (values.comment && values.comment.length > 225) {
      errors.price = "invalid note";
    }

    return errors;
  }

  return (
    <>
      {errMsg.length > 0 && <div className="alert alert-danger">{errMsg}</div>}

      <Formik
        initialValues={service}
        validate={validate}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          setValues,
          isSubmitting,
          dirty,
          isValid,
          errors,
        }) => (
          <form onSubmit={handleSubmit}>
            <label>Status:</label>
            <Field
              as="select"
              className="form-control form-select mt-2"
              style={{ width: "15rem" }}
            >
              <option value={"Active"}>Active</option>
              <option value={"Disabled"}>Disabled</option>
            </Field>

            {errors.name ? (
              <div className="text-danger">{errors.name}</div>
            ) : null}

            <label className="comment">Comment:</label>
            <Field
              as="textarea"
              id="comment"
              name="comment"
              className="mb-3 mt-2 form-control textarea"
              style={{ width: "20rem" }}
            ></Field>

            {errors.comment ? (
              <div className="text-danger">{errors.comment}</div>
            ) : null}
            <input
              value="Update Service"
              type="submit"
              className="btn btn-primary mt-4 me-3"
              disabled={!(dirty && isValid) || isSubmitting}
            />
            <input value="Cancel" type="" className="btn btn-secondary mt-4" />
          </form>
        )}
      </Formik>
    </>
  );
}

export default UpdateForm;

//<form onSubmit={handleSubmit}>
//            <div className="mb-3">
//              <select
//                className="form-control"
//                name="status"
//                value={values.status}
//                onChange={handleChange}
//              />
//              <option value={"Active"}>Active</option>
//              <option value={"Disabled"}>Disabled</option>
//            </div>
//
//            {errors.name ? (
//              <div className="text-danger">{errors.name}</div>
//            ) : null}
//
//            <div className="mb-3">
//              <textarea
//                className="form-control"
//                name="note"
//                value=""
//                onChange={handleChange}
//              />
//            </div>
//            {errors.note ? (
//              <div className="text-danger">{errors.note}</div>
//            ) : null}
//            <input
//              value="Update"
//              type="submit"
//              className="btn btn-primary"
//              disabled={!(dirty && isValid) || isSubmitting}
//            />
//          </form>
//        )}
//      </Formik>
//
