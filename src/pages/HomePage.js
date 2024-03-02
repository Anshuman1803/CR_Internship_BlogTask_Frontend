import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router";
function HomePage() {
  const navigateTO = useNavigate();
  return (
    <>
      <Header />
      <section className="appSection appSection__homePage">
        <h1 className="homePage__PrimaryHeading">Welcome to the <span className="PrimaryHeading__appName">Ms</span> blog</h1>
        <h3 className="homePage__SecondaryHeading">Publish your blogs</h3>
        <div className="homePage__buttonContainer">
          <button className="homePage__buttons" onClick={()=>navigateTO('/blogs')}>Read Blogs</button>
          <button className="homePage__buttons" onClick={()=> navigateTO("/user/dashboard/create-blog")}>Write Blogs</button>
        </div>
      </section>
    </>
  );
}

export default HomePage;
