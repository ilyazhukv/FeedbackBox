import { useState } from "react";

import DefaultLayout from "@/layouts/default";
import PostsList from "@/components/posts-list";
import PostCreate from "@/components/post-create";

export default function IndexPage() {
  const [search, setSearch] = useState("");

  return (
    <DefaultLayout searchQuery={setSearch}>
      <section className="flex flex-col items-start justify-center gap-4 py-8 md:py-10">
        <div className="flex gap-[10px]">
          <PostCreate />
        </div>
        <div className="w-full">
          <PostsList searchQuery={search}/>
        </div>
      </section>
    </DefaultLayout>
  );
}
