import AboutUs from "./components/about/AboutUs";
import BlogPost from "./components/blog/BlogPost";
import ChangePasswordForm from "./components/authentication/ChangePasswordForm";
import CodeOfConduct from "./components/legal/CodeOfConduct";
import CommunityPage from "./pages/Community";
import EmailConfirmation from "./components/emailConfirmation/EmailConfirmation";
import FeedbackForm from "./components/forms/FeedbackForm";
import FeedbackList from "./components/admin/feedbacklist/FeedbackList";
import Home from "./pages/Home";
import KnowledgeBase from "./components/faq/KnowledgeBase";
import PasswordResetForm from "./components/authentication/PasswordResetForm";
import PasswordResetRequest from "./components/authentication/PasswordResetRequest";
import PostDetail from "./components/postDetail/PostDetails";
import PostForm from "./components/forms/PostForm";
import PrivacyPolicy from "./components/legal/PrivacyPolicy";
import Profile from "./components/user/profile/Profile";
import SignIn from "./components/authentication/sign-in/SignIn";
import SignUp from "./components/authentication/sign-up/SignUp";
import SupportPage from "./pages/SupportPage";
import TermsOfService from "./components/legal/TermsOfService";
import UserGuides from "./components/guides/UserGuides";
import UserList from "./components/admin/userlist/UserList";
import SavedPosts from "./components/savedPost/SavedPosts";

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
    path: "/auth/change-password/:userId",
    component: ChangePasswordForm,
    key: "change-password",
  },
  {
    path: "/auth/reset-password",
    component: PasswordResetRequest,
    key: "reset-password",
  },
  {
    path: "/auth/reset-password-confirm/:resetToken",
    component: PasswordResetForm,
    key: "reset-password-confirm",
  },
  {
    path: "/auth/confirm-email/:token",
    component: EmailConfirmation,
    key: "confirm-email",
  },
  {
    path: "legal/terms-of-service",
    component: TermsOfService,
    key: "terms-of-service",
  },
  {
    path: "legal/privacy-policy",
    component: PrivacyPolicy,
    key: "privacy-policy",
  },
  {
    path: "legal/code-of-conduct",
    component: CodeOfConduct,
    key: "code-of-conduct",
  },
  {
    path: "/about-us",
    component: AboutUs,
    key: "about-us",
  },
  {
    path: "/blog",
    component: BlogPost,
    key: "blog",
  },
  //   {
  //     path: "/docs",
  //     component: Docs,
  //     key: "docs",
  //   },
  {
    path: "/support/faq",
    component: KnowledgeBase,
    key: "faq",
  },
  {
    path: "/support/user-guides",
    component: UserGuides,
    key: "user-guides",
  },
  //   {
  //     path: "/help-desk",
  //     component: HelpDesk,
  //     key: "help-desk",
  //   },
];

export default routes;
