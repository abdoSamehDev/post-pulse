import { HashRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import AddPost from "./pages/AddPost";
import PostDetails from "./pages/PostDetails";

const App = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="post/:id" element={<PostDetails />} />
          <Route path="add-post" element={<AddPost />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
