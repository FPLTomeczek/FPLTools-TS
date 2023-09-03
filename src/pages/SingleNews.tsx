import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getPost } from "../features/news/api/posts";
import { Post } from "../features/news/components/NewsList";
import SinglePost from "../features/news/components/SinglePost";
import Loading from "../shared/ui/Loading/Loading";
import { SingleNewsPageStyled } from "./Pages.styled";
import Hero from "../layouts/components/Hero";
import RecentPosts from "../features/news/components/RecentPosts";

const SingleNews = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        const data = await getPost(id);
        setPost(data);
      }
    };
    fetchPost();
  }, [id]);

  if (post) {
    return (
      <SingleNewsPageStyled>
        <div className="single-news__post-container">
          <Hero>{post.title}</Hero>
          <SinglePost {...post} />
        </div>
        <div className="single-news__recent-posts-container">
          <RecentPosts />
        </div>
      </SingleNewsPageStyled>
    );
  }
  return <Loading />;
};

export default SingleNews;
