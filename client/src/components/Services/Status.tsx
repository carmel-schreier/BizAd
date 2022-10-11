import { StatusType } from "./Services";

interface Props {
  type: StatusType;
}
function Status(props: Props) {
  function getBadgeCss() {
    switch (props.type) {
      case "Active":
        return "bg-success";
      case "Disabled":
        return "bg-warning";
      default:
        return "bg-success";
    }
  }
  return (
    <span className={`badge ${getBadgeCss()} text-capitalize`}>
      {props.type}
    </span>
  );
}

export default Status;
