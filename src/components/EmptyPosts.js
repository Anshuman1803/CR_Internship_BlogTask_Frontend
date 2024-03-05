import React from "react";
import { useNavigate } from "react-router-dom";

function EmptyPosts({ message }) {
  const navigateTo = useNavigate();

  const handleNavigateClick = (e) => {
    e.preventDefault();
    navigateTo("/user/dashboard/create-blog");
  };
  return (
    <div className="BlogApp__emptyPosts">
      <h1 className="emptyPosts__title">{message}</h1>
      <button
        className="emptyPosts__button BlogNavigationButton"
        onClick={handleNavigateClick}
      >
        Write blog
      </button>
    </div>
  );
}

export default EmptyPosts;
