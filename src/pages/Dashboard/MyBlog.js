import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";

function MyBlog() {
  const { currentUser } = useSelector((state) => state.BlogApp);
  const [isLoading, setLoading] = useState(false);
  const [myBlogs, setblogs] = useState([]);

  const LoadBlog = () => {
    setLoading(true);
    axios
      .get(
        `https://cr-internship-blogtask-backend.onrender.com/api/user//blog/${currentUser.userEmail}`
      )
      .then((response) => {
        setblogs(response.data);
        setLoading(false);
      });
  };
  useEffect(LoadBlog, [currentUser]);

  const handleDeleteBlogClick = (id) => {
    axios
      .post(`https://cr-internship-blogtask-backend.onrender.com/api/blog/delete-blog/${id}`)
      .then((response) => {
        console.log(response.data);
        if (response.data.msg === "Blog deleted successfull") {
          toast.success("Blog deleted successfully");
          LoadBlog();
        }else{
          toast.error("Try again");
        }
      })
      .catch((err) => {
        console.log("Something went wrong");
      });
  };
  return (
    <section className="Dashboard__section DashboardSection__myBlogs">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {myBlogs?.map((blog) => {
            return (
              <div className="Myblogs__Cards" key={blog._id}>
                <div className="MyBlogsCards__headerContainer">
                  <span className="MyBlogsCard__AuthorProfile">
                    {blog?.authorName[0]}
                  </span>
                  <p className="MyBlogsCard__blogAuthorBox">
                    <span className="MyBlogsCard__author">
                      {blog.authorName}
                    </span>
                    <span className="MyBlogsCard__publishDate">
                      {Date(blog.blogDate).split(" ").slice(1, 4).join(" ")}
                    </span>
                  </p>
                  <div className="MyBlogsCard__OptionsContainer">
                    <i className="fa-solid fa-ellipsis MyBlogsCard__OptionsICON"></i>
                    <ul className="MyBlogsCard__OptionsDropDown">
                      <li className="MyBlogsCard__Option">
                        <Link
                          to={`/blogs/blog/${blog._id}`}
                          className="MyBlogsCard__OptionLINKS"
                        >
                          Read blog{" "}
                          <i className="fa-brands fa-readme MyBlogsCard__OptionICON"></i>
                        </Link>
                      </li>
                      <li className="MyBlogsCard__Option">
                        <Link to="" className="MyBlogsCard__OptionLINKS">
                          Update blog{" "}
                          <i className="fa-solid fa-file-pen MyBlogsCard__OptionICON"></i>
                        </Link>
                      </li>
                      <li className="MyBlogsCard__Option">
                        <p
                          className="MyBlogsCard__OptionLINKS"
                          onClick={() => handleDeleteBlogClick(blog._id)}
                        >
                          Delete blog{" "}
                          <i className="fa-solid fa-trash MyBlogsCard__OptionICON"></i>
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="MyBlogsCards__posterContainer">
                  <img
                    src={blog.blogPoster}
                    alt="blog_Poster"
                    loading="lazy"
                    className="MyBlogsCards__Poster"
                  />
                </div>
                <div className="MyBlogsCards__detailsContainer">
                  <span className="MyBlogsCards__Reactions">
                    <i className="fa-solid fa-heart MyBlogsCards__ReactionsICON"></i>
                    {blog.blogLikes}
                  </span>
                  <span className="MyBlogsCards__Reactions">
                    <i className="fa-solid fa-comments MyBlogsCards__CommentsICON"></i>
                    {blog.blogComments}
                  </span>
                </div>
              </div>
            );
          })}
        </>
      )}
    </section>
  );
}

export default MyBlog;
