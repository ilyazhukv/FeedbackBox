import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../api/api.ts";
import { useAuth } from "../../hooks/useAuth.ts";

interface Comment {
  _id: string;
  postId: string;
  content: string;
  createdAt: string;
}

export default function CommentsList({ searchQuery }: { searchQuery: string }) {
  const { id } = useParams<{ id: string }>();
  const [comments, setComments] = useState<Comment[]>([]);
  const isAdmin = useAuth();

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get(`/comments/${id}`);
      setComments(response.data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const deleteComment = async (_id: string) => {
    if (!localStorage.getItem("token")) return;

    try {
      await api.delete(`/comments/${_id}`);
      setComments((prev) => prev.filter((comment) => comment._id !== _id));
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const sortedComments = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return comments.filter((comment) =>
      comment.content.toLowerCase().includes(query)
    );
  }, [comments, searchQuery]);

  return (
    <>
      {sortedComments.map((el) => (
        <Card key={el._id} className="mb-[15px]">
          <CardHeader className="pb-1 pt-3 px-4">
            <div className="flex flex-col gap-0.5">
              <h4 className="text-xl font-bold text-foreground leading-tight">
                Admin
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
              {el.content}
            </p>
          </CardBody>
          <CardFooter className="px-4 py-2 pb-3 justify-end items-center">
            <span className="text-[10px] font-mono text-default-300">
              No.{el._id.slice(-8)}
            </span>
          </CardFooter>
          {isAdmin && (
            <button
              type="button"
              className="absolute top-2 right-2 text-[10px] bg-danger/10 hover:bg-danger text-danger hover:text-white px-2 py-1 rounded transition-colors"
              onClick={(e) => {
                e.preventDefault();
                deleteComment(el._id);
              }}
            >
              DELETE COMMENT
            </button>
          )}
        </Card>
      ))}
    </>
  );
}