import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import PostPage from "@/pages/post";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<PostPage />} path="/post/:id" />
    </Routes>
  );
}

export default App;
