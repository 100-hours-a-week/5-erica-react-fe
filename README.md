# 🎙️Amumal Community

<div align="center">
  <img src="https://github.com/100-hours-a-week/5-erica-express-all/assets/81230764/d6a99652-7099-4ed4-bfba-974b762875b2" style="width: 300px; margin:auto;"/>
</div>
<br/>

## 프로젝트 소개

- 해당 프로젝트는 Kakao Cloud School in JEJU에서 진행한 프로젝트입니다.
- 게시글을 작성하고 댓글을 달 수 있습니다.
  <br/>

## 1. 개발 환경

- Front-end: React, Js
- 개발 및 이슈 관리: Github
- 디자인: [Figma](https://www.figma.com/file/uzVLRNRe4ocdIjr7xegIuf/%EA%B5%90%EC%9E%AC%EC%9A%A9-%EC%BB%A4%EB%AE%A4%EB%8B%88%ED%8B%B0-%EC%9B%B9?type=design&node-id=670-761&mode=design&t=SrSse8WnMccf06Nw-0)
  <br/>

## 2. 프로젝트 구조

- Front-end
  ```
  ├── README.md
  ├── .gitignore
  ├── package-lock.json
  ├── package.json
  ├── public
  │    ├── index.html
  │    ├── manifest.json
  │    └── robots.txt
  └── src
       ├── App.js
       ├── App.test.js
       ├── index.css
       ├── index.js
       ├── logo.svg
       ├── reportWebVitals.js
       ├── setupTests.js
       ├── static.js
       ├── components
       │     ├── comments
       │     │     ├── AddComment.js
       │     │     ├── Comment.js
       │     │     └── Comments.js
       │     ├── modals
       │     │     ├── DeleteCommentModal.js
       │     │     ├── DeletePostModal.js
       │     │     └── Modals.js
       │     ├── posts
       │     │     └── MiniPost.js
       │     ├── users
       │     │     └── UpdateProfileImage.js
       │     ├── BackButton.js
       │     └── Navbar.js
       ├── pages
       │     ├── AddPostPage.jsx
       │     ├── LogInPage.jsx
       │     ├── PostDetailPage.jsx
       │     ├── PostPage.jsx
       │     ├── SignUpPage.jsx
       │     ├── UpdatePasswordPage.jsx
       │     ├── UpdatePostPage.jsx
       │     └── UpdateProfilePage.jsx
       ├── images
       │     ├── back.png
       │     └── profile_img.webp
       ├── hooks
       │     └── useFetch.js
       ├── utils
       │     ├── numberToK.js
       │     └── scroll.js
       └── styles
             ├── AddComment.module.css
             ├── AddPost.module.css
             ├── Comment.module.css
             ├── Comments.module.css
             ├── LogIn.module.css
             ├── MiniPost.module.css
             ├── Navbar.module.css
             ├── PostDetail.module.css
             ├── PostModal.module.css
             ├── Posts.module.css
             ├── SignUp.module.css
             ├── UpdatePassword.module.css
             ├── UpdatePost.module.css
             ├── UpdateProfile.module.css
             └── UserImage.module.css
  ```
  <br/>

## 3. 개발 기간

- 전체 개발 기간: 2024-05-03 ~
  <br/>

## 4. 페이지별 기능

### [ 로그인 ]

- 서비스 접속 초기화면으로 로그인 페이지가 나타납니다.
- 로그인 성공 시 버튼색이 진보라색으로 변경되고, 3초 후 게시물 목록 페이지로 이동합니다.

### [ 회원가입 ]

- 이메일, 닉네임, 비밀번호, 비밀번호 확인 입력 시 유효성 검사 진행, 통과하지 못한 경우 helper text 표시

  |                                                             로그인 화면                                                             |                                                            회원가입 화면                                                            |
  | :---------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
  |![ezgif-7-9cf70996a7](https://github.com/100-hours-a-week/5-erica-express-all/assets/81230764/5cffbb87-102c-42f9-9086-e33cd5494af5) | ![ezgif-7-fd2d32913e](https://github.com/100-hours-a-week/5-erica-express-all/assets/81230764/76367ca3-b0ed-4c5c-8cb7-dde981e17f90) |

### [ 게시글 ]

- 로그인 성공 시 게시글 목록이 나타납니다.
- 각 게시글을 클릭하면 해당 게시글 상세 페이지로 이동합니다.
- 게시글 작성 버튼을 클릭하면 게시글 작성 페이지로 이동합니다.

  |                                                          게시글 목록 화면                                                           |                                                          게시글 상세 화면                                                           |                                                          게시글 작성 화면                                                           |
  | :---------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
  | ![ezgif-7-7897923f44](https://github.com/100-hours-a-week/5-erica-express-all/assets/81230764/db02d6d2-4be3-4075-a61c-54f175096103) | ![ezgif-7-c9f0425c80](https://github.com/100-hours-a-week/5-erica-express-all/assets/81230764/cf3e5f43-09b3-45f2-bec1-6b999de6b568) | ![ezgif-7-95a14bede5](https://github.com/100-hours-a-week/5-erica-express-all/assets/81230764/89cc7736-f53e-436f-bc93-2ee2d85a8263) |

### [ 게시글 수정/삭제 ]

- 게시글 상세 페이지에서 수정 버튼을 누르면 게시글 수정 페이지로 이동합니다.
- 게시글 상세 페이지에서 삭제 버튼을 누르면 게시글 삭제 모달이 나타나고, 확인을 누르면 게시글이 삭제됩니다.
- 게시글 수정/삭제 시, 본인이 작성한 게시글인지 확인한 후, 본인이 작성한 게시글이 아닐 경우 alert가 나타납니다.

  |                                                          게시글 수정 화면                                                           |                                                          게시글 삭제 화면                                                           |                                                          게시글 alert 화면                                                          |
  | :---------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
  | ![ezgif-7-024d4a78ac](https://github.com/100-hours-a-week/5-erica-express-all/assets/81230764/affa0d60-746e-4422-bb8c-c4f0308d4e88) | ![ezgif-7-7ca1c4f5eb](https://github.com/100-hours-a-week/5-erica-express-all/assets/81230764/1a8461de-20e6-4d06-b35d-acbf51e2cb1a) | ![ezgif-7-3d2c8fbbb2](https://github.com/100-hours-a-week/5-erica-express-all/assets/81230764/674f1285-a095-4888-a4c3-cdcd67b1bd8e) |

### [ 댓글 목록/수정/삭제]

- 게시글 상세 페이지 하단에 게시물에 달린 댓글 목록들이 나타납니다.
- 댓글 수정 버튼을 누르면 댓글 작성란이 수정란으로 바뀌면서 댓글을 수정할 수 있습니다.
- 댓글 삭제 버튼을 누르면 댓글 삭제 모달이 나타나고, 확인을 누르면 댓글이 삭제됩니다.
- 댓글 수정/삭제 시, 본인이 작성한 댓글인지 확인한 후, 본인이 작성한 댓글이 아닐 경우 alert가 나타납니다.

  |                                                              댓글 화면                                                              |                                                           댓글 수정 화면                                                            |
  | :---------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
  | ![ezgif-7-7897923f44](https://github.com/100-hours-a-week/5-erica-express-all/assets/81230764/4032e40e-8978-4b06-a8ef-334a0fbd4072) | ![ezgif-7-956149d230](https://github.com/100-hours-a-week/5-erica-express-all/assets/81230764/234c92ec-7496-4146-8547-2f81158f035e) |

  |                                                           댓글 삭제 화면                                                            |                                                           댓글 alert 화면                                                           |
  | :---------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
  | ![ezgif-2-639f7d73b3](https://github.com/100-hours-a-week/5-erica-express-all/assets/81230764/0e4689a0-bf6f-4135-b80d-c9d74602a10b) | ![ezgif-1-4ceb009e8a](https://github.com/100-hours-a-week/5-erica-express-all/assets/81230764/69a7ca44-36ed-4c9d-bda9-50fcc4477bec) |

### [ 회원정보 수정/삭제, 로그아웃 ]

- navbar의 프로필 사진 hover시 메뉴바가 나타납니다.
- 회원정보 수정을 클릭하면 회원정보 수정 화면으로 이동됩니다.
- 회원정보 수정이 완료되면 게시물 목록 화면으로 이동됩니다.
- 비밀번호 수정을 클릭하면 비밀번호 수정 화면으로 이동됩니다.
- 비밀번호 수정이 완료되면 로그인 화면으로 이동됩니다.
- 로그아웃을 클릭하면 로그아웃이 되며 초기 로그인 화면으로 이동됩니다.

  |                                                            회원정보 수정                                                            |                                                            비밀번호 수정                                                            |                                                              로그아웃                                                               |
  | :---------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
  | ![ezgif-2-a1373dcb28](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/5111ff19-4eae-4cec-b18a-72964997d7fc)| ![ezgif-1-ec81877ba0](https://github.com/100-hours-a-week/5-erica-express-all/assets/81230764/689893ec-6bf7-4191-aa81-450e792962db) | ![ezgif-1-d56452a0bf](https://github.com/100-hours-a-week/5-erica-express-all/assets/81230764/e6910ec7-4d85-4355-b58b-56256e0d7c72) |
