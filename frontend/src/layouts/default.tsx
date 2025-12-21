import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar/>
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <a
          className="flex items-center gap-1 text-current"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/ilyazhukv/FeedbackBox"
        >
          <span className="text-default-600">Powered by</span>
          <p className="text-primary">Ilja</p>
        </a>
      </footer>
    </div>
  );
}