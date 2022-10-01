import React from "react";
import Ad, { AdType } from "../Ad/Ad";
import { getToken, verifyToken } from "../../services/auth";
import "./Board.css";
import Title from "../Title/Title";

//import { Link } from "react-router-dom";
type displayMode = "grid" | "list";
interface BoardProps {
  defaultDisplay: displayMode;
}

interface BoardState {
  display: displayMode;
  ads: Array<AdType>;
}

class Board extends React.Component<BoardProps, BoardState> {
  constructor(props: BoardProps) {
    super(props);

    this.state = {
      display: props.defaultDisplay,
      ads: [],
      //filteredByCategory: [],
      //selectedCategory: 'all',
      //categories: ['all', 'chicken', 'vegeterian', 'asian']
    };
  }

  componentDidMount() {
    if (!verifyToken()) {
      return null;
    }
    fetch("http://localhost:3000/ads", {
      method: "get",
      headers: {
        "x-auth-token": getToken(),
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState(() => ({
          ads: json,
          //cardsDisplay: json,
        }));
      });
  }
  changeDisplay = (mode: displayMode) => {
    this.setState((state, props) => ({
      display: mode,
    }));
  };
  render() {
    return (
      <>
        <Title text="BizAd">
          <small className="d-block">
            <span>Advertize you business</span>
          </small>
        </Title>
        <div className="d-flex justify-content-between px-5">
          <div className="input-group mt-3">
            <button type="button" className="btn btn btn-primary">
              <i className="bi bi-search"></i>
            </button>
            <div className="form-outline">
              <input
                type="search"
                id="form1"
                className="form-control"
                placeholder="Search by business name"
              />
            </div>
          </div>

          <div className="d-flex">
            <button
              onClick={(e) => this.changeDisplay("list")}
              className="btn btn-default"
            >
              <i className="bi-list-ul"></i>
            </button>
            <button
              onClick={(e) => this.changeDisplay("grid")}
              className="btn btn-default"
            >
              <i className="bi-grid-3x3-gap-fill"></i>
            </button>
          </div>
        </div>

        <div className={this.state.display}>
          {this.state.ads.map((ad) => (
            <Ad key={ad._id} data={ad} />
          ))}
        </div>
      </>
    );
  }
}

export default Board;
