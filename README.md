![001](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/7f884653-458e-498a-9e0a-96fe8ea4987b)

# 🎙️오픈스퀘어
## 프로젝트 소개

**해당 프로젝트는 개인적인 고민과 개발을 주제로 서로 소통하는 커뮤니티 프로젝트입니다.**  

**개발 환경**     
- `기술 스택`   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
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

**서비스 시연 영상**
- <a href="https://drive.google.com/file/d/1r5nhfgSoqopi0j6_GYv-twRqwGcv5qbA/view?usp=sharing" target="_blank">구글 드라이브</a>

<br/>

## 서비스 화면

`홈`
| 인트로 | 로그인 모달 | 회원가입 모달 |
|---|---|---|
|![image](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/a57cf720-321d-4ea4-8b07-12a67bf884ed)|![image](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/2b064bce-ce5a-4c47-a162-5cac4fce313b)|![image](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/d11c592f-ab70-47e9-b82c-9b950d1875ad)|

  
`게시글 목록`

|전체 게시물|개발 게시물|고민 게시글|내 게시글|
|---|---|---|---|
|![image](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/d03e5a5d-5d39-4d49-bdb2-303ef31bc79d)|![image](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/fd5ab35c-9bd7-49d8-95c6-5e1e73e757d1)|![image](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/a04d6ffc-8448-4ad4-abd0-70a014d194a2)|![image](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/f99c44b3-ab8a-4cf4-ab11-9327fa7c432d)|

  
`게시물 작성 / 상세 / 수정 / 삭제`

|게시물 작성|게시물 상세|게시글 수정|게시글 삭제|
|---|---|---|---|
|![image](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/a427bfca-0334-433c-9a8f-5ea0bededdcc)|![image](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/9a5b80bd-735b-4577-a78b-369d4422bef1)|![image](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/d3da8573-4e8e-4ad0-a4ec-d77958d48afe)|![image](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/dd9a6fe0-f48d-48a3-aeb7-192f88bdd8b3)|
  

`댓글 목록 / 등록 / 수정 /삭제`

|댓글 목록|댓글 등록|댓글 수정|댓글 삭제|
|---|---|---|---|
|![image](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/8178d223-048d-4d7d-bb72-6e44d555ecc9)|![image](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/749d122e-c49d-45c5-965b-3026570d1224)|![image](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/e85f499b-4410-4b15-9b6a-70897cde84ca)|![image](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/ea914f0a-074c-48b2-88ea-6a6efc338ff8)|

  
`프로필 수정 / 비밀번호 수정 / 회원 탈퇴 / 로그아웃`

|프로필 수정|비밀번호 수정|회원 탈퇴|로그아웃|
|---|---|---|---|
|![image](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/394dc685-8658-4447-a6ec-031edd84a38d)|![image](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/29d158f2-c9c3-492a-a1dc-9fa3df218a5a)|![image](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/9dcec60c-4733-4b9e-ba61-69d27cd39444)|![image](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/5f3eed2f-393a-4198-aa0d-8c852823c8e6)|

<br />

## 트러블 슈팅




## 프로젝트 후기
온전히 제 힘으로 구현하는 프로젝트는 처음이었기에, 두려움이 있었습니다. 경험해보지 못했던 에러나 어떻게 구현해야 할 지 감이 안오던 코드들을 마주했을 때 머리가 하얘지기도 했었습니다. 이를 해결하기 위해 책도 찾아보고 구글링도 하면서 여러 구현 방법들을 알게 되면서 점차 코딩하는게 재밌어졌습니다 :) 여러모로 많은 것들을 배웠던 것 같습니다. 아쉬운 점은 맞닥뜨렸던 에러를 해결한 것에 대해 기록을 제대로 하지 못한 점입니다.. 다음 프로젝트부터는 꼬박꼬박 기록하여 같은 실수를 반복하지 않도록 하겠습니다 !!

<br/>
<br/>
<br/>

<p align="center">
  <img src="https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/d611b233-b596-4d1d-bbb9-dc2e4e41eb47" style="width:200px; margin: 0 auto"/>
</p>
