import DefaultLayout from "@/layouts/default";
import PostList from "@/components/postList";
import PostModal from "@/components/postModal";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-start justify-center gap-4 py-8 md:py-10">
        <div>
          <PostModal />
        </div>
        <div>
          <PostList />
        </div>
      </section>
    </DefaultLayout>
  );
}
