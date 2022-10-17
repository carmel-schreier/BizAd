import { Service } from "../../Services";
import { ErrorMessage, Formik, Field, Form } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { IErrors } from "../../../auth/Login";
import { patchRequest } from "../../../../services/apiService";
import "./UpdateForm.css";
import Status from "../../Status";

interface Props {
  service: Service;
}

function UpdateForm(prop: Props) {
  const service = prop.service;
  const currentStatus = service.status;
  let otherStatus = service.status == "Active" ? "Disabled" : "Active";
  console.log(otherStatus);
  const navigate = useNavigate();
  const [errMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(values: Service) {
    console.log(values);
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

    if (!values.status) {
      errors.status = "invalid status";
    }
    if (
      (values.comment && values.comment.length > 225) ||
      typeof values.comment !== "string"
    ) {
      errors.price = "invalid note";
    }

    return errors;
  }

  function cancelUpdate() {
    navigate("/services");
  }

  return (
    <>
      {errMsg.length > 0 && <div className="alert alert-danger">{errMsg}</div>}

      <Formik
        initialValues={service}
        validate={validate}
        onSubmit={(values) => handleSubmit(values)}
        //onChange={(values) => handleChange(values)}
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
          <Form onSubmit={handleSubmit}>
            <label>Update status:</label>
            <Field
              component="select"
              className="form-control form-select mt-2"
              style={{ width: "15rem" }}
              name="status"
              type="text"
              // multiple={true}
            >
              <option value="">Update status</option>
              <option value="Active">Active</option>
              <option value="Disabled">Disabled</option>
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
            <button
              type="submit"
              className="btn btn-primary mt-4 me-3"
              disabled={isSubmitting}
            >
              Update Service
            </button>
            <button
              className="btn btn-secondary mt-4"
              onClickCapture={cancelUpdate}
            >
              Cancel
            </button>
          </Form>
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
