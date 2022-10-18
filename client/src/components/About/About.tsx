import Title from "../Title/Title";
import { useNavigate } from "react-router-dom";
import "./About.css";

function About() {
  const navigate = useNavigate();
  function goToHome() {
    navigate("/");
  }
  return (
    <>
      <Title text="About This App">
        <small className="d-block">
          <span>What makes BizAd the #1 app for advertizing businesses </span>
        </small>
      </Title>
      <div className="about">
        <p className="aboutText">
          Every day hundreds of thousands of business owners worldwide choose
          BizAd as their go to advertisement App. <br /> Our services insure
          greater traction and visibility for countless websites and online
          stores.{" "}
        </p>
        <button onClick={goToHome} className="btn btn-primary mt-4">
          Start today
        </button>
      </div>
    </>
  );
}

export default About;
