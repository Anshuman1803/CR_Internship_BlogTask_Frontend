import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import modules from "../../utils/EditiorModule";
import axios from "axios";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
function UpdateBlog() {
  const { state } = useLocation();
  const navigateTo = useNavigate();
  const titleRef = useRef();
  const posterRef = useRef();
  const categoryRef = useRef();
  const [isLoading, setLoading] = useState(false);
  const [summary, setsummary] = useState(state.blogDesc);

  const [errorState, setError] = useState({
    titleError: false,
    categoryError: false,
    posterError: false,
    summaryError: false,
  });

  const [blogDetails, SetblogDetails] = useState({
    blogPoster: state.blogPoster,
    blogTitle: state.blogTitle,
    blogCategory: state.blogCategory,
  });

  const handleOnchangeEvent = (e) => {
    setError({
      titleError: false,
      categoryError: false,
      posterError: false,
      summaryError: false,
    });
    if (e.target.value.includes(" ") && e.target.name !== "blogTitle") {
      e.target.value = e.target.value.replaceAll(" ", "");
    }
    SetblogDetails({ ...blogDetails, [e.target.name]: e.target.value });
  };

  const handleBackClick = (e) => {
    e.preventDefault();
    navigateTo("/user/dashboard/my-blogs");
  };

  const handleBlogUpdate = (e) => {
    e.preventDefault();
    blogDetails.blogDesc = summary;
    blogDetails._id = state._id;
    setLoading(true)
    axios
    .post("https://cr-internship-blogtask-backend.onrender.com/api/blog/update-blog", blogDetails)
    .then((response) => {
      if (response.data.msg === "Blog update successfull") {
        toast.success("Blog update successfull");
        navigateTo(`/blogs/blog/${state._id}`)
        setLoading(false)
      } else {
        toast.error("Blog update faild! Try again");
        setLoading(false)
      }
    })
    .catch((err) => {
      toast.error("Something went wrong! Try again later");
      setLoading(false)
      });
  };
  return (
    <section className="Dashboard__section DashboardSection__createBlog">
      {isLoading && <Loader />}
      <form className="CreateBlogPost__form">
        <div className="BlogPost__formITemBox">
          <label htmlFor="title">Blog title</label>
          {errorState.titleError && (
            <span className="BlogPost__requireError">*Required</span>
          )}
          <input
            type="text"
            name="blogTitle"
            id="title"
            className={`UserForm__Item ${
              errorState.titleError && "UserForm__ErrorStateITEM"
            }`}
            placeholder="Enter blog title"
            onChange={handleOnchangeEvent}
            value={blogDetails.blogTitle}
            ref={titleRef}
          />
        </div>

        <div className="BlogPost__formITemBox">
          <label htmlFor="category">Blog category</label>
          {errorState.categoryError && (
            <span className="BlogPost__requireError">*Required</span>
          )}
          <input
            type="text"
            name="blogCategory"
            id="category"
            className={`UserForm__Item ${
              errorState.categoryError && "UserForm__ErrorStateITEM"
            }`}
            placeholder="Enter blog category"
            onChange={handleOnchangeEvent}
            value={blogDetails.blogCategory}
            ref={categoryRef}
          />
        </div>
        <div className="BlogPost__formITemBox">
          <label htmlFor="poster">Blog Image</label>
          {errorState.posterError && (
            <span className="BlogPost__requireError">*Required</span>
          )}
          <input
            type="text"
            name="blogPoster"
            id="poster"
            className={`UserForm__Item ${
              errorState.posterError && "UserForm__ErrorStateITEM"
            }`}
            placeholder="Enter image link"
            onChange={handleOnchangeEvent}
            value={blogDetails.blogPoster}
            ref={posterRef}
          />
        </div>

        <div className="BlogPost__editiorContainer">
          {errorState.summaryError && (
            <span className="BlogPost__requireError">*Required</span>
          )}
          <ReactQuill
            value={summary}
            theme={"snow"}
            modules={modules}
            className="CreateBlogPost__editor"
            onChange={(newvalue) => setsummary(newvalue)}
          />
        </div>

        <div className="BlogPost__formButtonContainer updatePost__buttoncontainer">
          <button className="BlogPost__publishButton" onClick={handleBackClick}>
            Back
          </button>
          <button
            className="BlogPost__publishButton"
            onClick={handleBlogUpdate}
          >
            Update
          </button>
        </div>
      </form>
    </section>
  );
}

export default UpdateBlog;
