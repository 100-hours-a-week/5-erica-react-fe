import { backHost } from "../static";

export const FetchUrl = {
  logOut: `${backHost}/api/users/logOut`,
  posts: `${backHost}/api/posts`,
  email: `${backHost}/api/users/email`,
  nickname: `${backHost}/api/users/nickname`,
  profile: `${backHost}/api/users/user/profile`,
  checkPostOwner: `${backHost}/api/posts/checkOwner`,
  signUpNickname: `${backHost}/api/users/signup/nickname`,
  user: `${backHost}/api/users/user`,
  logIn: `${backHost}/api/users/logIn`,
  signUp: `${backHost}/api/users/signup`,
  userPassword: `${backHost}/api/users/user/password`,
  userWriteCount: `${backHost}/api/users/myWrite`,
  myPosts: `${backHost}/api/posts/myPosts`,
  otherPosts: `${backHost}/api/posts/other`,
  codingPosts: `${backHost}/api/posts/coding`,
};
