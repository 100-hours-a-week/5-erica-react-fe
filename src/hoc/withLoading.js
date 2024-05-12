import { backHost, headers } from "../static";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import PostSkeleton from "../components/posts/PostSkeleton";
import PostsSkeleton from "../components/posts/PostsSkeleton";
import { Navigate, useNavigate } from "react-router-dom";
import { navUrl } from "../utils/navigate";

export default function withLoading(Component, type) {
  return function (props) {
    const [isLoadded, setIsLoadded] = useState(null);
    const postId = type === "post" ? Number(useParams().id) : null;
    const navigate = useNavigate();

    const url =
      type === "posts"
        ? `${backHost}/api/posts`
        : `${backHost}/api/posts/${postId}`;

    const { data, error } = useFetch(url, {
      headers,
      credentials: "include",
    });

    useEffect(() => {
      if (data) {
        setIsLoadded(true);
        if (data.length === 0) {
          alert("게시글이 없습니다.");
          navigate(navUrl.addPost);
        }
      }
    }, [data]);

    useEffect(() => {
      if (error) setIsLoadded(false);
    }, [error]);

    if (isLoadded === null)
      return type === "posts" ? <PostsSkeleton /> : <PostSkeleton />;

    return isLoadded ? (
      <Component {...props} data={data} />
    ) : (
      <Navigate to={navUrl.posts} />
    );
  };
}
