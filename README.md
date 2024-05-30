# 🎙️오픈스퀘어
![001](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/7f884653-458e-498a-9e0a-96fe8ea4987b)

## 🟡 프로젝트 소개

- 해당 프로젝트는 Kakao Cloud School in JEJU에서 진행한 프로젝트입니다.
- 개발 및 고민에 관한 글을 작성하고 사용자들과 소통하는 커뮤니티입니다.
  
  <br/>

## 🟡 개발 환경

- Front-end: React, Js
- 개발 및 이슈 관리: Github
- 디자인: [Figma](https://www.figma.com/file/uzVLRNRe4ocdIjr7xegIuf/%EA%B5%90%EC%9E%AC%EC%9A%A9-%EC%BB%A4%EB%AE%A4%EB%8B%88%ED%8B%B0-%EC%9B%B9?type=design&node-id=670-761&mode=design&t=SrSse8WnMccf06Nw-0)

<br/>

## 🟡 프로젝트 구조

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
  ```
  <br/>

## 🟡 개발 기간

- 전체 개발 기간: 2024-05-03 ~ 2024-05-29

<br/>

## 🟡 페이지별 기능

### [ 홈 ]
| 인트로 화면 | 로그인 모달 | 회원가입 모달 |
|---|---|---|
|![홈](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/34e27bd3-65d7-4283-bbd5-ee22b672172a)|![로그인](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/98668876-b38a-44e5-955f-a83b3b52607c)|![ezgif-7-d5b2374724 (1)](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/f9a26dd9-6016-4ac3-84f8-21c5e856d314)|

- 인트로 로직
  ```
  - 서비스 접속 초기화면으로 intro 화면이 나옵니다.
  - intro 화면에는 로그인 버튼과 회원가입 버튼이 있으며 hover시 색이 변합니다(clickable)
  - 로그인 버튼을 클릭 시 로그인 모달이 나타납니다.
  - 회원가입 버튼을 클릭 시 회원가입 모달이 나타납니다.
  ```

- 로그인 로직
  ```
  - 로그인 버튼 클릭 시 로그인 모달이 나옵니다.
  - 로그인 성공 시 하단 버튼이 진달래색 변경 후 3초 뒤 게시물 목록 페이지로 이동됩니다.
  ```

- 회원가입 로직
  ```
  - 회원가입 버튼 클릭 시 회원가입 모달이 나옵니다.
  - 요구 입력 유효성 검사 통과 시 회원가입 가능합니다.
  - 회원가입이 완료되면 로그인 모달이 나옵니다. 
  ```


### [ 게시글 목록 ]

|전체 게시물|개발 게시물|
|---|---|
|![image](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/d03e5a5d-5d39-4d49-bdb2-303ef31bc79d)|![image](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/fd5ab35c-9bd7-49d8-95c6-5e1e73e757d1)|

|고민 게시글|내 게시글|
|---|---|
|![image](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/a04d6ffc-8448-4ad4-abd0-70a014d194a2)|![image](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/f99c44b3-ab8a-4cf4-ab11-9327fa7c432d)|


- 게시물 목록 로직
  <img src="https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/3703a278-bf9c-467e-bfe1-3bb63432cc95" src="1000px" />
  ```
  - 로그인 성공 시 게시글 목록이 나타납니다.
  - 위의 탭을 누르면 각 탭과 관련된 게시글 목록이 나타납니다.
  - 게시물 목록 중 하나를 선택하면 게시물 상세 조회 화면으로 이동됩니다.
  ```
  

### [ 게시물 작성 / 상세 ]

|게시물 작성|게시물 상세|
|---|---|
|![게시글 작성](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/84a6702d-4e39-4bfb-8229-47e8cd0317ab)|![게시글 상세](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/7a1f4b1e-47c6-4ad3-926b-4712658184e3)|


- 게시물 작성 로직  
  ```
  - 게시물 목록 화면에서 위의 나의 생각 나누기 버튼 클릭 시 작성 화면으로 이동됩니다.
  - 게시물 제목* (26자 이내), 내용*, 게시물 이미지 입력 후 완료 버튼 클릭 시 게시글이 작성 완료됩니다.
  - 게시글 작성 완료 시 작성한 게시물 상세 화면으로 이동됩니다.
  ```

- 게시물 상세 로직
  ```
  - 게시물 목록 화면에서 게시글 클릭 시 게시글 상세 화면으로 이동됩니다.
  - 게시글 상세 화면에서 해당 게시글의 제목, 내용, 사진, 댓글들이 보여집니다.
  ```

### [ 게시글 수정 /삭제 ]

|게시글 수정 화면|게시글 삭제 화면|
|---|---|
|![게시글 수정](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/a0f0f6ac-a4cb-47a3-933b-c5715405e5cd)|![게시글 삭제](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/f61b207a-2fff-4a38-a186-87c929e1642b)|

- 게시물 수정 로직
  ```
  - 게시글 상세 페이지에서 수정 버튼을 누르면 게시글 수정 페이지로 이동합니다.
  - 수정 화면에서 제목, 내용, 사진을 수정할 수 있습니다.
  ```
  
- 게시물 삭제 로직
  ```
  - 게시글 상세 페이지에서 삭제 버튼을 누르면 게시글 삭제 모달이 나타납니다.
  - 만약 본인이 작성하지 않은 글을 삭제하려는 경우 alert로 본인이 작성하지 않은 게시물 문구가 뜹니다.
  - 게시글 삭제 모달에서 확인을 누르면 게시글이 삭제되고 게시글 목록 화면으로 이동됩니다.
  ```

### [ 댓글 목록 / 등록 ]

|댓글 목록 화면|댓글 등록 화면|
|---|---|
|![댓글](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/af052804-9b9c-49fa-9eeb-489070c8d16a)|![댓글작성](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/9a9a3e87-25dd-44ae-a3ec-2f8bf98e32d0)|

- 댓글 로직
  ```
  - 게시글 상세 페이지 하단에 댓글 목록이 보여집니다.
  - 댓글이 없을 시 댓글 작성란만 보여집니다.
  ```

- 댓글 등록 로직
  ```
  - 댓글 작성란에 내용을 입력하고 등록 버튼을 누르면 댓글이 등록됩니다.
  ```


### [ 댓글 수정 / 삭제 ]

|댓글 수정 화면|댓글 삭제 화면|
|---|---|
|![댓글 수정](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/d6074187-9659-45fa-a169-e636a18955cc)|![댓글삭제](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/7aed1088-201e-46f6-be09-b03e2d0791fe)|

- 댓글 수정 로직
  ```
  - 댓글 수정 버튼을 누르면 댓글 작성란이 수정란으로 바뀌면서 댓글을 수정할 수 있습니다.
  - 수정할 내용을 입력하시고 수정 버튼을 누르면 댓글이 수정됩니다.
  ```

- 댓글 삭제 로직
  ```
  - 댓글 삭제 버튼을 누르면 댓글 삭제 모달이 나타나고, 확인을 누르면 댓글이 삭제됩니다.
  - 댓글 수정/삭제 시, 본인이 작성한 댓글인지 확인한 후, 본인이 작성한 댓글이 아닐 경우 alert가 나타납니다.
  ```

### [ 프로필 수정 / 비밀번호 수정 ]

|프로필 수정 화면|비밀번호 수정 화면|
|---|---|
|![정보수정](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/f7c61feb-5658-4ae2-98d6-dcffeeac7ea8)|![비밀번호수정_g](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/96ab2c92-3c58-46a9-a049-5413b4aed15a)|

- 프로필 수정 로직
  ```
  - navbar의 프로필 사진 hover시 메뉴바가 나타납니다.
  - 프로필 수정을 클릭하면 회원정보 수정 화면으로 이동됩니다.
  - 프로필 사진, 닉네임 수정 가능합니다.
  - 수정하고 싶은 닉네임이 이미 존재할 시, hyperText로 경고문이 나타납니다. 이때 해당 닉네임으로는 수정이 불가합니다.
  - 회원정보 수정이 완료되면 게시물 목록 화면으로 이동됩니다.
  ```

- 비밀번호 수정 로직
  ```
  - navbar의 프로필 사진 hover시 메뉴바가 나타납니다.
  - 비밀번호 수정을 클릭하면 회원정보 수정 화면으로 이동됩니다.
  - 수정할 비밀번호를 입력한 후, 유효성 검사가 통과되면 버튼이 활성화됩니다.
  - 비밀번호 수정이 완료되면, 로그아웃이 되면서 홈 화면으로 이동됩니다. (재로그인 필요)
  ```


### [ 회원 탈퇴 / 로그아웃 ]

|회원 탈퇴 화면|로그아웃 화면|
|---|---|
|![탈퇴g](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/b575fadd-5752-4ca8-ac20-4fe494852db9)|![로그아웃](https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/3a7ce9b0-4f6e-40ca-8149-bf6edd1b755f)|

- 회원 탈퇴 로직
  ```
  - navbar의 프로필 사진 hover시 메뉴바가 나타납니다.
  - 회원정부 수정을 클릭하면 회원정보 수정 화면으로 이동됩니다.
  - 화면 하단의 회원 탈퇴 버튼을 클릭하면 회원 탈퇴 모달이 나타납니다.
  - 모달에서 확인 버튼을 누르면 계정이 삭제되고 홈 화면으로 돌아갑니다.
  ```

- 로그아웃 로직
  ```
  - navbar의 프로필 사진 hover시 메뉴바가 나타납니다.
  - 로그아웃을 클릭하면 로그아웃이 되며 초기 로그인 화면으로 이동됩니다.
  ```

<br/>
<br/>
<br/>

<p align="center">
  <img src="https://github.com/100-hours-a-week/5-erica-react-fe/assets/81230764/d611b233-b596-4d1d-bbb9-dc2e4e41eb47" style="width:400px; margin: 0 auto"/>
</p>
