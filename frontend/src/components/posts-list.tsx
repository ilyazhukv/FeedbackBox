import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
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

export default function PostsList({ searchQuery }: { searchQuery: string }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const isAdmin = useAuth();

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(fetchData, 3000);

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
      setPosts((prev) => prev.filter((post) => post._id !== _id));
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const sortedPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post._id.toLowerCase().includes(query)
    );
  }, [posts, searchQuery]);

  return (
    <>
      {sortedPosts.map((el) => (
        <Card
          key={el._id}
          className="mb-4 w-full border-none bg-default-50 shadow-sm hover:shadow-md transition-shadow"
        >
          <Link to={`/post/${el._id}`} className="block">
            <CardHeader className="pb-1 pt-3 px-4">
              <div className="flex flex-col gap-0.5">
                <h4 className="text-xl font-bold text-foreground leading-tight">
                  {el.title}
                </h4>
                <span className="text-[12px] text-default-400 italic">
                  {new Date(el.createdAt).toLocaleString([], {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </CardHeader>

            <CardBody className="px-4 py-2">
              <p className="text-default-600 text-sm line-clamp-3">
                {el.description}
              </p>
            </CardBody>

            <CardFooter className="px-4 py-2 pb-3 justify-between items-center">
              <div className="flex items-center gap-1.5 bg-default-200/50 px-2 py-1 rounded-md">
                <span className="text-xs font-bold text-default-700">
                  {el.commentCount}
                </span>
                <span className="text-[11px] uppercase text-default-500 font-medium">
                  Comments
                </span>
              </div>

              <span className="text-[10px] font-mono text-default-300">
                No.{el._id.slice(-8)}
              </span>
            </CardFooter>
          </Link>

          {isAdmin && (
            <button
              type="button"
              className="absolute top-2 right-2 text-[10px] bg-danger/10 hover:bg-danger text-danger hover:text-white px-2 py-1 rounded transition-colors"
              onClick={(e) => {
                e.preventDefault();
                deletePost(el._id);
              }}
            >
              DELETE POST
            </button>
          )}
        </Card>
      ))}
    </>
  );
}