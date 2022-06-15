import React from "react";
import { Link } from "react-router-dom";
import "./Posts.scss";
import postsImg from "../../../../../assets/icons/instructor.png";
const Posts = () => {
  return (
    <div>
      <div className="post-card">
        <div className="post-card__header">
          <div className="post-card__header--desc">
            <img
              className="post-card__header-img"
              src={postsImg}
              alt="posts users"
            />
            <h3 className="post-card__header-heading">Dimi</h3>
            <button className="post-card__header-btn">Folgen</button>
          </div>
          <div className="">
            <p className="post-card__header-title">Vor einer Stunde</p>
          </div>
        </div>
        <div className="post-card__body">
          <h2 className="post-card__body-heading">Suche Band in Hamburg</h2>
          <Link>
            <a href="#">
              <button className="post-card__body-btn">Bundsuche</button>
            </a>
          </Link>
          <p className="post-card__body-desc">
            Suche Schlafplatz in HamburgSuche Schlafplatz in HamburgSuche
            Schlafplatz in HamburgSuch
          </p>
        </div>
      </div>
    </div>
  );
};

export default Posts;
