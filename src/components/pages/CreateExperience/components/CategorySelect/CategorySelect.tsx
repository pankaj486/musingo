import React, { useState } from "react";

import WeiterCta from "../../../../weiterCta/weiterCta";
import GroupImage from "../../../../../assets/images/group.png";
import SingleImage from "../../../../../assets/images/single.png";

import "./CategorySelect.scss";

export enum LessonCategory {
  SingleLesson,
  GroupLesson,
}

export type CategorySelectProps = {
  onSubmit: (category: LessonCategory) => void;
};

const CategorySelect: React.FC<CategorySelectProps> = ({ onSubmit }) => {
  const [selectedCategory, setSelectedCategory] = useState<LessonCategory>();

  const handleSubmit = () => {
    if (selectedCategory !== undefined) {
      onSubmit(selectedCategory);
    }
  };

  return (
    <div className="classes--category-select">
      <h1 className="category-select-title">
        Welche Art Experience möchtest du <br /> erstellen?{" "}
      </h1>
      <div className="category-select__categories">
        <div
          className={
            "category-group " +
            (selectedCategory === LessonCategory.GroupLesson
              ? "category-active"
              : "")
          }
          onClick={() => {
            setSelectedCategory(LessonCategory.GroupLesson);
          }}
        >
          <img className="category-image" src={GroupImage} alt="group" />
          <span className="category-name">Gruppe</span>
          <span className="category-name-des">Unterrichte eine Gruppe</span>
        </div>
        <div
          className={
            "category-single " +
            (selectedCategory === LessonCategory.SingleLesson
              ? "category-active"
              : "")
          }
          onClick={() => {
            setSelectedCategory(LessonCategory.SingleLesson);
          }}
        >
          <img className="category-image" src={SingleImage} alt="group" />
          <span className="category-name">Einzel</span>
          <span className="category-name-des">Unterrichte einen Schüler</span>
        </div>
      </div>
      <WeiterCta
        nextStep={handleSubmit}
        background={selectedCategory === undefined ? "rgb(214, 213, 213)" : ""}
      />
    </div>
  );
};

export default CategorySelect;
