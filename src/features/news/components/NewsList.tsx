import { Link } from "react-router-dom";

import { SinglePostStyled } from "./News.styled";
import { Post, posts } from "./data";
import { useEffect, useState } from "react";
import Loading from "../../../shared/ui/Loading/Loading";

const NewsList = () => {
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [postsNumber, setPostsNumber] = useState(2);

  function checkScrollBottom() {
    const scrollTriggerPX =
      document.documentElement.scrollHeight - window.innerHeight;

    if (isPostsLoading || postsNumber === posts.length) return;

    if (window.scrollY >= scrollTriggerPX) {
      console.log("loading");

      setIsPostsLoading(true);
      setTimeout(() => {
        setPostsNumber((state) => {
          if (state + 2 <= posts.length) {
            return (state += 2);
          }
          return (state = posts.length);
        });
        setIsPostsLoading(false);
      }, 2000);
    }
  }

  useEffect(() => {
    document.addEventListener("scroll", checkScrollBottom);
    return () => document.removeEventListener("scroll", checkScrollBottom);
  }, [postsNumber, isPostsLoading]);

  return (
    <div>
      {posts.slice(0, postsNumber).map((post) => {
        return <SinglePost key={post.id} {...post} />;
      })}
      {isPostsLoading ? <Loading /> : null}
    </div>
  );
};

const SinglePost = ({ id, title, date, text, image }: Post) => {
  return (
    <SinglePostStyled>
      <div className="post-img-container">
        <img src={image} alt="post-image" />
      </div>
      <div className="post-header">
        <h2>{title}</h2>
        <span>
          {date.toLocaleDateString("en-us", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
      <p>
        {text.slice(0, 1000)}...{" "}
        <Link to={`/news/${id}`}>
          <span className="post-read-more">Read More</span>
        </Link>
      </p>
    </SinglePostStyled>
  );
};

export default NewsList;
