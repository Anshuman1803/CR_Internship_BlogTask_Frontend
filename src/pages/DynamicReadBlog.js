import axios from "axios";
import Header from "../components/Header";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
function DynamicReadBlog() {
  const { currentUser } = useSelector((state) => state.BlogApp);
  const commentInputRef = useRef();
  const CharacterLimit = 200;
  const { id } = useParams();
  const [blogData, Setblog] = useState(null);
  const [blogComments, setblogComments] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [newComments, setNewComments] = useState("");
  const [CharacterCounter, setCharacter] = useState(0);
  const [LoadingComments, setLoadingComments] = useState(false);
  const [errors, setError] = useState({
    commentError: false,
    errMsg: "",
  });

  const LoadComments = () => {
    setLoadingComments(true);
    axios
      .get(
        `https://cr-internship-blogtask-backend.onrender.com/api/blog/comments/${id}`
      )
      .then((response) => {
        setblogComments(response.data);
        setLoadingComments(false);
      });
  };

  const handlePostComments = (e) => {
    e.preventDefault();
    if (newComments === "") {
      commentInputRef.current.focus();
      setError({
        commentError: true,
        errMsg: "Required*",
      });
    } else if (newComments.length < 20) {
      commentInputRef.current.focus();
      setError({
        commentError: true,
        errMsg: "Comments should be more descriptive.",
      });
    } else {
      const newCommentDetails = {
        blogID: blogData._id,
        authorName: currentUser.user,
        authorEmail: currentUser.userEmail,
        commentDate: Date.now(),
        commentText: newComments,
      };
      axios
        .post(
          "https://cr-internship-blogtask-backend.onrender.com/api/blog/comments/create-comment",
          newCommentDetails
        )
        .then((response) => {
          if (response.data.message === "Comment added successfully") {
            toast.success("Comment added successfully");
            setNewComments("");
            setCharacter(0);
            LoadComments();
          } else {
            toast.error("Try again");
            setNewComments("");
          }
        })
        .catch((errors) => {
          toast.error("Something went wrong! Try again");
          setNewComments("");
        });
    }
  };

  const handleOnChangeEvent = (e) => {
    setError({
      commentError: false,
      errMsg: "",
    });
    if (
      e.nativeEvent.inputType === "deleteContentBackward" ||
      CharacterCounter !== CharacterLimit
    ) {
      setNewComments(e.target.value);
    }
    if (
      CharacterCounter !== CharacterLimit &&
      e.nativeEvent.inputType !== "deleteContentBackward"
    ) {
      setCharacter(CharacterCounter + 1);
    }
    if (CharacterCounter === CharacterLimit) {
      setError({
        commentError: true,
        errMsg: "Limit exceeded",
      });
    }
  };

  const handlekeydownEVENT = (e) => {
    if (e.code === "Backspace" && CharacterCounter > 0) {
      setCharacter(CharacterCounter - 1);
    }
  };

  useEffect(() => {
    setCharacter(0);
    setNewComments("");
    setLoading(true);
    axios
      .all([
        axios.get(
          `https://cr-internship-blogtask-backend.onrender.com/api/blogs/${id}`
        ),
        axios.get(
          `https://cr-internship-blogtask-backend.onrender.com/api/blog/comments/${id}`
        ),
      ])
      .then(
        axios.spread((blogResponse, commentsResponse) => {
          Setblog(blogResponse.data);
          setblogComments(commentsResponse.data);
          setLoading(false);
        })
      )
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Ensure loading state is set to false even if there's an error
      });
  }, [id]);
  return (
    <>
      <Header />
      <section className="appSection AppSection__readBlogs">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h1 className="readBlogs__title">{blogData?.blogTitle}</h1>
            <div className="readBlogs__blogInfoContainer">
              <span className="readBlogs__authorName">
                {blogData?.authorName.split(" ")[0]}
              </span>
              <span className="readBlogs__category">
                {blogData?.blogCategory}
              </span>
              <span className="readBlogs__createdAt">
                {Date(blogData?.blogDate).split(" ").slice(1, 4).join(" ")}
              </span>
            </div>
            <div className="readBlogs__posterContainer">
              <img
                src={blogData?.blogPoster}
                alt={"Blog Poster"}
                className="readBlogs__poster"
              />
            </div>
            <div
              className="readBlog__desc"
              dangerouslySetInnerHTML={{ __html: blogData?.blogDesc }}
            ></div>

            <div className="readBlog__CommentSections">
              <p className="commentSections__CommentCounter">
                Comments {blogComments.length}
              </p>

              <form className="commentSections__form">
                <div className="commentForm__itemBox">
                  <input
                    type="text"
                    name="Comments"
                    className="UserForm__Item"
                    placeholder="Post your comment here..."
                    autoComplete="new-comment"
                    onChange={handleOnChangeEvent}
                    value={newComments}
                    ref={commentInputRef}
                    onKeyDown={handlekeydownEVENT}
                  />
                  <button
                    className="readBlogs__PostCommentButton"
                    onClick={handlePostComments}
                  >
                    Post
                  </button>
                </div>
                {errors.commentError && (
                  <p className="commentForm__itemBox_errMessage">
                    {errors.errMsg}
                  </p>
                )}
                <p className="newComments__CharacterLimit">
                  {CharacterCounter} / {CharacterLimit}
                </p>
              </form>

              <div className="commentSections__AllCommentsBox">
                {LoadingComments ? (
                  <Loader />
                ) : (
                  <>
                    {blogComments.length === 0 ? (
                      <p className="commentSections__NOcomment_MSG">
                        No comments
                      </p>
                    ) : (
                      <>
                        {blogComments.map((comments, index) => {
                          return (
                            <div
                              className="AllCommentBox__oldComments"
                              key={comments._id}
                            >
                              <div className="OldComments__userInformation">
                                <p className="OldComments__userICON">
                                  {" "}
                                  {comments.authorName[0]}
                                </p>
                                <p className="OldComments__userName">
                                  {comments.authorName}
                                  <span className="OldComments__creationDate">
                                    {Date(comments?.commentDate)
                                      .split(" ")
                                      .slice(1, 4)
                                      .join(" ")}
                                  </span>
                                </p>
                              </div>
                              <p className="OldComments__content">
                                {comments.commentText}
                              </p>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default DynamicReadBlog;
