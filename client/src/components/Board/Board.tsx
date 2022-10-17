import React from "react";
import Ad, { AdType } from "../Ad/Ad";
import { getToken, verifyToken } from "../../services/auth";
import "./Board.css";
import Title from "../Title/Title";
import { getRequest } from "../../services/apiService";

type displayMode = "grid" | "list";
interface BoardProps {
  defaultDisplay: displayMode;
}

interface BoardState {
  display: displayMode;
  ads: Array<AdType>;
  filteredByName: Array<AdType>;
}

class Board extends React.Component<BoardProps, BoardState> {
  constructor(props: BoardProps) {
    super(props);

    this.state = {
      display: props.defaultDisplay,
      ads: [],
      filteredByName: [],
    };
  }

  componentDidMount() {
    const res = getRequest("ads/");
    if (!res) {
      return;
    }
    res
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState(() => ({
          ads: json,
          filteredByName: json,
        }));
      });
  }

  changeDisplay = (mode: displayMode) => {
    this.setState((state, props) => ({
      display: mode,
    }));
  };

  displaySearched = (newQuery: string) => {
    const filtered = this.searchAds(newQuery, [...this.state.ads]);
    this.setState((state, props) => ({
      filteredByName: filtered,
    }));
  };

  searchAds = (query: string, ads: Array<AdType>): Array<AdType> => {
    return ads.filter((ad) =>
      ad.name.toLowerCase().startsWith(query.toLowerCase())
    );
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
                onChange={(e) => this.displaySearched(e.target.value)}
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
          {this.state.filteredByName.map((ad) => (
            <Ad key={ad._id} data={ad} />
          ))}
        </div>
      </>
    );
  }
}

export default Board;
