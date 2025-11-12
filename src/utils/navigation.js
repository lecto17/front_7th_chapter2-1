/**
 * SPA 네비게이션 헬퍼 함수
 */

import { BASE_PATH } from "../config/constants.js";

/**
 * 프로그래밍 방식으로 페이지 이동
 * @param {string} path - 이동할 경로 (base path 제외)
 */
export const navigateTo = (path) => {
  // BASE_PATH가 '/'로 끝나면 제거
  const basePath = BASE_PATH.endsWith("/") && BASE_PATH !== "/" ? BASE_PATH.slice(0, -1) : BASE_PATH;

  // path가 '/'로 시작하지 않으면 추가
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  // base path와 경로 결합
  const fullPath = basePath === "/" ? normalizedPath : `${basePath}${normalizedPath}`;

  window.history.pushState({}, "", fullPath);
  // popstate 이벤트는 pushState에서는 발생하지 않으므로 직접 이벤트 발생
  window.dispatchEvent(new PopStateEvent("popstate"));
};

/**
 * 링크 클릭 이벤트 핸들러
 * data-link 속성이 있는 a 태그 클릭 시 SPA 방식으로 처리
 * @param {Event} e - 클릭 이벤트
 */
export const handleLinkClick = (e) => {
  const link = e.target.closest("a[data-link]");
  if (link) {
    e.preventDefault();
    const href = link.getAttribute("href");
    if (href) {
      navigateTo(href);
    }
  }
};

/**
 * 링크 클릭 인터셉터 초기화
 */
export const initLinkInterceptor = () => {
  document.addEventListener("click", handleLinkClick);
};
