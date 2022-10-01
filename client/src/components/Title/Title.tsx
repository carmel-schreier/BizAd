import "./Title.css";
interface Props {
  text: string;
  children?: React.ReactNode;
}

function Title(props: Props) {
  return (
    <div className="title-section">
      <h1 className="text-center">{props.text}</h1>
      <h3>{props.children}</h3>
    </div>
  );
}

export default Title;
