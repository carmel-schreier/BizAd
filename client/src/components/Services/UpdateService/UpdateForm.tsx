import { Service } from "../Services";
import { ErrorMessage, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { patchRequest } from "../../services/apiService";

interface Props {
  service: Service;
}

function UpdateForm(prop: Props) {
  return <div>update form {prop.service}</div>;
}

export default UpdateForm;
