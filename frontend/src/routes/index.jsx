import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import ArtistLayout from "../layouts/ArtistLayout";
import Home from "../pages/user/Home";
import Playlist from "../pages/user/Playlist";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageSongs from "../pages/admin/ManageSongs";
import ManageRoles from "../pages/admin/ManageRoles";
import ManageAlbums from "../pages/admin/ManageAlbums";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import NotFound from "../pages/NotFound";
import ArtistSongs from "../pages/artist/ArtistSongs";
import ArtistAlbums from "../pages/artist/ArtistAlbums";
import Artist from "../pages/user/Artist";
import Song from "../pages/user/Song";
import Album from "../pages/user/Album";
import VideoDetail from "../pages/user/VideoDetail"; // <- THÊM
import ManageCategorys from "../pages/admin/ManageCategorys";
import PrivateRoute from "./PrivateRoutes";
import EmailVerified from "../pages/EmailVerified";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <UserLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "", element: <Home /> },
      { path: "artist/:artistId", element: <Artist /> },
      { path: "song/:id", element: <Song /> },
      { path: "album/:id", element: <Album /> },
      { path: "playlist/:playlistId", element: <Playlist /> },
      { path: "video/:id", element: <VideoDetail /> }, // <- THÊM
    ],
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/email-verified",
    element: <EmailVerified />,
  },
  {
    path: "/search",
    element: <Home />
  },

  {
    path: "/admin",
    element: (
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "", element: <ManageUsers /> },
      { path: "songs", element: <ManageSongs /> },
      { path: "albums", element: <ManageAlbums /> },
      { path: "categorys", element: <ManageCategorys /> },
      { path: "roles", element: <ManageRoles /> },
    ],
  },
  {
    path: "/artist-manage", 
    element: (
      <PrivateRoute>
        <ArtistLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "", element: <ArtistSongs /> },
      { path: "albums", element: <ArtistAlbums /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
