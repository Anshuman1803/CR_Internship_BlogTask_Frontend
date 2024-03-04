import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import modules from "../../utils/EditiorModule";
import axios from "axios";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
function CreateBlog() {
  const { currentUser } = useSelector((state) => state.BlogApp);
  const titleRef = useRef();
  const posterRef = useRef();
  const categoryRef = useRef();
  const [summary, setsummary] = useState("");
  const [isLoading, setLoading] = useState(false);

  const [blogDetails, SetblogDetails] = useState({
    blogPoster: "",
    blogTitle: "",
    blogCategory: "",
    blogComments: 0,
    blogLikes: 0,
  });

  const [errorState, setError] = useState({
    titleError: false,
    categoryError: false,
    posterError: false,
    summaryError: false,
  });

  const clearFields = () => {
    SetblogDetails({
      blogPoster: "",
      blogTitle: "",
      blogCategory: "",
      blogComments: 0,
      blogLikes: 0,
    });
  };

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

  const handlePublishBlog = (e) => {
    e.preventDefault();

    blogDetails.blogDesc = summary;
    blogDetails.blogAuthor = currentUser.userEmail;
    blogDetails.blogDate = Date.now();
    SetblogDetails(blogDetails);

    if (blogDetails.blogTitle === "") {
      setError({
        titleError: true,
        categoryError: false,
        posterError: false,
        summaryError: false,
      });
      titleRef.current.focus();
    } else if (blogDetails.blogCategory === "") {
      setError({
        titleError: false,
        categoryError: true,
        posterError: false,
        summaryError: false,
      });
      categoryRef.current.focus();
    } else if (blogDetails.blogPoster === "") {
      setError({
        titleError: false,
        categoryError: false,
        posterError: true,
        summaryError: false,
        errMsg: "Invalid image link",
      });
      posterRef.current.focus();
    } else if (blogDetails.blogDesc === "") {
      setError({
        titleError: false,
        categoryError: false,
        posterError: false,
        summaryError: true,
      });
    } else {
      setLoading(true);
      axios
        .post("http://localhost:5000/api/blog/create-blog", blogDetails)
        .then((response) => {
          if (response.data.msg === "Blog creation successfull") {
            toast.success("Successfully created");
            clearFields();
            titleRef.current.focus();
            setLoading(false);
          } else {
            toast.error("something went wrong! try Again");
            clearFields();
            titleRef.current.focus();
            setLoading(false);
          }
        });
    }
  };

  useEffect(() => {
    titleRef.current.focus();
  }, []);
  return (
    <section className="Dashboard__section DashboardSection__createBlog">
      {isLoading && <Loader />}
      <form className="CreateBlogPost__form" onSubmit={handlePublishBlog}>
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

        <div className="BlogPost__formButtonContainer">
          <button className="BlogPost__publishButton">Post</button>
        </div>
      </form>
    </section>
  );
}

export default CreateBlog;
