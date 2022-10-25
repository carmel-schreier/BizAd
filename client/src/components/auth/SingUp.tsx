import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../Title/Title";
import Joi from "joi";
import { useFormik } from "formik";
import { postRequest } from "../../services/apiService";
import { TOKEN_KEY } from "../../services/auth";

export interface IErrors {
  [key: string]: string;
}

function Login() {
  const [noMatch, setNoMatch] = useState(false);
  const [serverMassage, setServerMassage] = useState(false);
  const [massage, setMassage] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordConf: "",
    },

    validate: (values) => {
      const errors: IErrors = {};

      const schema = Joi.object().keys({
        name: Joi.string().required().min(2).max(256),
        email: Joi.string().required().min(6).max(256),
        password: Joi.string().required().min(6).max(1024),
        passwordConf: Joi.string().required(),
      });

      const { error } = schema.validate(values);

      if (error) {
        error.details.forEach((item) => {
          if (item.context) {
            const key = item.context.key + "";
            errors[key] = item.message;
          }
        });
      }

      return errors;
    },

    onSubmit: (values) => {
      if (values.password !== values.passwordConf) {
        setNoMatch(true);
        return;
      }

      const data = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      postRequest("users/signup", data).then((res) => {
        if (res.ok) navigate("/login");
        else
          res.json().then((json) => {
            setServerMassage(true);
            setMassage(json.error);
          });
      });
    },
  });
  function resetMassage() {
    setServerMassage(false);
    setNoMatch(false);
  }

  return (
    <>
      <Title text="Sign Up" />
      <form
        onSubmit={formik.handleSubmit}
        className="p-3 form-max-w m-auto d-block col-xs-12 col-md-4 offset-md-4"
      >
        <div className="mb-3">
          <input
            ref={inputRef}
            className="form-control"
            type="text"
            placeholder="Name"
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
            onFocus={resetMassage}
          />
        </div>
        {formik.touched.name && formik.errors.name ? (
          <div className="text-danger pb-2">{formik.errors.name}</div>
        ) : null}
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            placeholder="Email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onFocus={resetMassage}
          />
        </div>
        {formik.touched.email && formik.errors.email ? (
          <div className="text-danger pb-2">{formik.errors.email}</div>
        ) : null}

        <div className="mb-3">
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onFocus={resetMassage}
          />
        </div>
        {formik.touched.password && formik.errors.password ? (
          <div className="text-danger pb-2" style={{ fontSize: "13px" }}>
            {formik.errors.password}
          </div>
        ) : null}

        <div className="mb-3">
          <input
            className="form-control"
            type="password"
            placeholder="Confirm password"
            id="passwordConf"
            name="passwordConf"
            onChange={formik.handleChange}
            value={formik.values.passwordConf}
            onBlur={formik.handleBlur}
            onFocus={resetMassage}
          />
        </div>
        {noMatch && (
          <div className="text-danger pb-2" style={{ fontSize: "13px" }}>
            Confirmed password doesn't match
          </div>
        )}

        <button type="submit" className="btn btn-primary btn-lg w-100">
          Login
        </button>
        {serverMassage && (
          <div className="text-danger pb-2" style={{ fontSize: "15px" }}>
            {massage}
          </div>
        )}
      </form>
    </>
  );
}

export default Login;
