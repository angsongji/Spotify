import { RouterProvider } from "react-router-dom";
import router from "./routes";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/user/Home.jsx";
// import Album from "./pages/user/Album.jsx";
// import Playlist from "./pages/user/Playlist.jsx";
// import Artist from "./pages/user/Artist.jsx";
// import NotFound from "./pages/NotFound.jsx";
// import SignIn from "./pages/SignIn.jsx";
// import SignUp from "./pages/SignUp.jsx";
// import AppBar from "./pages/user/AppBar.jsx";
// import SideBar from "./pages/user/SideBar.jsx";
// import Footer from "./pages/user/Footer.jsx";
// import ArtistDetail from "./pages/user/Artist.jsx"; // Import ArtistDetail

// const App = () => {
// return (
//   <Router>
//     <div className="app flex bg-black min-h-screen text-white">
//       <SideBar />
//       <div className="flex-1 flex flex-col">
//         <AppBar />
//         <div className="p-6">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/album" element={<Album />} />
//             <Route path="/playlist" element={<Playlist />} />
//             <Route path="/artist" element={<Artist />} />
//             <Route path="/artist/:artistId" element={<ArtistDetail />} /> {/* Thêm Route cho ArtistDetail */}
//             <Route path="/signin" element={<SignIn />} />
//             <Route path="/signup" element={<SignUp />} />
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </div>
//         <Footer />
//       </div>
//     </div>
//   </Router>
// );
// };

// export default App;