import { useEffect, useState } from "react";

import DefaultLayout from "@/layouts/default";
import PostsList from "@/components/posts-list";
import PostCreate from "@/components/post-create";
import api from "../../api/api";

interface MetaData {
  value: string;
  label: string;
}

export default function IndexPage() {
  const [search, setSearch] = useState("");
  const [meta, setMeta] = useState<MetaData[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get("/meta/post");
      setMeta(response.data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

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
