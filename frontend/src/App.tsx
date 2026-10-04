import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "@/pages/Signup";
import Signin from "@/pages/Signin";
import Blogs from "@/pages/Blogs";
import Publish from "@/pages/Publish";
import Blog from "@/pages/Blog";
import NotFound from "@/pages/NotFound";
import { LandingPage } from "@/components/landing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/publish" element={<Publish />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;