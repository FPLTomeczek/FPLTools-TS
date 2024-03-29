import { useEffect, useState } from "react";

import { getPosts } from "../api/posts";
import SinglePost from "./SinglePost";
import Loading from "../../../shared/ui/Loading/Loading";

export type Post = {
  _id: string;
  title: string;
  updatedAt: Date;
  text: string;
  image: {
    data: Buffer;
    type: string;
  };
};

const NewsList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsNumber, setPostsNumber] = useState(2);
  const [isPostsLoading, setIsPostsLoading] = useState(true);

  function checkScrollBottom() {
    const scrollTriggerPX =
      document.documentElement.scrollHeight - window.innerHeight;

    if (isPostsLoading) return;

    if (window.scrollY >= scrollTriggerPX) {
      setIsPostsLoading(true);
      setPostsNumber((state) => state + 2);
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts(postsNumber);
      if (posts) {
        setPosts(posts);
        setIsPostsLoading(false);
      }
    };
    fetchPosts();
  }, [postsNumber]);

  useEffect(() => {
    document.addEventListener("scroll", checkScrollBottom);
    return () => document.removeEventListener("scroll", checkScrollBottom);
  }, [postsNumber, isPostsLoading]);

  if (!posts) return <Loading />;

  return (
    <div>
      {posts.map((post) => {
        return <SinglePost {...post} key={post._id} />;
      })}
      {isPostsLoading ? (
        <div style={{ marginTop: "4rem" }}>
          <Loading />
        </div>
      ) : null}
    </div>
  );
};

export default NewsList;
