import axios from "axios";
import Header from "../components/Header";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
function DynamicReadBlog() {
  const { id } = useParams();
  const [blogData, Setblog] = useState(null);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:5000/api/blogs/${id}`).then((response) => {
      Setblog(response.data);
      setLoading(false)
    });
  }, [id]);
  return (
    <>
      <Header />
      <section className="appSection AppSection__readBlogs">
        {isLoading ? <Loader /> :<>
        <h1 className="readBlogs__title">{blogData?.blogTitle}</h1>
        <div className="readBlogs__posterContainer" >
        <img src={blogData?.blogPoster} alt={"Blog Poster"}  className="readBlogs__poster"/>
        </div>
        <div className="readBlog__desc" dangerouslySetInnerHTML={{__html : blogData?.blogDesc}}>
        </div>
        </>}
      </section>
    </>
  );
}

export default DynamicReadBlog;
