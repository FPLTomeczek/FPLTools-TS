import { useEffect, useState } from "react";
import { getPosts } from "../api/posts";
import { Post } from "./NewsList";
import { RecentPostsStyled } from "./News.styled";
import { Link, useParams } from "react-router-dom";

import usePostActions from "../hooks/usePostActions";
import Hero from "../../../layouts/components/Hero";

const RecentPosts = () => {
  const [recentPosts, setRecentPosts] = useState<Post[]>();
  const { id } = useParams();
  const visibleRecentPosts = 5;

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts(visibleRecentPosts);
      const filteredPosts = posts?.filter((post) => {
        return post._id !== id;
      });
      setRecentPosts(filteredPosts);
    };
    fetchPosts();
  }, [id]);

  return (
    <RecentPostsStyled>
      <div className="recent-posts__hero-container">
        <Hero>Recent Posts</Hero>
      </div>
      <div className="recent-posts__posts-container">
        {recentPosts?.map((post) => {
          return <RecentPost {...post} key={post._id} />;
        })}
      </div>
    </RecentPostsStyled>
  );
};

const RecentPost = ({ image, title, updatedAt, _id }: Post) => {
  const { arrayBufferToBase64, formatDate } = usePostActions();

  return (
    <Link to={`/news/${_id}`} className="recent-post">
      <div className="recent-post__img-container">
        <img
          src={`data:image/jpeg;base64,${arrayBufferToBase64(image?.data)}`}
          alt="post-image"
        />
      </div>
      <h4 className="recent-post__title">{title}</h4>
      <span>{formatDate(updatedAt.toString(), { weekday: false })}</span>
    </Link>
  );
};

export default RecentPosts;
