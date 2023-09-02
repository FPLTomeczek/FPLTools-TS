import { useEffect, useState } from "react";

import { getPosts } from "../api/getPosts";
import SinglePost from "./SinglePost";
import Loading from "../../../shared/ui/Loading/Loading";

export type Post = {
  _id: number;
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
  const [isPostsLoading, setIsPostsLoading] = useState(false);

  function checkScrollBottom() {
    const scrollTriggerPX =
      document.documentElement.scrollHeight - window.innerHeight;

    if (isPostsLoading || postsNumber === posts.length) return;

    if (window.scrollY >= scrollTriggerPX) {
      console.log("window.scrollY >= scrollTriggerPX");

      setIsPostsLoading(true);
      setPostsNumber((state) => state + 2);
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts(postsNumber);
      setPosts(posts);
    };
    fetchPosts();
    setIsPostsLoading(false);
  }, [postsNumber]);

  useEffect(() => {
    document.addEventListener("scroll", checkScrollBottom);
    return () => document.removeEventListener("scroll", checkScrollBottom);
  }, [postsNumber, isPostsLoading]);

  return (
    <div>
      {posts.map((post) => {
        return <SinglePost {...post} key={post._id} />;
      })}
      {isPostsLoading ? <Loading /> : null}
    </div>
  );
};

export default NewsList;
