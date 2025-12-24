import { useEffect, useState } from "react";

import DefaultLayout from "@/layouts/default";
import CommentsList from "@/components/comments-list";
import CommentCreate from "@/components/admin/comment-create";
import api from "../../api/api";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import StatusChange from "@/components/admin/status-change";

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
    fetchDataStatus();
  }, [id]);

  const fetchData = async () => {
    try {
      const postData = await api.get(`/posts/${id}`);
      setPost(postData.data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const fetchDataStatus = async () => {
    try {
      const statusData = await api.get(`/meta/post/${id}`);
      setStatus(statusData.data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return post ? (
    <DefaultLayout searchQuery={setSearch}>
      <div className="max-w-7xl mx-auto w-full px-4 py-6">
        <section className="mb-8 border-b-2 border-default-100 pb-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-xs text-default-400 font-mono">
              <span>Date: {new Date(post.createdAt).toLocaleString()}</span>
              <br />
              <span>ID: {post._id}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
              {post.title}
            </h1>
            <p className="text-lg text-default-700 whitespace-pre-wrap leading-relaxed">
              {post.description}
            </p>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4 text-sm text-default-500">
                <span className="flex items-center gap-1">
                  <span className="font-bold">{post.commentCount}</span> Replies
                </span>
              </div>
              {isAdmin && (
                <div>
                  <CommentCreate />
                  <StatusChange meta={status} />
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
