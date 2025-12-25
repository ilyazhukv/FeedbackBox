import { useState } from "react";

import DefaultLayout from "@/layouts/default";
import PostsList from "@/components/posts-list";
import PostCreate from "@/components/post-create";
import api from "../../api/api";
import { useQuery } from "@tanstack/react-query";

export default function IndexPage() {
  const [search, setSearch] = useState("");

  const fetchMetaData = async () => {
    const response = await api.get("/meta");
    return response.data[0];
  };

  const {
    data: meta,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["metaData"],
    queryFn: fetchMetaData,
  });

  if (isLoading)
    return <div className="p-8 text-default-400 font-mono">Is loading...</div>;
  if (isError)
    return <div className="p-8 text-default-400 font-mono">Error: {error.message}</div>;

  return (
    <DefaultLayout searchQuery={setSearch}>
      <section className="flex flex-col items-start justify-center gap-4 py-8 md:py-10">
        <div className="flex gap-[10px]">
          <PostCreate meta={meta} />
        </div>
        <div className="w-full">
          <PostsList searchQuery={search} />
        </div>
      </section>
    </DefaultLayout>
  );
}
