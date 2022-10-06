interface Props {
  type: "warning" | "info" | "danger" | "success";
  children?: React.ReactNode;
}
function Message(props: Props) {
  function getAlertCss() {
    switch (props.type) {
      case "warning":
        return "alert-warning";
      case "info":
        return "alert-info";
      case "danger":
        return "alert-danger";
      case "success":
        return "alert-success";
      default:
        return "alert-secondary";
    }
  }

  return (
    <div className={`alert ${getAlertCss()}`} role="alert">
      {props.children}
    </div>
  );
}

export default Message;
