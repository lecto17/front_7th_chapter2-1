/**
 * URL 쿼리 파라미터를 관리하는 모듈
 */

/**
 * 현재 URL의 쿼리 파라미터를 객체로 반환
 * @returns {Object} 쿼리 파라미터 객체
 */
export const getQueryParams = () => {
  const params = new URLSearchParams(window.location.search);
  const result = {};

  for (const [key, value] of params.entries()) {
    result[key] = value;
  }

  return result;
};

/**
 * 필터 상태를 URL에 반영
 * @param {Object} filters - 필터 객체
 */
export const updateURL = (filters) => {
  const params = new URLSearchParams();

  // 값이 있는 필터만 URL에 추가
  Object.keys(filters).forEach((key) => {
    const value = filters[key];
    if (value !== "" && value !== null && value !== undefined) {
      // limit과 sort는 기본값이 아닐 때만 추가
      if (key === "limit" && value === 20) return;
      if (key === "sort" && value === "price_asc") return;

      params.set(key, value);
    }
  });

  const newURL = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;

  // URL 업데이트 (페이지 새로고침 없이)
  window.history.pushState({}, "", newURL);
};

/**
 * URL에서 필터 상태 읽어오기
 * @returns {Object} URL의 필터 상태
 */
export const getFiltersFromURL = () => {
  const params = getQueryParams();

  return {
    search: params.search || "",
    category1: params.category1 || "",
    category2: params.category2 || "",
    limit: params.limit ? parseInt(params.limit) : 20,
    sort: params.sort || "price_asc",
  };
};
