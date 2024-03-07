import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import EmptyPosts from "../components/EmptyPosts";
function BlogPage() {
  const [isLoading, setLoading] = useState(false);
  const [blogPosts, setBlogs] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get("https://cr-internship-blogtask-backend.onrender.com/api/blogposts/all").then((response) => {
      setBlogs(response.data);
      setLoading(false);
    });
  }, []);
  return (
    <>
      <Header />
      <section className="appSection appSection__allBlogs">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {blogPosts.length === 0 ? (
              <EmptyPosts message={"Oops! No blog posts yet"}/>
            ) : (
              <>
                {blogPosts?.map((blog) => {
                  return (
                    <div className="Myblogs__Cards" key={blog._id}>
                      <div className="MyBlogsCards__headerContainer">
                        <Link
                          className="MYBlogsCards__title"
                          to={`/blogs/blog/${blog._id}`}
                        >
                          {blog.blogTitle.slice(0, 34)}...
                        </Link>
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
          </>
        )}
      </section>
      <Footer />
    </>
  );
}

export default BlogPage;
