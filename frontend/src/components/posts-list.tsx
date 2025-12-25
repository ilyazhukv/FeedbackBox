import { Card, CardHeader, CardBody, CardFooter, Chip } from "@heroui/react";
import { useMemo } from "react";
import { Link } from "react-router-dom";

import api from "../../api/api.ts";
import { useAuth } from "../../hooks/useAuth.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Post {
  _id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  commentCount: number;
  createdAt: string;
}

export default function PostsList({ searchQuery }: { searchQuery: string }) {
  const queryClient = useQueryClient();
  const isAdmin = useAuth();

  const {
    data: posts = [],
    isLoading,
    isError,
    error,
  } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await api.get("/posts");
      return response.data;
    },
    refetchInterval: 3000,
  });

  const mutation = useMutation({
    mutationFn: (id: string) => api.delete(`/posts/delete/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (err) => {
      console.error("Delete error:", err);
    },
  });

  const sortedPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return posts.filter(
      (post: Post) =>
        post.title.toLowerCase().includes(query) ||
        post._id.toLowerCase().includes(query) || 
        post.type.toLowerCase().includes(query) ||
        post.status.toLowerCase().includes(query)
    );
  }, [posts, searchQuery]);

  if (isLoading)
    return <div className="p-8 text-default-400 font-mono">Is loading...</div>;
  if (isError)
    return <div className="p-8 text-default-400 font-mono">Error: {error.message}</div>

  return (
    <>
      {sortedPosts.map((el) => (
        <Card
          key={el._id}
          className="mb-4 w-full border-none bg-default-50 shadow-sm hover:shadow-md transition-shadow"
        >
          <Link to={`/post/${el._id}`} className="block">
            <CardHeader className="pb-1 pt-4 px-4 flex-col items-start gap-3">
              <div className="flex gap-2">
                <Chip
                  size="sm"
                  variant="flat"
                  color={
                    el.status === "resolved"
                      ? "success"
                      : el.status === "in-progress"
                        ? "warning"
                        : "primary"
                  }
                  className="capitalize text-[10px] font-bold px-1"
                >
                  {el.status}
                </Chip>
                <Chip
                  size="sm"
                  variant="dot"
                  className="capitalize text-[10px] border-none bg-default-100 px-1"
                >
                  {el.type}
                </Chip>
              </div>

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
                  Replies
                </span>
              </div>

              <span className="text-[10px] font-mono text-default-300">
                No.{el._id.slice(-8)}
              </span>
            </CardFooter>
          </Link>
          {isAdmin && (
            <button
              disabled={mutation.isPending}
              className="absolute top-2 right-2 text-[10px] bg-danger/10 hover:bg-danger text-danger hover:text-white px-2 py-1 rounded transition-colors"
              onClick={(e) => {
                e.preventDefault();
                if (window.confirm("Delete post?")) {
                  mutation.mutate(el._id);
                }
              }}
            >
              {mutation.isPending ? "..." : "DELETE POST"}
            </button>
          )}
        </Card>
      ))}
    </>
  );
}
