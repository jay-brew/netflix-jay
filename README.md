# Netflix Clone

TMDB API를 활용해 제작한 **Netflix 스타일 영화 정보 웹 애플리케이션**입니다.
React와 Redux를 이용한 상태 관리, 외부 API 연동, 검색/필터링 기능을 학습하기 위해 진행한 개인 프로젝트입니다.

## Features

* 인기 / 높은 평점 / 개봉 예정 영화 조회
* 영화 제목 검색
* 장르별 필터링
* 개봉 연도 범위 필터
* 평점 오름차순 / 내림차순 정렬
* 페이지네이션
* 영화 상세 정보 조회
* 리뷰 및 추천 영화 조회
* YouTube 예고편 재생

## Tech Stack

* React
* JavaScript
* Redux / Redux Thunk
* React Router
* Axios
* React Bootstrap
* TMDB API

## Getting Started

```bash
git clone https://github.com/jay-brew/netflix-jay.git
cd netflix-jay
yarn install
```

프로젝트 루트에 `.env` 파일을 생성합니다.

```env
REACT_APP_API_KEY=YOUR_TMDB_API_KEY
```

실행:

```bash
yarn start
```

## Notes

React와 Redux의 데이터 흐름 및 외부 API 연동을 익히기 위해 제작한 개인 학습 프로젝트입니다.

현재 관점에서는 API 로직 분리, 공통 Loading/Error 처리, Redux Toolkit 적용 등의 개선 여지가 있습니다.

## Reference

Movie data provided by TMDB.

> This project is a personal study project and is not affiliated with Netflix or TMDB.
