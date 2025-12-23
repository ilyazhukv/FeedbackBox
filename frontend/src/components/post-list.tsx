import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../service/api.ts";
import { useAuth } from "../../hooks/useAuth.ts";

interface Post {
  _id: string;
  title: string;
  description: string;
  commentCount: string;
  createdAt: string;
}

export default function PostList({ searchQuery }: { searchQuery: string }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const isAdmin = useAuth();

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get("/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const deletePost = async (_id: string) => {
    if (!localStorage.getItem("token")) return;

    try {
      await api.delete(`/posts/${_id}`);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const sortedPosts = posts.filter((post) => {
    const posts = post.title.toLocaleLowerCase();
    const query = searchQuery.toLocaleLowerCase();

    return posts.includes(query);
  });

  return (
    <>
      {sortedPosts.map((el) => (
        <Card
          key={el._id}
          className="mb-[15px] transition duration-300 hover:scale-105 transform"
        >
          <Link to={`/post/${el._id}`}>
            <CardHeader className="justify-between">
              <div className="flex gap-5">
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className="text-lg font-semibold leading-none text-default-600">
                    {el.title}
                  </h4>
                  <h5 className="text-base">
                    CreatedAt: {new Date(el.createdAt).toLocaleString()}
                  </h5>
                </div>
              </div>
            </CardHeader>
            <CardBody className="px-3 py-0 text-base text-default-400 overflow-y-hidden">
              <p>{el.description}</p>
            </CardBody>
            <CardFooter className="gap-3">
              <div className="flex gap-1">
                <p className="font-semibold text-default-400 text-small">
                  {el.commentCount}
                </p>
                <p className="text-default-400 text-small">Comments</p>
              </div>
            </CardFooter>
          </Link>
          {isAdmin && (
            <button
              className="cursor-pointer hover:bg-red-600"
              onClick={() => deletePost(el._id)}
            >
              Delete
            </button>
          )}
        </Card>
      ))}
    </>
  );
}
