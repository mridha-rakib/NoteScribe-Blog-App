import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetchPostsQuery } from "../slices/postSlice";
import { Button } from "flowbite-react";

const PostScreen = () => {
  const { postSlug } = useParams();
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  const { data: postDetails, isLoading: postLoading } = useFetchPostsQuery({
    slug: postSlug,
  });
  console.log(postDetails && postDetails.posts[0]);

  useEffect(() => {
    if (postDetails && Array.isArray(postDetails.posts)) {
      setPost(postDetails.posts[0]);
    }
  }, [postSlug]);

  return (
    <main>
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post && post.title}
      </h1>
      <Link>
        <Button> {post && post.category}</Button>
      </Link>
    </main>
  );
};

export default PostScreen;
