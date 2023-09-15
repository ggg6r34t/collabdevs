import Post from "./components/post/PostSection";
import PostDetail from "./components/postDetail/PostDetail";
import PostForm from "./components/forms/PostForm";
import Profile from "./components/user/profile/Profile";
import SignIn from "./components/authentication/sign-in/SignIn";
import SignUp from "./components/authentication/sign-up/SignUp";
import UserList from "./components/admin/userlist/UserList";
import SavedPosts from "./components/savedPost/SavedPost";

const routes = [
  {
    path: "/",
    component: Post,
    key: "post",
  },
  {
    path: "/create-post",
    component: PostForm,
    key: "post-form",
  },
  {
    path: "/saved-posts/:id",
    component: SavedPosts,
    key: "saved-post",
  },
  {
    path: "/signin",
    component: SignIn,
    key: "sign-in",
  },
  {
    path: "/signup",
    component: SignUp,
    key: "sign-up",
  },
  {
    path: "/users",
    component: UserList,
    key: "users",
  },
  {
    path: "/posts/:postId",
    component: PostDetail,
    key: "post-detail",
  },
  {
    path: "/profile/:userId",
    component: Profile,
    key: "profile",
  },
  // {
  //     path: "/community",
  //     component: Community,
  //     key: "community",
  //   },
  //   {
  //     path: "/support",
  //     component: Support,
  //     key: "support",
  //   },
  //   {
  //     path: "/terms-privacy",
  //     component: TermsPrivacy,
  //     key: "terms-privacy",
  //   },
  //   {
  //     path: "/about-us",
  //     component: AboutUs,
  //     key: "about-us",
  //   },
  //   {
  //     path: "/blog",
  //     component: Blog,
  //     key: "blog",
  //   },
  //   {
  //     path: "/docs",
  //     component: Docs,
  //     key: "docs",
  //   },
  //   {
  //     path: "/faq",
  //     component: FAQ,
  //     key: "faq",
  //   },
  //   {
  //     path: "/help-desk",
  //     component: HelpDesk,
  //     key: "help-desk",
  //   },
];

export default routes;
