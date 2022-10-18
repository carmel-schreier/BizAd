import React from "react";
import "./Ad.css";

export type AdType = {
  _id: string;
  adNumber: number;
  imageUrl: string;
  name: string;
  description: string;
  phone: string;
  address: string;
  url: string;
};

interface Props {
  data: AdType;
}

class Ad extends React.Component<Props> {
  render() {
    const { data } = this.props;
    return (
      <div className="card border-0 m-4 shadow " style={{ width: "20rem" }}>
        <img src={data.imageUrl} alt={data.name} className="card-img-top" />
        <div className="card-body">
          <span className="card-text number">{data.adNumber}</span>
          <h5 className="card-title mt-3">{data.name}</h5>
          <p className="card-text text-muted">{data.description}</p>
        </div>

        <ul className="list-group list-group-flush">
          <hr />
          <li className="list-group-item">
            <i className="bi-telephone me-2"></i>
            {data.phone}
          </li>
          <li className="list-group-item">
            <i className="bi-geo me-2"></i>
            {data.address}
          </li>
        </ul>
        <hr />
        <div className="card-body">
          <a href={data.url} target="_blank" className="btn btn-primary">
            Visit Website
          </a>
        </div>
      </div>
    );
  }
}

export default Ad;
