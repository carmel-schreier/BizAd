import { Service } from "../../Services";
import { useNavigate } from "react-router-dom";
import "./UpdateForm.css";
import { useState } from "react";
import { patchRequest } from "../../../../services/apiService";

interface Props {
  service: Service;
}

function UpdateForm(prop: Props) {
  const navigate = useNavigate();

  const service = prop.service;
  const [status, setStatus] = useState<string>(service.status);
  const [comment, setComment] = useState<string | undefined>(service.comment);
  const [showErr, setShowErr] = useState(false);

  let otherStatus = service.status === "Active" ? "Disabled" : "Active";

  function isDisabled() {
    return service.status === status && service.comment === comment
      ? true
      : false;
  }
  function cancelUpdate() {
    navigate("/services");
  }

  function handleSubmit(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();

    const res = patchRequest(`user-services/${service?._id}`, {
      status,
      comment,
    });

    if (!res) {
      return;
    }

    res.then((res) => {
      if (res.ok) {
        navigate("/services");
      } else {
        setShowErr(true);
      }
    });
  }

  return (
    <>
      <form>
        <label>Change status:</label>
        <select
          className="form-control form-select mt-2"
          style={{ width: "15rem" }}
          name="status"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value={service.status}>{service.status}</option>
          <option value={otherStatus}>{otherStatus}</option>
        </select>
        <label className="comment">Update Comment:</label>
        <textarea
          name="comment"
          className="mb-3 mt-2 form-control textarea"
          style={{ width: "20rem" }}
          onChange={(e) => setComment(e.target.value)}
          defaultValue={service.comment ? service.comment : ""}
        ></textarea>
        {showErr && (
          <div className="text-danger pb-2" style={{ fontSize: "15px" }}>
            *Something went wrong. Please try again
          </div>
        )}
        <input
          type="submit"
          name="submit"
          className="btn btn-primary mt-4 me-3"
          onClick={handleSubmit}
          value="Update Service"
          disabled={isDisabled()}
        />
        <button
          className="btn btn-secondary mt-4"
          onClickCapture={cancelUpdate}
        >
          Cancel
        </button>
      </form>
    </>
  );
}

export default UpdateForm;

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
