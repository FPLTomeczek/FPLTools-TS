import { Link, useParams } from "react-router-dom";

import { SinglePostStyled } from "./News.styled";
import { Post } from "./NewsList";
import usePostActions from "../hooks/usePostActions";

const SinglePost = ({ _id: postId, title, updatedAt, text, image }: Post) => {
  const { id } = useParams();
  const { arrayBufferToBase64, formatDate } = usePostActions();

  return (
    <SinglePostStyled>
      <Link to={`/news/${postId}`}>
        <div className="post-img-container">
          <img
            src={`data:image/jpeg;base64,${arrayBufferToBase64(image?.data)}`}
            alt="post-image"
          />
        </div>
      </Link>
      <div className="post-header">
        <h2>{title}</h2>
        <span>{formatDate(updatedAt.toString())}</span>
      </div>
      <div className="post-text">
        {id
          ? text?.split("\n").map((line, ind) => {
              return (
                <p key={ind}>
                  {line}
                  <br />
                  <br />
                </p>
              );
            })
          : text.slice(0, 1000) + "..."}
        {id ? null : (
          <Link to={`/news/${postId}`}>
            <span className="post-read-more">Read More</span>
          </Link>
        )}
      </div>
    </SinglePostStyled>
  );
};

export default SinglePost;
