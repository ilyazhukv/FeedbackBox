import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import IndexPage from "@/pages/index";
import PostPage from "@/pages/post-page";
import ProtectedRoute from "./components/protected-route";

import AdminDashboard from "./pages/admin/dashboard";
import AdminLayout from "./layouts/admin";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<IndexPage />} path="/" />
        <Route element={<PostPage />} path="/post/:id" />

        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />} path="/admin">
            <Route element={<AdminDashboard />} index />
          </Route>
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
