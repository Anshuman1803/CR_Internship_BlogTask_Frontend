import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
function MyBlog() {
  const { currentUser } = useSelector((state) => state.BlogApp);
  const [isLoading, setLoading] = useState(false);
  const [myBlogs, setblogs] = useState([])
  useEffect(() => {
    setLoading(true)
    axios.get(`https://cr-internship-blogtask-backend.onrender.com/api/user//blog/${currentUser.userEmail}`).then((response)=>{
      setblogs(response.data)
      setLoading(false)
    })
  }, [currentUser]);
  return (
    <section className="Dashboard__section DashboardSection__myBlogs">
      {isLoading ? (
        <Loader/>
      ) : (
        <>
        {
          myBlogs?.map((blog)=>{
            return   <div className="Myblogs__Cards" key={blog._id}>
            <div className="MyBlogsCards__headerContainer">
              <span className="MyBlogsCard__AuthorProfile">{currentUser.user[0]}</span>
              <p className="MyBlogsCard__blogAuthorBox">
                <span className="MyBlogsCard__author">{currentUser.user}</span>
                <span className="MyBlogsCard__publishDate">{Date(blog.blogDate).split(" ").slice(1, 4).join(" ")}</span>
              </p>
              <div className="MyBlogsCard__OptionsContainer">
                <i className="fa-solid fa-ellipsis MyBlogsCard__OptionsICON"></i>
                <ul className="MyBlogsCard__OptionsDropDown">
                  <li className="MyBlogsCard__Option">
                    <Link to={`/blogs/blog/${blog._id}`} className="MyBlogsCard__OptionLINKS">
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
                    <Link to="" className="MyBlogsCard__OptionLINKS">
                      Delete blog{" "}
                      <i className="fa-solid fa-trash MyBlogsCard__OptionICON"></i>
                    </Link>
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
          })
        }
        </>
      )}
    </section>
  );
}

export default MyBlog;
