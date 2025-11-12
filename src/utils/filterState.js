/**
 * 필터 상태를 전역으로 관리하는 모듈
 * 검색어, 카테고리, 정렬, 개수 등의 필터 상태를 중앙에서 관리합니다.
 */

import { updateURL, getFiltersFromURL } from "./urlManager";

// 기본 필터 상태
const defaultFilters = {
  search: "",
  category1: "",
  category2: "",
  limit: 20,
  sort: "price_asc",
};

// 현재 필터 상태 (전역 상태)
// 초기 로드 시 URL에서 필터 복원
let currentFilters = { ...defaultFilters, ...getFiltersFromURL() };

/**
 * 현재 필터 상태를 조회합니다.
 * @returns {Object} 현재 필터 상태
 */
export const getCurrentFilters = () => {
  return { ...currentFilters };
};

/**
 * 필터 상태를 업데이트합니다.
 * @param {Object} newFilters - 업데이트할 필터 (부분 업데이트 가능)
 * @returns {Object} 업데이트된 필터 상태
 */
export const updateFilters = (newFilters) => {
  currentFilters = {
    ...currentFilters,
    ...newFilters,
  };

  // URL도 함께 업데이트
  updateURL(currentFilters);

  return { ...currentFilters };
};

/**
 * 필터 상태를 초기화합니다.
 */
export const resetFilters = () => {
  currentFilters = { ...defaultFilters };

  // URL도 함께 업데이트
  updateURL(currentFilters);

  return { ...currentFilters };
};
