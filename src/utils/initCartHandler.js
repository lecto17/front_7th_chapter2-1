/**
 * 장바구니 이벤트 핸들러 초기화
 */

import { addToCart, updateCartIconCount } from "./cartManager.js";
import { showSuccessToast, showErrorToast } from "./toastManager.js";
import { openCartModal } from "./cartModalManager.js";

/**
 * 장바구니 추가 버튼 이벤트 핸들러 초기화
 * 이벤트 위임을 사용하여 동적으로 추가되는 상품에도 대응
 */
export const initCartHandler = () => {
  // 페이지 로드 시 장바구니 아이콘 개수 업데이트
  updateCartIconCount();

  // 이벤트 위임: document에 이벤트 리스너 등록
  document.addEventListener("click", (event) => {
    const target = event.target;

    // 장바구니 아이콘 클릭
    if (target.id === "cart-icon-btn" || target.closest("#cart-icon-btn")) {
      event.preventDefault();
      openCartModal();
      return;
    }

    // 장바구니 담기 버튼 클릭
    if (target.classList.contains("add-to-cart-btn") || target.closest(".add-to-cart-btn")) {
      const button = target.classList.contains("add-to-cart-btn") ? target : target.closest(".add-to-cart-btn");

      handleAddToCart(button);
    }
  });
};

/**
 * 장바구니 추가 처리
 * @param {HTMLElement} button - 클릭된 버튼 엘리먼트
 */
const handleAddToCart = (button) => {
  try {
    // data attributes에서 상품 정보 추출
    const productId = button.getAttribute("data-product-id");
    const title = button.getAttribute("data-product-title");
    const price = button.getAttribute("data-product-price");
    const image = button.getAttribute("data-product-image");
    const brand = button.getAttribute("data-product-brand");

    // 필수 정보 확인
    if (!productId || !title || !price) {
      console.error("상품 정보가 불완전합니다:", { productId, title, price });
      showErrorToast("상품 정보를 불러올 수 없습니다.");
      return;
    }

    // 장바구니에 추가
    const result = addToCart({
      productId,
      title,
      price: parseInt(price),
      image,
      brand,
      quantity: 1,
    });

    if (result.success) {
      // 성공 메시지 표시
      showSuccessToast("장바구니에 추가되었습니다");

      // 장바구니 아이콘 개수 업데이트
      updateCartIconCount();
    } else {
      showErrorToast("장바구니에 추가할 수 없습니다.");
    }
  } catch (error) {
    console.error("장바구니 추가 오류:", error);
    showErrorToast("오류가 발생했습니다.");
  }
};
