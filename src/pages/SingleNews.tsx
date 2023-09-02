import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getPost } from "../features/news/api/getPosts";
import { Post } from "../features/news/components/NewsList";
import SinglePost from "../features/news/components/SinglePost";
import Loading from "../shared/ui/Loading/Loading";
import { SingleNewsPageStyled } from "./Pages.styled";
import Hero from "../layouts/components/Hero";

const SingleNews = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        const data = await getPost(id);
        setPost(data);
        console.log(data);
      }
    };
    fetchPost();
  }, []);

  if (post) {
    return (
      <SingleNewsPageStyled>
        <Hero>{post.title}</Hero>
        <SinglePost {...post} />;
      </SingleNewsPageStyled>
    );
  }
  return <Loading />;
};

export default SingleNews;
