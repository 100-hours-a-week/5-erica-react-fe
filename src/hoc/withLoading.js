import { backHost, headers } from "../static";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import PostSkeleton from "../components/posts/PostSkeleton";
import PostsSkeleton from "../components/posts/PostsSkeleton";
import { Navigate } from "react-router-dom";
import { navUrl } from "../utils/navigate";

export default function withLoading(Component, type) {
  switch (type) {
    case "posts":
      return function (props) {
        const [isLoadded, setIsLoadded] = useState(null);

        const { data, error } = useFetch(`${backHost}/api/posts`, {
          headers,
          credentials: "include",
        });

        useEffect(() => {
          if (data) {
            setIsLoadded(true);
            if (data.length === 0) alert("게시글이 없습니다.");
          }
        }, [data]);

        useEffect(() => {
          if (error) setIsLoadded(false);
        }, [error]);

        if (isLoadded === null) return <PostsSkeleton />;

        return isLoadded ? (
          <Component {...props} data={data} />
        ) : (
          <Navigate to={navUrl.addPost} />
        );
      };

    case "post":
      return function (props) {
        const postId = Number(useParams().id);
        const [isLoadded, setIsLoadded] = useState(null);

        const { data, error } = useFetch(`${backHost}/api/posts/${postId}`, {
          headers,
          credentials: "include",
        });

        useEffect(() => {
          if (data) setIsLoadded(true);
        }, [data]);

        useEffect(() => {
          if (error) setIsLoadded(false);
        }, [error]);

        if (isLoadded === null) return <PostSkeleton />;

        return isLoadded ? (
          <Component {...props} data={data} />
        ) : (
          <Navigate to={navUrl.posts} />
        );
      };
    default:
      return null;
  }
}
