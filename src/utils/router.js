/**
 * SPA 라우팅 시스템
 */

import { HomePage } from "../pages/HomePage.js";
import { ProductDetailPage } from "../pages/ProductDetailPage.js";
import { NotFound } from "../components/NotFound.js";
import { matchPath } from "./urlManager.js";
import { initLinkInterceptor } from "./navigation.js";
import { BASE_PATH } from "../config/constants.js";

// 라우트 정의 (base path 제외)
const routes = [
  {
    path: "/",
    component: HomePage,
    exact: true,
  },
  {
    path: "/product/:id",
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
 * 현재 경로 가져오기 (base path 제거)
 * @returns {string} Base path가 제거된 현재 경로
 */
const getCurrentPath = () => {
  const fullPath = window.location.pathname;
  // BASE_PATH가 '/'로 끝나면 제거
  const basePath = BASE_PATH.endsWith("/") && BASE_PATH !== "/" ? BASE_PATH.slice(0, -1) : BASE_PATH;

  if (fullPath.startsWith(basePath)) {
    return fullPath.slice(basePath.length) || "/";
  }

  return fullPath;
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

  const match = findRoute(path);

  if (match) {
    const { route, params } = match;
    root.innerHTML = route.component(params);
  } else {
    // 404 페이지
    root.innerHTML = NotFound();
  }

  // 페이지 렌더링 후 장바구니 아이콘 개수 업데이트
  setTimeout(async () => {
    const { updateCartIconCount } = await import("./cartManager.js");
    updateCartIconCount();
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
