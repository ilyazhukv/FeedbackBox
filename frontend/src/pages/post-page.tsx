import { useEffect, useState } from "react";

import DefaultLayout from "@/layouts/default";
import CommentsList from "@/components/comments-list";
import CommentCreate from "@/components/admin/comment-create";
import api from "../../api/api";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import StatusChange from "@/components/admin/status-change";
import { Chip, Divider } from "@heroui/react";

interface Post {
  _id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  commentCount: string;
  createdAt: string;
}

interface MetaData {
  value: string;
  label: string;
}

export default function DocsPage() {
  const [search, setSearch] = useState("");
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post>();
  const [status, setStatus] = useState<MetaData[]>([]);
  const isAdmin = useAuth();

  useEffect(() => {
    fetchData();
    fetchMetaData();
  }, [id]);

  const fetchData = async () => {
    try {
      const postData = await api.get(`/posts/${id}`);
      setPost(postData.data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const fetchMetaData = async () => {
    try {
      const statusData = await api.get("/meta");
      setStatus(statusData.data[1]);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return post ? (
    <DefaultLayout searchQuery={setSearch}>
      <div className="max-w-7xl mx-auto w-full px-4 py-6">
        <section className="mb-8 border-b-2 border-default-100 pb-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap justify-between items-center gap-2 text-xs text-default-400 font-mono">
              <span>Date: {new Date(post.createdAt).toLocaleString()}</span>
              <span className="bg-default-100 px-2 py-0.5 rounded italic">
                ID: {post._id}
              </span>
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tight leading-tight">
                {post.title}
              </h1>
              <p className="text-lg md:text-xl text-default-700 whitespace-pre-wrap leading-relaxed break-words">
                {post.description}
              </p>
            </div>
            <div className="flex flex-wrap justify-between items-end gap-4 pt-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Chip
                    variant="dot"
                    color="primary"
                    size="sm"
                    className="capitalize border-none"
                  >
                    {post.type}
                  </Chip>
                  <Chip
                    variant="shadow"
                    size="sm"
                    color={
                      post.status === "resolved"
                        ? "success"
                        : post.status === "in-progress"
                          ? "warning"
                          : "default"
                    }
                    className="capitalize font-bold"
                  >
                    {post.status}
                  </Chip>
                </div>
                <div className="flex items-center gap-1 text-sm text-default-500">
                  <span className="font-bold text-foreground">
                    {post.commentCount}
                  </span>
                  <span>Replies</span>
                </div>
              </div>
              {isAdmin && (
                <div className="flex flex-wrap items-center gap-2 bg-default-50 p-2 rounded-2xl border-1 border-default-200">
                  <StatusChange meta={status} />
                  <Divider orientation="vertical" className="h-8 mx-1" />
                  <CommentCreate />
                </div>
              )}
            </div>
          </div>
        </section>
        <section>
          <CommentsList searchQuery={search} />
        </section>
      </div>
    </DefaultLayout>
  ) : (
    <DefaultLayout searchQuery={setSearch}>
      <div className="flex justify-center items-center h-full">
        <p className="text-default-400 font-mono animate-pulse">Loading...</p>
      </div>
    </DefaultLayout>
  );
}
