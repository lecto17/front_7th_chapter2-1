/**
 * 장바구니 관리 유틸리티
 * localStorage를 사용하여 장바구니 상태를 관리합니다.
 */

const CART_STORAGE_KEY = "shopping_cart";

/**
 * 장바구니 데이터 구조:
 * [
 *   {
 *     productId: string,
 *     title: string,
 *     price: number,
 *     image: string,
 *     brand: string,
 *     quantity: number
 *   }
 * ]
 */

/**
 * 장바구니 목록 조회
 * @returns {Array} 장바구니 상품 목록
 */
export const getCart = () => {
  try {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error("장바구니 조회 오류:", error);
    return [];
  }
};

/**
 * 장바구니에 상품 추가
 * 이미 있는 상품이면 수량 증가
 * @param {Object} product - 추가할 상품 정보
 * @param {string} product.productId - 상품 ID
 * @param {string} product.title - 상품명
 * @param {number} product.price - 가격
 * @param {string} product.image - 이미지 URL
 * @param {string} product.brand - 브랜드명
 * @param {number} [product.quantity=1] - 수량
 * @returns {Object} 업데이트된 장바구니 정보
 */
export const addToCart = (product) => {
  try {
    const cart = getCart();
    const existingItemIndex = cart.findIndex((item) => item.productId === product.productId);

    if (existingItemIndex > -1) {
      // 이미 장바구니에 있는 상품이면 수량 증가
      cart[existingItemIndex].quantity += product.quantity || 1;
    } else {
      // 새로운 상품 추가
      cart.push({
        productId: product.productId,
        title: product.title,
        price: product.price,
        image: product.image,
        brand: product.brand || "",
        quantity: product.quantity || 1,
      });
    }

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));

    return {
      success: true,
      cart,
      count: getCartCount(),
    };
  } catch (error) {
    console.error("장바구니 추가 오류:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * 장바구니 상품 개수 조회 (상품 종류의 개수)
 * @returns {number} 장바구니에 담긴 상품 종류의 개수
 */
export const getCartCount = () => {
  const cart = getCart();
  return cart.length; // 상품 종류의 개수
};

/**
 * 장바구니에서 상품 삭제
 * @param {string} productId - 삭제할 상품 ID
 * @returns {boolean} 삭제 성공 여부
 */
export const removeFromCart = (productId) => {
  try {
    const cart = getCart();
    const filteredCart = cart.filter((item) => item.productId !== productId);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(filteredCart));
    return true;
  } catch (error) {
    console.error("장바구니 삭제 오류:", error);
    return false;
  }
};

/**
 * 장바구니 비우기
 * @returns {boolean} 성공 여부
 */
export const clearCart = () => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([]));
    return true;
  } catch (error) {
    console.error("장바구니 비우기 오류:", error);
    return false;
  }
};

/**
 * 상품 수량 업데이트
 * @param {string} productId - 상품 ID
 * @param {number} quantity - 변경할 수량
 * @returns {boolean} 성공 여부
 */
export const updateQuantity = (productId, quantity) => {
  try {
    const cart = getCart();
    const itemIndex = cart.findIndex((item) => item.productId === productId);

    if (itemIndex > -1) {
      if (quantity <= 0) {
        // 수량이 0 이하면 상품 삭제
        return removeFromCart(productId);
      }
      cart[itemIndex].quantity = quantity;
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      return true;
    }
    return false;
  } catch (error) {
    console.error("수량 업데이트 오류:", error);
    return false;
  }
};

/**
 * 장바구니 아이콘의 개수 표시를 업데이트
 */
export const updateCartIconCount = () => {
  const count = getCartCount();
  const cartIconBtn = document.getElementById("cart-icon-btn");

  if (!cartIconBtn) return;

  // 기존 span 찾기 또는 생성
  let countSpan = cartIconBtn.querySelector("span");

  if (count > 0) {
    if (!countSpan) {
      countSpan = document.createElement("span");
      countSpan.className =
        "absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center";
      cartIconBtn.appendChild(countSpan);
    }
    countSpan.textContent = count;
    countSpan.style.display = "flex";
  } else {
    if (countSpan) {
      countSpan.style.display = "none";
    }
  }
};
