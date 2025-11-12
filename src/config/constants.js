/**
 * 애플리케이션 전역 상수
 */

/**
 * vite.config.js에서 base 경로를 가져옴
 * @returns {string} Base path
 */
export const getBasePath = () => {
  return import.meta.env.BASE_URL || "/";
};

export const BASE_PATH = getBasePath();
