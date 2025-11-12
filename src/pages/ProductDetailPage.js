/**
 * 상품 상세 페이지
 */

import { GlobalLayout } from "../components/layout/GlobalLayout.js";
import { ProductDetail } from "../components/product/ProductDetail.js";
import { getProduct, getProducts } from "../api/productApi.js";

/**
 * 상품 상세 페이지 컴포넌트
 * @param {Object} params - 라우트 파라미터
 * @param {string} params.id - 상품 ID
 */
export const ProductDetailPage = (params = {}) => {
  const { id: productId } = params;

  if (!productId) {
    return GlobalLayout({
      children: `
        <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div class="text-red-600 mb-2">
            <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-red-900 mb-2">상품을 찾을 수 없습니다</h3>
          <p class="text-red-700 mb-4">올바른 상품 ID가 아닙니다.</p>
          <a href="/" 
             data-link
             class="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            상품 목록으로 돌아가기
          </a>
        </div>
      `,
      isDetailPage: true,
    });
  }

  // 로딩 상태 먼저 표시
  setTimeout(async () => {
    const mainContent = document.querySelector("main");
    if (!mainContent) return;

    try {
      // 상품 정보 로드
      const product = await getProduct(productId);

      // 관련 상품 로드 (같은 category2, 현재 상품 제외)
      let relatedProductsHTML = "";
      if (product.category2) {
        const relatedResponse = await getProducts({
          category1: product.category1,
          category2: product.category2,
          limit: 100, // 충분히 많이 가져오기
        });

        // 현재 상품 제외하고 필터링
        const relatedProducts = relatedResponse.products.filter((p) => p.productId !== productId);

        if (relatedProducts.length > 0) {
          relatedProductsHTML = `
            <div class="bg-white rounded-lg shadow-sm">
              <div class="p-4 border-b border-gray-200">
                <h2 class="text-lg font-bold text-gray-900">관련 상품</h2>
                <p class="text-sm text-gray-600">같은 카테고리의 다른 상품들</p>
              </div>
              <div class="p-4">
                <div class="grid grid-cols-2 gap-3 responsive-grid" id="related-products-grid">
                  ${relatedProducts
                    .map(
                      (p) => `
                    <div class="bg-gray-50 rounded-lg p-3 related-product-card cursor-pointer" data-product-id="${p.productId}">
                      <div class="aspect-square bg-white rounded-md overflow-hidden mb-2">
                        <img src="${p.image}" 
                             alt="${p.title}" 
                             class="w-full h-full object-cover" 
                             loading="lazy">
                      </div>
                      <h3 class="text-sm font-medium text-gray-900 mb-1 line-clamp-2">${p.title}</h3>
                      <p class="text-sm font-bold text-blue-600">${parseInt(p.lprice).toLocaleString()}원</p>
                    </div>
                  `,
                    )
                    .join("")}
                </div>
              </div>
            </div>
          `;
        }
      }

      // 상세 정보 렌더링
      mainContent.innerHTML = ProductDetail({ product, relatedProductsHTML });

      // 상세 페이지 이벤트 핸들러 초기화
      const { initProductDetailHandler } = await import("../utils/productDetailHandler.js");
      initProductDetailHandler(product);
    } catch (error) {
      console.error("Error loading product detail:", error);
      mainContent.innerHTML = `
        <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div class="text-red-600 mb-2">
            <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-red-900 mb-2">상품을 불러올 수 없습니다</h3>
          <p class="text-red-700 mb-4">${error.message || "상품 정보를 가져오는 중 오류가 발생했습니다."}</p>
          <a href="/" 
             data-link
             class="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            상품 목록으로 돌아가기
          </a>
        </div>
      `;
    }
  }, 0);

  // 로딩 UI 반환
  return GlobalLayout({
    children: `
      <div class="py-20 bg-gray-50 flex items-center justify-center">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p class="text-gray-600">상품 정보를 불러오는 중...</p>
        </div>
      </div>
    `,
    isDetailPage: true,
  });
};
