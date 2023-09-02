import { Link, useParams } from "react-router-dom";
import { SinglePostStyled } from "./News.styled";
import { Post } from "./NewsList";

const SinglePost = ({ _id: postId, title, updatedAt, text, image }: Post) => {
  const { id } = useParams();

  function arrayBufferToBase64(buffer: Buffer) {
    let binary = "";
    const bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

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
        <span>
          {new Date(updatedAt).toLocaleDateString("en-us", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
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
