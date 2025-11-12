/**
 * SPA 라우팅 시스템
 */

import { HomePage } from "../pages/HomePage.js";
import { ProductDetailPage } from "../pages/ProductDetailPage.js";
import { NotFound } from "../components/NotFound.js";
import { getCurrentPath, matchPath } from "./urlManager.js";
import { initLinkInterceptor } from "./navigation.js";

// 라우트 정의
const routes = [
  {
    path: "/front_7th_chapter2-1/",
    component: HomePage,
    exact: true,
  },
  {
    path: "/front_7th_chapter2-1/product/:id",
    component: ProductDetailPage,
  },
];

/**
 * 현재 경로에 맞는 라우트 찾기
 * @param {string} path - 현재 경로
 * @returns {Object|null} 매칭된 라우트와 파라미터
 */
const findRoute = (path) => {
  // 정확한 매칭 먼저 확인
  for (const route of routes) {
    if (route.exact && route.path === path) {
      return { route, params: {} };
    }
  }

  // 패턴 매칭
  for (const route of routes) {
    if (!route.exact) {
      const params = matchPath(route.path, path);
      if (params !== null) {
        return { route, params };
      }
    }
  }

  return null;
};

/**
 * 라우터 실행 - 현재 경로에 맞는 페이지 렌더링
 */
export const router = () => {
  const path = getCurrentPath();
  const root = document.getElementById("root");

  if (!root) {
    console.error("Root element not found");
    return;
  }

  console.log("path", path);
  const match = findRoute(path);

  if (match) {
    const { route, params } = match;
    root.innerHTML = route.component(params);
  } else {
    // 404 페이지
    root.innerHTML = NotFound();
  }

  // 페이지 렌더링 후 장바구니 핸들러 재초기화
  // (장바구니 아이콘은 모든 페이지에 존재)
  setTimeout(async () => {
    const { initCartHandler } = await import("./initCartHandler.js");
    initCartHandler();
  }, 0);
};

/**
 * 라우터 초기화
 */
export const initRouter = () => {
  // 링크 클릭 인터셉터 초기화
  initLinkInterceptor();

  // popstate 이벤트 (뒤로가기/앞으로가기)
  window.addEventListener("popstate", router);

  // 초기 페이지 렌더링
  router();
};
