import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import axios from "axios";
const modules = {
  toolbar: [
    [{ header: [2, 3, 4, false] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
  ],
};
function CreateBlog() {
  const [value, setValue] = useState("");

  return (
    <section className="Dashboard__section DashboardSection__createBlog">
      <form className="CreateBlogPost__form">
        <div className="BlogPost__formITemBox">
          <label htmlFor="title">Blog title</label>
          <input
            type="text"
            name="blogTitle"
            id="title"
            className="UserForm__Item"
            placeholder="Enter blog title"
          />
        </div>

        <div className="BlogPost__formITemBox">
          <label htmlFor="category">Blog category</label>
          <input
            type="text"
            name="blogCategory"
            id="category"
            className="UserForm__Item"
            placeholder="Enter blog category"
          />
        </div>

        <div className="BlogPost__formITemBox">
          <label htmlFor="poster">Choose blog poster</label>
          <input
            type="file"
            name="blogPoster"
            id="category"
            className="UserForm__Item BlogPostForm__item"
          />
        </div>

        <ReactQuill
          value={value}
          theme={"snow"}
          onChange={setValue}
          modules={modules}
          className="CreateBlogPost__editor"
          
        />

        <div className="BlogPost__formButtonContainer">
          <button className="BlogPost__publishButton">Post</button>
        </div>

      </form>
    </section>
  );
}

export default CreateBlog;
