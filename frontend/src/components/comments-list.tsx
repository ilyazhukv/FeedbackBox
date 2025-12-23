import { Card, CardHeader, CardBody } from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../service/api.ts";
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

    const intervalId = setInterval(fetchData, 3000);

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
          <CardHeader className="justify-between">
            <div className="flex gap-5">
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-lg font-semibold leading-none text-default-600">
                  Anonymous
                </h4>
                <h5 className="text-base">
                  CreatedAt: {new Date(el.createdAt).toLocaleString()}
                </h5>
              </div>
            </div>
          </CardHeader>
          <CardBody className="px-3 py-0 text-base text-default-400 overflow-y-hidden">
            <p>{el.content}</p>
          </CardBody>
          {isAdmin && (
            <button
              type="button"
              className="cursor-pointer hover:bg-red-600"
              onClick={() => deleteComment(el._id)}
            >
              Delete
            </button>
          )}
        </Card>
      ))}
    </>
  );
}