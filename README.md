![001](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/7f884653-458e-498a-9e0a-96fe8ea4987b)

# 🎙️오픈스퀘어
## 프로젝트 소개

**해당 프로젝트는 개인적인 고민과 개발을 주제로 서로 소통하는 커뮤니티 프로젝트입니다.**  

**개발 환경**     
- `사용 언어 및 라이브러리` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; React, JavaScript, HTML, CSS <br/>
- `개발 및 이슈 관리` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; VSCode, Github 
<br/>

**프로젝트 구조**

<details>
  <summary>폴더 구조 보기/숨기기</summary>
  <div markdown="1">
    
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
           ├── App.module.css
           ├── App.test.js
           ├── index.css
           ├── index.js
           ├── logo.svg
           ├── reportWebVitals.js
           ├── setupTests.js
           ├── static.js
           ├── components
           │     ├── button
           │     │     ├── LogOutButton.js
           │     │     └── PostButton.js
           │     ├── comments
           │     │     ├── AddComment.js
           │     │     ├── Comment.js
           │     │     └── Comments.js
           │     ├── input
           │     │     ├── EmailInput.js
           │     │     ├── NicknameInput.js
           │     │     └── PasswordInput.js
           │     ├── modals
           │     │     ├── DeleteCommentModal.js
           │     │     ├── DeletePostModal.js
           │     │     └── Modals.js
           │     ├── posts
           │     │     ├── AddPostContainer.js
           │     │     ├── MiniPost.js
           │     │     ├── PostAction.js
           │     │     ├── PostDetail.js
           │     │     ├── PostSkeleton.js
           │     │     ├── PostsSkeleton.js
           │     │     └── UpdatePostContainer.js
           │     ├── users
           │     │     ├── UpdatePasswordContainer.js
           │     │     ├── UpdateProfileContainer.js
           │     │     ├── UserProfile.js
           │     │     └── UserProfileImage.js
           │     ├── BackButton.js
           │     ├── Layout.jsx
           │     └── Navbar.js
           ├── hoc
           │     ├── withLoading.js
           │     └── withLogIn.js
           ├── pages
           │     ├── AddPostPage.jsx
           │     ├── Home.jsx
           │     ├── LogInPage.jsx
           │     ├── PostDetailPage.jsx
           │     ├── PostPage.jsx
           │     ├── SignUpPage.jsx
           │     ├── UpdatePasswordPage.jsx
           │     ├── UpdatePostPage.jsx
           │     └── UpdateProfilePage.jsx
           ├── imaegs
           │     ├── back.png
           │     ├── logo.png
           │     ├── side_banner.png
           │     ├── welcome.gif
           │     └── profile_img.webp
           ├── reducer
           │     ├── emailReducer.js
           │     ├── nicknameReducer.js
           │     ├── passwordCheckReducer.js
           │     └── passwordReducer.js
           ├── hooks
           │     ├── useFetch.js
           │     ├── UseFetchEvent.js
           │     ├── usePasswordValidation.js
           │     ├── usePosition.js
           │     ├── useShowProfile.js
           │     └── useSignUpValidation.js
           ├── utils
           │     ├── checkOwner.js
           │     ├── constant.js
           │     ├── errorMessage.js
           │     ├── fetchData.js
           │     ├── navigate.js
           │     ├── numberToK.js
           │     ├── scroll.js
           │     └── status.js
           └── styles
                 ├── button
                 ├── comment
                 ├── input
                 ├── post
                 ├── skeleton
                 ├── user
                 ├── Home.module.css
                 ├── Layot.module.css
                 ├── LogIn.module.css
                 ├── Navbar.module.css
                 ├── PostModal.module.css
                 └── SignUp.module.css
   
    
  </div>
</details> 
<br/>

**개발 기간**  
- `전체 개발 기간` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2024-05-03 ~ 2024-05-29
<br/>

**개발 인원 및 담당**  
- `개발 인원`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1명 (본인)
- `개발 담당`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 프론트엔드

<br/>

## 서비스 화면

`홈`
| 인트로 | 로그인 모달 | 회원가입 모달 |
|---|---|---|
|![홈](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/34e27bd3-65d7-4283-bbd5-ee22b672172a)|![로그인](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/98668876-b38a-44e5-955f-a83b3b52607c)|![ezgif-7-d5b2374724 (1)](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/f9a26dd9-6016-4ac3-84f8-21c5e856d314)|

  
`게시글 목록`

|전체 게시물|개발 게시물|고민 게시글|내 게시글|
|---|---|---|---|
|![image](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/d03e5a5d-5d39-4d49-bdb2-303ef31bc79d)|![image](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/fd5ab35c-9bd7-49d8-95c6-5e1e73e757d1)|![image](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/a04d6ffc-8448-4ad4-abd0-70a014d194a2)|![image](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/f99c44b3-ab8a-4cf4-ab11-9327fa7c432d)|

  
`게시물 작성 / 상세 / 수정 / 삭제`

|게시물 작성|게시물 상세|게시글 수정|게시글 삭제|
|---|---|---|---|
|![게시글 작성](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/84a6702d-4e39-4bfb-8229-47e8cd0317ab)|![게시글 상세](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/7a1f4b1e-47c6-4ad3-926b-4712658184e3)|![게시글 수정](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/a0f0f6ac-a4cb-47a3-933b-c5715405e5cd)|![게시글 삭제](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/f61b207a-2fff-4a38-a186-87c929e1642b)|
  

`댓글 목록 / 등록 / 수정 /삭제`

|댓글 목록|댓글 등록|댓글 수정|댓글 삭제|
|---|---|---|---|
|![댓글](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/af052804-9b9c-49fa-9eeb-489070c8d16a)|![댓글작성](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/9a9a3e87-25dd-44ae-a3ec-2f8bf98e32d0)|![댓글 수정](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/d6074187-9659-45fa-a169-e636a18955cc)|![댓글삭제](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/7aed1088-201e-46f6-be09-b03e2d0791fe)|

  
`프로필 수정 / 비밀번호 수정 / 회원 탈퇴 / 로그아웃`

|프로필 수정|비밀번호 수정|회원 탈퇴|로그아웃|
|---|---|---|---|
|![정보수정](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/f7c61feb-5658-4ae2-98d6-dcffeeac7ea8)|![비밀번호수정_g](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/96ab2c92-3c58-46a9-a049-5413b4aed15a)|![탈퇴g](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/b575fadd-5752-4ca8-ac20-4fe494852db9)|![로그아웃](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/3a7ce9b0-4f6e-40ca-8149-bf6edd1b755f)|

<br />

<br/>
<br/>
<br/>

<p align="center">
  <img src="https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/d611b233-b596-4d1d-bbb9-dc2e4e41eb47" style="width:400px; margin: 0 auto"/>
</p>
