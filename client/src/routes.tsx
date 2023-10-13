import Home from "./pages/Home";
import CommunityPage from "./pages/Community";
import SupportPage from "./pages/SupportPage";
import PostDetail from "./components/postDetail/PostDetails";
import PostForm from "./components/forms/PostForm";
import Profile from "./components/user/profile/Profile";
import SignIn from "./components/authentication/sign-in/SignIn";
import SignUp from "./components/authentication/sign-up/SignUp";
import UserList from "./components/admin/userlist/UserList";
import SavedPosts from "./components/savedPost/SavedPosts";
import FeedbackList from "./components/admin/feedbacklist/FeedbackList";
import FeedbackForm from "./components/forms/FeedbackForm";
import PasswordResetRequest from "./components/authentication/PasswordResetRequest";
import PasswordResetForm from "./components/authentication/PasswordResetForm";
import EmailConfirmation from "./components/emailConfirmation/EmailConfirmation";

const routes = [
  {
    path: "/",
    component: Home,
    key: "home",
  },
  {
    path: "/community",
    component: CommunityPage,
    key: "community",
  },
  {
    path: "/support",
    component: SupportPage,
    key: "support",
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
  {
    path: "/feedback",
    component: FeedbackList,
    key: "feedback",
  },
  {
    path: "/give-feedback",
    component: FeedbackForm,
    key: "give-feedback",
  },
  {
    path: "/auth/reset-password",
    component: PasswordResetRequest,
    key: "reset-password",
  },
  {
    path: "/auth/reset-password-confirm",
    component: PasswordResetForm,
    key: "reset-password-confirm",
  },
  {
    path: "/auth/confirm-email",
    component: EmailConfirmation,
    key: "confirm-email",
  },
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
