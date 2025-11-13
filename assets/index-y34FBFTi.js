(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e){if(t.type!==`childList`)continue;for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();const e=`modulepreload`,t=function(e){return`/front_7th_chapter2-1/`+e},n={},r=function(r,i,a){let o=Promise.resolve();if(i&&i.length>0){let r=function(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))},s=document.getElementsByTagName(`link`),c=document.querySelector(`meta[property=csp-nonce]`),l=c?.nonce||c?.getAttribute(`nonce`);o=r(i.map(r=>{if(r=t(r,a),r in n)return;n[r]=!0;let i=r.endsWith(`.css`),o=i?`[rel="stylesheet"]`:``,c=!!a;if(c)for(let e=s.length-1;e>=0;e--){let t=s[e];if(t.href===r&&(!i||t.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${r}"]${o}`))return;let u=document.createElement(`link`);if(u.rel=i?`stylesheet`:e,i||(u.as=`script`),u.crossOrigin=``,u.href=r,l&&u.setAttribute(`nonce`,l),document.head.appendChild(u),i)return new Promise((e,t)=>{u.addEventListener(`load`,e),u.addEventListener(`error`,()=>t(Error(`Unable to preload CSS for ${r}`)))})}))}function s(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return o.then(e=>{for(let t of e||[]){if(t.status!==`rejected`)continue;s(t.reason)}return r().catch(s)})};async function i(e={}){let{limit:t=20,search:n=``,category1:r=``,category2:i=``,sort:a=`price_asc`}=e,o=e.current??e.page??1;console.log(`params`,e);let s=new URLSearchParams({page:o.toString(),limit:t.toString(),...n&&{search:n},...r&&{category1:r},...i&&{category2:i},sort:a});console.log(`/api/products?${s}`);let c=await fetch(`/api/products?${s}`);if(!c.ok){let e=await c.json();throw Error(e.message)}return await c.json()}async function a(e){let t=await fetch(`/api/products/${e}`);return await t.json()}async function o(){let e=await fetch(`/api/categories`);return await e.json()}const s=({product:{productId:e,title:t,image:n,lprice:r,brand:i}})=>`
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden product-card"
          data-product-id="${e}">
      <!-- 상품 이미지 -->
      <div class="aspect-square bg-gray-100 overflow-hidden cursor-pointer product-image">
        <img src="${n}"
              alt="${t}"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
              loading="lazy">
      </div>
      <!-- 상품 정보 -->
      <div class="p-3">
        <div class="cursor-pointer product-info mb-3">
          <h3 class="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
            ${t}
          </h3>
          <p class="text-xs text-gray-500 mb-2">${i||``}</p>
          <p class="text-lg font-bold text-gray-900">
            ${parseInt(r).toLocaleString()}원
          </p>
        </div>
        <!-- 장바구니 버튼 -->
        <button class="w-full bg-blue-600 text-white text-sm py-2 px-3 rounded-md
                hover:bg-blue-700 transition-colors add-to-cart-btn" 
                data-product-id="${e}"
                data-product-title="${t}"
                data-product-price="${r}"
                data-product-image="${n}"
                data-product-brand="${i||``}">
          장바구니 담기
        </button>
      </div>
    </div>
  `;let c={currentPage:1,isLoading:!1,hasNext:!0,isEnabled:!1};const l=()=>({...c}),u=e=>{c={...c,...e}},d=()=>{c={currentPage:1,isLoading:!1,hasNext:!0,isEnabled:c.isEnabled}},f=()=>{c.isEnabled=!0},p=()=>{c.isEnabled=!1,d()};let m=null;const h=(e,t=`#infinite-scroll-loading`)=>{g();let n=document.querySelector(t);if(!n){console.error(`Target element not found: ${t}`);return}let r={root:null,rootMargin:`0px 0px 100px 0px`,threshold:.1},i=t=>{t.forEach(t=>{if(t.isIntersecting){let t=l();t.isEnabled&&!t.isLoading&&t.hasNext&&e()}})};m=new IntersectionObserver(i,r),m.observe(n)},g=()=>{m&&(m.disconnect(),m=null)},ee=()=>`/front_7th_chapter2-1/`,_=ee(),te=()=>{let e=new URLSearchParams(window.location.search),t={};for(let[n,r]of e.entries())t[n]=r;return t},ne=e=>{let t=new URLSearchParams;Object.keys(e).forEach(n=>{let r=e[n];r!==``&&r!=null&&t.set(n,r)});let n=_.endsWith(`/`)&&_!==`/`?_.slice(0,-1):_,r=window.location.pathname,i=r;r.startsWith(n)&&(i=r.slice(n.length)||`/`);let a=n===`/`?i:`${n}${i}`,o=t.toString()?`${a}?${t.toString()}`:a;window.history.pushState({},``,o)},re=()=>{let e=te();return{search:e.search||``,category1:e.category1||``,category2:e.category2||``,limit:e.limit?parseInt(e.limit):20,sort:e.sort||`price_asc`}},ie=(e,t)=>{let n=e.split(`/`).filter(Boolean),r=t.split(`/`).filter(Boolean);if(n.length!==r.length)return null;let i={};for(let e=0;e<n.length;e++){let t=n[e],a=r[e];if(t.startsWith(`:`)){let e=t.slice(1);i[e]=a}else if(t!==a)return null}return i},ae={search:``,category1:``,category2:``,limit:20,sort:`price_asc`};let v={...ae,...re()};const y=()=>({...v}),b=e=>(v={...v,...e},ne(v),{...v}),oe=async()=>{let e=l();if(!(e.isLoading||!e.hasNext||!e.isEnabled)){u({isLoading:!0}),S();try{let t=y(),n=e.currentPage+1,r=await i({...t,page:n}),{products:a,pagination:o}=r;x(a),u({currentPage:n,isLoading:!1,hasNext:o.hasNext}),o.hasNext||se()}catch(e){console.error(`Error loading more products:`,e),u({isLoading:!1}),C()}}},x=e=>{let t=document.getElementById(`products-grid`);if(!t){console.error(`products-grid not found`);return}let n=e.map(e=>s({product:e})).join(``);t.insertAdjacentHTML(`beforeend`,n)},S=()=>{let e=document.getElementById(`infinite-scroll-loading`),t=document.getElementById(`infinite-scroll-completion`);if(e){let t=e.querySelector(`.inline-flex`);t&&(t.style.visibility=`visible`)}t&&(t.style.display=`none`)},C=()=>{let e=document.getElementById(`infinite-scroll-loading`);if(e){let t=e.querySelector(`.inline-flex`);t&&(t.style.visibility=`hidden`)}},se=()=>{let e=document.getElementById(`infinite-scroll-loading`),t=document.getElementById(`infinite-scroll-completion`);if(e){let t=e.querySelector(`.inline-flex`);t&&(t.style.visibility=`hidden`)}t&&(t.style.display=`block`)},w=async({params:e={}}={})=>{let t=document.getElementById(`product-list-container`);if(!t){console.error(`product-list-container not found`);return}d();try{let n=await i({...e,page:1}),{products:r,pagination:a}=n,o=a?.total;t.innerHTML=`
      <!-- 상품 개수 정보 -->
      <div class="mb-4 text-sm text-gray-600">
        총 <span class="font-medium text-gray-900">${o}개</span>의 상품
      </div>
      <!-- 상품 그리드 -->
      <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid">
        ${r?.map(e=>s({product:e})).join(``)}
      </div>
      <!-- 상품 무한 스크롤 로딩 인디케이터 -->
      <div class="text-center py-4" id="infinite-scroll-loading">
        <div class="inline-flex items-center" style="visibility: hidden;">
          <svg class="animate-spin h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-sm text-gray-600">상품을 불러오는 중...</span>
        </div>
      </div>
      <!-- 모든 상품 로드 완료 메시지 -->
      <div class="text-center py-4 text-sm text-gray-500" id="infinite-scroll-completion" style="display: none;">
        모든 상품을 확인했습니다
      </div>
    `,u({currentPage:1,hasNext:a.hasNext,isLoading:!1}),ce()}catch(e){t.innerHTML=`
      <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div class="text-red-600 mb-2">
          <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-red-900 mb-2">오류가 발생했습니다</h3>
        <p class="text-red-700">${e.message}</p>
        <button onclick="location.reload()" 
                class="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
          다시 시도
        </button>
      </div>
    `}},ce=()=>{setTimeout(()=>{h(oe,`#infinite-scroll-loading`)},100)},le=()=>{let e=document.getElementById(`search-input`);if(!e){console.error(`search-input not found`);return}let t=y();e.value=t.search||``,e.addEventListener(`keypress`,e=>{e.key===`Enter`&&ue()})},ue=()=>{let e=document.getElementById(`search-input`);if(!e)return;let t=e.value.trim();d();let n=b({search:t});w({params:n})},de=()=>{let e={},t=()=>{let e=y(),t=document.querySelector(`[data-breadcrumb-container]`);if(!t)return;let n=`<button data-breadcrumb="reset" class="text-xs hover:text-blue-800 hover:underline">전체</button>`;e.category1&&(n+=` <span class="text-xs text-gray-400">></span> <button data-breadcrumb="category1" class="text-xs hover:text-blue-800 hover:underline">${e.category1}</button>`),e.category2&&(n+=` <span class="text-xs text-gray-400">></span> <span class="text-xs text-gray-600">${e.category2}</span>`),t.innerHTML=n},n=()=>{let t=document.getElementById(`category-filter-container`);if(!t)return;let n=Object.keys(e).map(e=>`
        <button data-category1="${e}"
                class="category1-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors
                       bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
          ${e}
        </button>
      `).join(``);t.innerHTML=n},r=t=>{let n=document.getElementById(`category-filter-container`);if(!n)return;let r=e[t];if(!r||Object.keys(r).length===0){n.innerHTML=`<div class="text-sm text-gray-500 italic">하위 카테고리가 없습니다.</div>`;return}let i=y(),a=i.category2,o=Object.keys(r).map(e=>{let t=e===a,n=t?`bg-blue-100 border-blue-500 text-blue-700`:`bg-white border-gray-300 text-gray-700 hover:bg-gray-50`;return`
            <button data-category2="${e}"
                    class="category2-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors ${n}">
              ${e}
            </button>
          `}).join(``);n.innerHTML=o},i=e=>{d();let n=b({category1:e,category2:``});t(),r(e),w({params:n})},a=e=>{let n=y();d();let i=b({category2:e});t(),r(n.category1),w({params:i})},s=()=>{d();let e=b({category1:``,category2:``});t(),n(),w({params:e})},c=()=>{let e=y();d();let n=b({category2:``});t(),r(e.category1),w({params:n})},l=e=>{d();let t=b({limit:parseInt(e)});w({params:t})},u=e=>{d();let t=b({sort:e});w({params:t})};return setTimeout(()=>{le(),o().then(o=>{e=o;let d=document.getElementById(`category-filter-container`),f=document.querySelector(`[data-breadcrumb-container]`),p=document.getElementById(`limit-select`),m=document.getElementById(`sort-select`),h=y();t(),p&&(p.value=h.limit),m&&(m.value=h.sort),f&&f.addEventListener(`click`,e=>{let t=e.target.closest(`[data-breadcrumb="reset"]`),n=e.target.closest(`[data-breadcrumb="category1"]`);t?s():n&&c()}),d&&(Object.keys(o).length===0?d.innerHTML=`<div class="text-sm text-gray-500 italic">카테고리가 없습니다.</div>`:(h.category1&&h.category2||h.category1?r(h.category1):n(),d.addEventListener(`click`,e=>{let t=e.target.closest(`.category1-filter-btn`),n=e.target.closest(`.category2-filter-btn`);if(t){let e=t.dataset.category1;i(e)}else if(n){let e=n.dataset.category2;a(e)}}))),p&&p.addEventListener(`change`,e=>{let t=e.target.value;l(t)}),m&&m.addEventListener(`change`,e=>{let t=e.target.value;u(t)})})},0),`
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
      <!-- 검색창 -->
      <div class="mb-4">
        <div class="relative">
          <input type="text" id="search-input" placeholder="상품명을 검색해보세요..." value="" class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                      focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
      </div>
      <!-- 필터 옵션 -->
      <div class="space-y-3">
        <!-- 카테고리 필터 -->
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <label class="text-sm text-gray-600">카테고리:</label>
            <div data-breadcrumb-container class="flex items-center gap-2">
              <button data-breadcrumb="reset" class="text-xs hover:text-blue-800 hover:underline">전체</button>
            </div>
          </div>
          <!-- 카테고리 버튼 컨테이너 (동적으로 category1 또는 category2 표시) -->
          <div id="category-filter-container" class="flex flex-wrap gap-2">
            <div class="text-sm text-gray-500 italic">카테고리 로딩 중...</div>
          </div>
        </div>
        <!-- 기존 필터들 -->
        <div class="flex gap-2 items-center justify-between">
          <!-- 페이지당 상품 수 -->
          <div class="flex items-center gap-2">
            <label class="text-sm text-gray-600">개수:</label>
            <select id="limit-select"
                    class="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
              <option value="10">
                10개
              </option>
              <option value="20" selected="">
                20개
              </option>
              <option value="50">
                50개
              </option>
              <option value="100">
                100개
              </option>
            </select>
          </div>
          <!-- 정렬 -->
          <div class="flex items-center gap-2">
            <label class="text-sm text-gray-600">정렬:</label>
            <select id="sort-select" class="text-sm border border-gray-300 rounded px-2 py-1
                          focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
              <option value="price_asc" selected="">가격 낮은순</option>
              <option value="price_desc">가격 높은순</option>
              <option value="name_asc">이름순</option>
              <option value="name_desc">이름 역순</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  `},T=({children:e,isDetailPage:t=!1})=>`
    <div class="min-h-screen bg-gray-50">
      <header class="bg-white shadow-sm sticky top-0 z-40">
      <div class="max-w-md mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          ${t?`
          <div class="flex items-center space-x-3">
            <button id="back-btn" class="p-2 text-gray-700 hover:text-gray-900 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <h1 class="text-lg font-bold text-gray-900">상품 상세</h1>
          </div>
          `:`
          <h1 class="text-xl font-bold text-gray-900">
            <a href="/" data-link="">쇼핑몰</a>
          </h1>
          `}
          <div class="flex items-center space-x-2">
            <!-- 장바구니 아이콘 -->
            <button id="cart-icon-btn" class="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
              </svg>
              <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center" style="display: none;">0</span>
            </button>
          </div>
        </div>
      </div>
    </header>
      <main class="max-w-md mx-auto px-4 py-4">
        ${e}
      </main>
      <footer class="bg-white shadow-sm sticky top-0 z-40">
      <div class="max-w-md mx-auto py-8 text-center text-gray-500">
        <p>© 2025 항해플러스 프론트엔드 쇼핑몰</p>
      </div>
    </footer> 
    </div>
  `,fe=()=>(setTimeout(()=>{let e=y();w({params:e})},0),`
    <!-- 상품 목록 -->
    <div class="mb-6">
      <div id="product-list-container">
        <!-- 상품 그리드 -->
        <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid">
          <!-- 로딩 스켈레톤 -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
            <div class="aspect-square bg-gray-200"></div>
            <div class="p-3">
              <div class="h-4 bg-gray-200 rounded mb-2"></div>
              <div class="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div class="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
              <div class="h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
            <div class="aspect-square bg-gray-200"></div>
            <div class="p-3">
              <div class="h-4 bg-gray-200 rounded mb-2"></div>
              <div class="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div class="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
              <div class="h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
            <div class="aspect-square bg-gray-200"></div>
            <div class="p-3">
              <div class="h-4 bg-gray-200 rounded mb-2"></div>
              <div class="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div class="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
              <div class="h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
            <div class="aspect-square bg-gray-200"></div>
            <div class="p-3">
              <div class="h-4 bg-gray-200 rounded mb-2"></div>
              <div class="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div class="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
              <div class="h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `),pe=()=>(setTimeout(()=>{f()},0),setTimeout(()=>{let e=()=>{p(),g()};window.addEventListener(`popstate`,e,{once:!0}),document.querySelectorAll(`a[data-link]`).forEach(t=>{t.addEventListener(`click`,e,{once:!0})})},0),`
    ${T({children:`
        ${de()}
        ${fe()}
      `})}
  `),me=({product:e,relatedProductsHTML:t})=>{let{productId:n,title:r,image:i,lprice:a,brand:o=``,category1:s=``,category2:c=``,description:l=``,rating:u=0,reviewCount:d=0,stock:f=0}=e,p=e=>{let t=[];for(let n=0;n<5;n++)n<e?t.push(`
          <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        `):t.push(`
          <svg class="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        `);return t.join(``)},m=[];if(s){let e=`/?category1=${encodeURIComponent(s)}`;m.push(`
      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
      <a href="${e}" data-link class="breadcrumb-link hover:text-blue-600 transition-colors">
        ${s}
      </a>
    `)}if(c){let e=`/?category1=${encodeURIComponent(s)}&category2=${encodeURIComponent(c)}`;m.push(`
      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
      <a href="${e}" data-link class="breadcrumb-link hover:text-blue-600 transition-colors">
        ${c}
      </a>
    `)}return`
    <!-- 브레드크럼 -->
    <nav class="mb-4">
      <div class="flex items-center space-x-2 text-sm text-gray-600">
        <a href="/" data-link class="hover:text-blue-600 transition-colors">홈</a>
        ${m.join(``)}
      </div>
    </nav>

    <!-- 상품 상세 정보 -->
    <div class="bg-white rounded-lg shadow-sm mb-6">
      <!-- 상품 이미지 -->
      <div class="p-4">
        <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
          <img src="${i}" 
               alt="${r}" 
               class="w-full h-full object-cover product-detail-image">
        </div>

        <!-- 상품 정보 -->
        <div>
          <p class="text-sm text-gray-600 mb-1">${o}</p>
          <h1 class="text-xl font-bold text-gray-900 mb-3">${r}</h1>

          <!-- 평점 및 리뷰 -->
          <div class="flex items-center mb-3">
            <div class="flex items-center">
              ${p(u)}
            </div>
            <span class="ml-2 text-sm text-gray-600">${u.toFixed(1)} (${d}개 리뷰)</span>
          </div>

          <!-- 가격 -->
          <div class="mb-4">
            <span class="text-2xl font-bold text-blue-600">${parseInt(a).toLocaleString()}원</span>
          </div>

          <!-- 재고 -->
          <div class="text-sm text-gray-600 mb-4">
            재고 ${f}개
          </div>

          <!-- 설명 -->
          <div class="text-sm text-gray-700 leading-relaxed mb-6">
            ${l}
          </div>
        </div>
      </div>

      <!-- 수량 선택 및 액션 -->
      <div class="border-t border-gray-200 p-4">
        <div class="flex items-center justify-between mb-4">
          <span class="text-sm font-medium text-gray-900">수량</span>
          <div class="flex items-center">
            <button id="quantity-decrease" class="w-8 h-8 flex items-center justify-center border border-gray-300 
               rounded-l-md bg-gray-50 hover:bg-gray-100">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
              </svg>
            </button>
            <input type="number" 
                   id="quantity-input" 
                   value="1" 
                   min="1" 
                   class="w-16 h-8 text-center text-sm border-t border-b border-gray-300 
                  focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
            <button id="quantity-increase" class="w-8 h-8 flex items-center justify-center border border-gray-300 
               rounded-r-md bg-gray-50 hover:bg-gray-100">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- 액션 버튼 -->
        <button id="add-to-cart-btn" 
                data-product-id="${n}"
                data-product-title="${r}"
                data-product-price="${a}"
                data-product-image="${i}"
                data-product-brand="${o}"
                class="w-full bg-blue-600 text-white py-3 px-4 rounded-md 
             hover:bg-blue-700 transition-colors font-medium">
          장바구니 담기
        </button>
      </div>
    </div>

    <!-- 상품 목록으로 이동 -->
    <div class="mb-6">
      <a href="/" 
         data-link
         class="block w-full text-center bg-gray-100 text-gray-700 py-3 px-4 rounded-md 
        hover:bg-gray-200 transition-colors go-to-product-list">
        상품 목록으로 돌아가기
      </a>
    </div>

    <!-- 관련 상품 -->
    ${t}
  `},he=(e={})=>{let{id:t}=e;return t?(setTimeout(async()=>{let e=document.getElementById(`back-btn`);e&&e.addEventListener(`click`,async e=>{e.preventDefault();let{navigateTo:t}=await r(async()=>{let{navigateTo:e}=await import(`./navigation-pXgpYxqG.js`);return{navigateTo:e}},[]);t(`/`)});let n=document.querySelector(`main`);if(n)try{let e=await a(t),o=``;if(e.category2){let n=await i({category1:e.category1,category2:e.category2}),r=n.products.filter(e=>e.productId!==t);r.length>0&&(o=`
            <div class="bg-white rounded-lg shadow-sm">
              <div class="p-4 border-b border-gray-200">
                <h2 class="text-lg font-bold text-gray-900">관련 상품</h2>
                <p class="text-sm text-gray-600">같은 카테고리의 다른 상품들</p>
              </div>
              <div class="p-4">
                <div class="grid grid-cols-2 gap-3 responsive-grid" id="related-products-grid">
                  ${r.map(e=>`
                    <div class="bg-gray-50 rounded-lg p-3 related-product-card cursor-pointer" data-product-id="${e.productId}">
                      <div class="aspect-square bg-white rounded-md overflow-hidden mb-2">
                        <img src="${e.image}" 
                             alt="${e.title}" 
                             class="w-full h-full object-cover" 
                             loading="lazy">
                      </div>
                      <h3 class="text-sm font-medium text-gray-900 mb-1 line-clamp-2">${e.title}</h3>
                      <p class="text-sm font-bold text-blue-600">${parseInt(e.lprice).toLocaleString()}원</p>
                    </div>
                  `).join(``)}
                </div>
              </div>
            </div>
          `)}n.innerHTML=me({product:e,relatedProductsHTML:o});let{initProductDetailHandler:s}=await r(async()=>{let{initProductDetailHandler:e}=await import(`./productDetailHandler-C71DA-wU.js`);return{initProductDetailHandler:e}},[]);s(e)}catch(e){console.error(`Error loading product detail:`,e),n.innerHTML=`
        <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div class="text-red-600 mb-2">
            <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-red-900 mb-2">상품을 불러올 수 없습니다</h3>
          <p class="text-red-700 mb-4">${e.message||`상품 정보를 가져오는 중 오류가 발생했습니다.`}</p>
          <a href="/" 
             data-link
             class="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            상품 목록으로 돌아가기
          </a>
        </div>
      `}},0),`
    <div class="min-h-screen bg-gray-50">
      <header class="bg-white shadow-sm sticky top-0 z-40">
        <div class="max-w-md mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <button id="back-btn" class="p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <h1 class="text-lg font-bold text-gray-900">상품 상세</h1>
            </div>
            <div class="flex items-center space-x-2">
              <!-- 장바구니 아이콘 -->
              <button id="cart-icon-btn" class="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      <main class="max-w-md mx-auto px-4 py-4">
        <div class="py-20 bg-gray-50 flex items-center justify-center">
          <div class="text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p class="text-gray-600">상품 정보를 불러오는 중...</p>
          </div>
        </div>
      </main>
      <footer class="bg-white shadow-sm sticky top-0 z-40">
        <div class="max-w-md mx-auto py-8 text-center text-gray-500">
          <p>© 2025 항해플러스 프론트엔드 쇼핑몰</p>
        </div>
      </footer>
    </div>
  `):T({children:`
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
      `,isDetailPage:!0})},ge=()=>T({children:`
      <div class="text-center my-4 py-20 shadow-md p-6 bg-white rounded-lg">
        <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#4285f4;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#1a73e8;stop-opacity:1" />
            </linearGradient>
            <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="8" flood-color="#000000" flood-opacity="0.1"/>
            </filter>
          </defs>
          
          <!-- 404 Numbers -->
          <text x="160" y="85" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="48" font-weight="600" fill="url(#blueGradient)" text-anchor="middle">404</text>
          
          <!-- Icon decoration -->
          <circle cx="80" cy="60" r="3" fill="#e8f0fe" opacity="0.8"/>
          <circle cx="240" cy="60" r="3" fill="#e8f0fe" opacity="0.8"/>
          <circle cx="90" cy="45" r="2" fill="#4285f4" opacity="0.5"/>
          <circle cx="230" cy="45" r="2" fill="#4285f4" opacity="0.5"/>
          
          <!-- Message -->
          <text x="160" y="110" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="14" font-weight="400" fill="#5f6368" text-anchor="middle">페이지를 찾을 수 없습니다</text>
          
          <!-- Subtle bottom accent -->
          <rect x="130" y="130" width="60" height="2" rx="1" fill="url(#blueGradient)" opacity="0.3"/>
        </svg>

        <a href="/" data-link="" class="inline-block px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">홈으로</a>
      </div>
    `}),E=e=>{let t=_.endsWith(`/`)&&_!==`/`?_.slice(0,-1):_,n=e.startsWith(`/`)?e:`/${e}`,r=t===`/`?n:`${t}${n}`;window.history.pushState({},``,r),window.dispatchEvent(new PopStateEvent(`popstate`))},D=e=>{let t=e.target.closest(`a[data-link]`);if(t){e.preventDefault();let n=t.getAttribute(`href`);n&&E(n)}},O=()=>{document.addEventListener(`click`,D)},k=[{path:`/`,component:pe,exact:!0},{path:`/product/:id`,component:he}],_e=e=>{for(let t of k)if(t.exact&&t.path===e)return{route:t,params:{}};for(let t of k)if(!t.exact){let n=ie(t.path,e);if(n!==null)return{route:t,params:n}}return null},ve=()=>{let e=window.location.pathname,t=_.endsWith(`/`)&&_!==`/`?_.slice(0,-1):_;return e.startsWith(t)?e.slice(t.length)||`/`:e},A=()=>{let e=ve(),t=document.getElementById(`root`);if(!t){console.error(`Root element not found`);return}let n=_e(e);if(n){let{route:e,params:r}=n;t.innerHTML=e.component(r)}else t.innerHTML=ge();setTimeout(async()=>{let{updateCartIconCount:e}=await r(async()=>{let{updateCartIconCount:e}=await import(`./cartManager-7v7djYZm.js`);return{updateCartIconCount:e}},[]);e()},0)},j=()=>{O(),window.addEventListener(`popstate`,A),A()},M=()=>{document.addEventListener(`click`,e=>{if(e.target.closest(`.add-to-cart-btn`))return;let t=e.target.closest(`.product-image`),n=e.target.closest(`.product-info`);if(t||n){let t=e.target.closest(`.product-card`);if(t){let n=t.dataset.productId;n&&(e.preventDefault(),E(`/product/${n}`))}}})},N=`shopping_cart`,P=()=>{try{let e=localStorage.getItem(N);return e?JSON.parse(e):[]}catch(e){return console.error(`장바구니 조회 오류:`,e),[]}},F=e=>{try{let t=P(),n=t.findIndex(t=>t.productId===e.productId);return n>-1?t[n].quantity+=e.quantity||1:t.push({productId:e.productId,title:e.title,price:e.price,image:e.image,brand:e.brand||``,quantity:e.quantity||1}),localStorage.setItem(N,JSON.stringify(t)),{success:!0,cart:t,count:I()}}catch(e){return console.error(`장바구니 추가 오류:`,e),{success:!1,error:e.message}}},I=()=>{let e=P();return e.length},L=e=>{try{let t=P(),n=t.filter(t=>t.productId!==e);return localStorage.setItem(N,JSON.stringify(n)),!0}catch(e){return console.error(`장바구니 삭제 오류:`,e),!1}},R=()=>{try{return localStorage.setItem(N,JSON.stringify([])),!0}catch(e){return console.error(`장바구니 비우기 오류:`,e),!1}},z=(e,t)=>{try{let n=P(),r=n.findIndex(t=>t.productId===e);return r>-1?t<=0?L(e):(n[r].quantity=t,localStorage.setItem(N,JSON.stringify(n)),!0):!1}catch(e){return console.error(`수량 업데이트 오류:`,e),!1}},B=()=>{let e=I(),t=document.getElementById(`cart-icon-btn`);if(!t)return;let n=t.querySelector(`span`);e>0?(n||(n=document.createElement(`span`),n.className=`absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center`,t.appendChild(n)),n.textContent=e,n.style.display=`flex`):n&&(n.style.display=`none`)},V=(e,t=`success`,n=3e3)=>{let r=document.querySelector(`.toast-notification`);r&&r.remove();let i={success:{bgColor:`bg-green-600`,icon:`
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      `},info:{bgColor:`bg-blue-600`,icon:`
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      `},error:{bgColor:`bg-red-600`,icon:`
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      `}},a=i[t]||i.success,o=document.createElement(`div`);if(o.className=`toast-notification fixed left-1/2 transform -translate-x-1/2 z-50 animate-slide-up-from-bottom`,o.style.bottom=`20px`,o.innerHTML=`
    <div class="${a.bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm">
      <div class="flex-shrink-0">
        ${a.icon}
      </div>
      <p class="text-sm font-medium">${e}</p>
      <button id="toast-close-btn" class="toast-close-btn flex-shrink-0 ml-2 text-white hover:text-gray-200">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  `,!document.querySelector(`#toast-styles`)){let e=document.createElement(`style`);e.id=`toast-styles`,e.textContent=`
      @keyframes slide-up-from-bottom {
        from {
          opacity: 0;
          transform: translate(-50%, 20px);
        }
        to {
          opacity: 1;
          transform: translate(-50%, 0);
        }
      }
      
      @keyframes slide-down-to-bottom {
        from {
          opacity: 1;
          transform: translate(-50%, 0);
        }
        to {
          opacity: 0;
          transform: translate(-50%, 20px);
        }
      }
      
      .animate-slide-up-from-bottom {
        animation: slide-up-from-bottom 0.3s ease-out;
      }
      
      .animate-slide-down-to-bottom {
        animation: slide-down-to-bottom 0.3s ease-out;
      }
    `,document.head.appendChild(e)}document.body.appendChild(o);let s=o.querySelector(`.toast-close-btn`);s.addEventListener(`click`,()=>{H(o)}),n>0&&setTimeout(()=>{H(o)},n)},H=e=>{!e||!e.parentNode||(e.classList.remove(`animate-slide-up-from-bottom`),e.classList.add(`animate-slide-down-to-bottom`),setTimeout(()=>{e.parentNode&&e.remove()},300))},ye=e=>{V(e,`success`)},U=e=>{V(e,`info`)},W=e=>{V(e,`error`)},be=()=>`
    <div class="flex-1 flex items-center justify-center p-8">
      <div class="text-center">
        <div class="text-gray-400 mb-4">
          <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">장바구니가 비어있습니다</h3>
        <p class="text-gray-600">원하는 상품을 담아보세요!</p>
      </div>
    </div>
  `,xe=({productId:e,title:t,price:n,image:r,quantity:i})=>`
    <div class="flex items-center py-3 border-b border-gray-100 cart-item" data-product-id="${e}">
      <!-- 선택 체크박스 -->
      <label class="flex items-center mr-3">
        <input type="checkbox" class="cart-item-checkbox w-4 h-4 text-blue-600 border-gray-300 rounded 
      focus:ring-blue-500" data-product-id="${e}">
      </label>
      <!-- 상품 이미지 -->
      <div class="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-3 flex-shrink-0">
        <img src="${r}" alt="${t}" class="w-full h-full object-cover cursor-pointer cart-item-image" data-product-id="${e}">
      </div>
      <!-- 상품 정보 -->
      <div class="flex-1 min-w-0">
        <h4 class="text-sm font-medium text-gray-900 truncate cursor-pointer cart-item-title" data-product-id="${e}">
          ${t}
        </h4>
        <p class="text-sm text-gray-600 mt-1">
          ${n.toLocaleString()}원
        </p>
        <!-- 수량 조절 -->
        <div class="flex items-center mt-2">
          <button class="quantity-decrease-btn w-7 h-7 flex items-center justify-center 
       border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100" data-product-id="${e}">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
            </svg>
          </button>
          <input type="number" value="${i}" min="1" class="quantity-input w-12 h-7 text-center text-sm border-t border-b 
      border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500" disabled="" data-product-id="${e}">
          <button class="quantity-increase-btn w-7 h-7 flex items-center justify-center 
       border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100" data-product-id="${e}">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
          </button>
        </div>
      </div>
      <!-- 가격 및 삭제 -->
      <div class="text-right ml-3">
        <p class="text-sm font-medium text-gray-900">
          ${(n*i).toLocaleString()}원
        </p>
        <button class="cart-item-remove-btn mt-1 text-xs text-red-600 hover:text-red-800" data-product-id="${e}">
          삭제
        </button>
      </div>
    </div>
  `,Se=e=>e.reduce((e,t)=>e+t.price*t.quantity,0),G=()=>{let e=P(),t=e.length===0,n=Se(e);return`
    <div class="fixed inset-0 z-50 overflow-y-auto cart-modal" style="display: none;">
      <!-- 배경 오버레이 -->
      <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity cart-modal-overlay"></div>
      <!-- 모달 컨테이너 -->
      <div class="flex min-h-full items-end justify-center p-0 sm:items-center sm:p-4">
        <div class="relative bg-white rounded-t-lg sm:rounded-lg shadow-xl w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-hidden">
          <!-- 헤더 -->
          <div class="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <h2 class="text-lg font-bold text-gray-900 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
              </svg>
              장바구니
              ${t?``:`<span class="text-sm font-normal text-gray-600 ml-1">(${e.length})</span>`}
            </h2>
            <button id="cart-modal-close-btn" class="text-gray-400 hover:text-gray-600 p-1">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <!-- 컨텐츠 -->
          <div class="flex flex-col max-h-[calc(90vh-120px)]">
            ${t?be():`
              <!-- 전체 선택 섹션 -->
              <div class="p-4 border-b border-gray-200 bg-gray-50">
                <label class="flex items-center text-sm text-gray-700">
                  <input type="checkbox" id="cart-modal-select-all-checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2">
                  전체선택 (${e.length}개)
                </label>
              </div>
              <!-- 아이템 목록 -->
              <div class="flex-1 overflow-y-auto">
                <div class="p-4 space-y-4">
                  ${e.map(e=>xe(e)).join(``)}
                </div>
              </div>
            `}
          </div>
          
          ${t?``:`
            <!-- 하단 액션 -->
            <div class="sticky bottom-0 bg-white border-t border-gray-200 p-4">
              <!-- 총 금액 -->
              <div class="flex justify-between items-center mb-4">
                <span class="text-lg font-bold text-gray-900">총 금액</span>
                <span class="text-xl font-bold text-blue-600">${n.toLocaleString()}원</span>
              </div>
              <!-- 액션 버튼들 -->
              <div class="space-y-2">
                <!-- 선택한 상품 삭제 버튼 (선택 시에만 표시) -->
                <button id="cart-modal-remove-selected-btn" class="w-full bg-red-600 text-white py-2 px-4 rounded-md 
                     hover:bg-red-700 transition-colors text-sm" style="display: none;">
                  선택한 상품 삭제 (0개)
                </button>
                <div class="flex gap-2">
                  <button id="cart-modal-clear-cart-btn" class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md 
                       hover:bg-gray-700 transition-colors text-sm">
                    전체 비우기
                  </button>
                  <button id="cart-modal-checkout-btn" class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md 
                       hover:bg-blue-700 transition-colors text-sm">
                    구매하기
                  </button>
                </div>
              </div>
            </div>
          `}
        </div>
      </div>
    </div>
  `},K=`cart_checkbox_state`,q=()=>{let e=document.querySelectorAll(`.cart-item-checkbox:checked`),t=Array.from(e).map(e=>e.getAttribute(`data-product-id`));localStorage.setItem(K,JSON.stringify(t))},Ce=()=>{try{let e=localStorage.getItem(K);if(!e)return;let t=JSON.parse(e);t.forEach(e=>{let t=document.querySelector(`.cart-item-checkbox[data-product-id="${e}"]`);t&&(t.checked=!0)});let n=document.querySelectorAll(`.cart-item-checkbox`),r=document.getElementById(`cart-modal-select-all-checkbox`);if(r&&n.length>0){let e=Array.from(n).every(e=>e.checked);r.checked=e}Z()}catch(e){console.error(`체크박스 상태 복원 실패:`,e)}},we=()=>{let e=document.getElementById(`root`),t=document.querySelector(`.cart-modal`);if(t)Y();else{let n=G();e.insertAdjacentHTML(`beforeend`,n),t=document.querySelector(`.cart-modal`),X()}t&&(t.style.display=`block`,document.body.style.overflow=`hidden`,setTimeout(()=>{Ce()},0))},J=()=>{let e=document.querySelector(`.cart-modal`);e&&(e.style.display=`none`,document.body.style.overflow=``)},Y=(e=!1)=>{let t=document.querySelector(`.cart-modal`);if(!t)return;let n=[];if(e){let e=document.querySelectorAll(`.cart-item-checkbox:checked`);n=Array.from(e).map(e=>e.getAttribute(`data-product-id`))}let r=G(),i=document.createElement(`div`);i.innerHTML=r;let a=i.firstElementChild;if(t.innerHTML=a.innerHTML,X(),e&&n.length>0){n.forEach(e=>{let t=document.querySelector(`.cart-item-checkbox[data-product-id="${e}"]`);t&&(t.checked=!0)});let e=document.querySelectorAll(`.cart-item-checkbox`),t=document.getElementById(`cart-modal-select-all-checkbox`);if(t&&e.length>0){let n=Array.from(e).every(e=>e.checked);t.checked=n}Z()}},X=()=>{let e=document.getElementById(`cart-modal-close-btn`);e&&e.addEventListener(`click`,J);let t=document.querySelector(`.cart-modal-overlay`);t&&t.addEventListener(`click`,e=>{e.target===t&&J()}),document.addEventListener(`keydown`,Te);let n=document.getElementById(`cart-modal-select-all-checkbox`);n&&n.addEventListener(`change`,Ee);let r=document.querySelectorAll(`.cart-item-checkbox`);r.forEach(e=>{e.addEventListener(`change`,De)});let i=document.querySelectorAll(`.quantity-increase-btn`);i.forEach(e=>{e.addEventListener(`click`,Oe)});let a=document.querySelectorAll(`.quantity-decrease-btn`);a.forEach(e=>{e.addEventListener(`click`,Q)});let o=document.querySelectorAll(`.cart-item-remove-btn`);o.forEach(e=>{e.addEventListener(`click`,ke)});let s=document.getElementById(`cart-modal-clear-cart-btn`);s&&s.addEventListener(`click`,Ae);let c=document.getElementById(`cart-modal-remove-selected-btn`);c&&c.addEventListener(`click`,je);let l=document.getElementById(`cart-modal-checkout-btn`);l&&l.addEventListener(`click`,Me)},Te=e=>{e.key===`Escape`&&J()},Ee=e=>{let t=e.target.checked,n=document.querySelectorAll(`.cart-item-checkbox`);n.forEach(e=>{e.checked=t}),Z(),q()},De=()=>{let e=document.querySelectorAll(`.cart-item-checkbox`),t=document.getElementById(`cart-modal-select-all-checkbox`);if(t){let n=Array.from(e).every(e=>e.checked);t.checked=n}Z(),q()},Z=()=>{let e=document.querySelectorAll(`.cart-item-checkbox:checked`),t=document.getElementById(`cart-modal-remove-selected-btn`);if(!t)return;let n=e.length;n>0?(t.textContent=`선택한 상품 삭제 (${n}개)`,t.style.display=`block`):t.style.display=`none`},Oe=e=>{let t=e.currentTarget.getAttribute(`data-product-id`),n=document.querySelector(`.quantity-input[data-product-id="${t}"]`);if(n){let e=parseInt(n.value),r=e+1;z(t,r),Y(!0),B()}},Q=e=>{let t=e.currentTarget.getAttribute(`data-product-id`),n=document.querySelector(`.quantity-input[data-product-id="${t}"]`);if(n){let e=parseInt(n.value);if(e>1){let n=e-1;z(t,n),Y(!0),B()}}},ke=e=>{let t=e.currentTarget.getAttribute(`data-product-id`);L(t),Y(),B(),U(`상품이 삭제되었습니다`),setTimeout(()=>{q()},0)},Ae=()=>{R(),Y(),B(),U(`장바구니가 비워졌습니다`),localStorage.removeItem(K)},je=()=>{let e=document.querySelectorAll(`.cart-item-checkbox:checked`),t=Array.from(e).map(e=>e.getAttribute(`data-product-id`));if(t.length===0){U(`삭제할 상품을 선택해주세요`);return}t.forEach(e=>L(e)),Y(),B(),U(`선택된 상품들이 삭제되었습니다`),setTimeout(()=>{q()},0)},Me=()=>{V(`구매 기능은 추후 구현 예정입니다`,`info`,0)};let $=!1;const Ne=()=>{if($){B();return}$=!0,B(),document.addEventListener(`click`,e=>{let t=e.target;if(t.id===`cart-icon-btn`||t.closest(`#cart-icon-btn`)){e.preventDefault(),we();return}if(t.classList.contains(`add-to-cart-btn`)||t.closest(`.add-to-cart-btn`)){let e=t.classList.contains(`add-to-cart-btn`)?t:t.closest(`.add-to-cart-btn`);Pe(e)}})},Pe=e=>{try{let t=e.getAttribute(`data-product-id`),n=e.getAttribute(`data-product-title`),r=e.getAttribute(`data-product-price`),i=e.getAttribute(`data-product-image`),a=e.getAttribute(`data-product-brand`);if(!t||!n||!r){console.error(`상품 정보가 불완전합니다:`,{productId:t,title:n,price:r}),W(`상품 정보를 불러올 수 없습니다.`);return}let o=F({productId:t,title:n,price:parseInt(r),image:i,brand:a,quantity:1});o.success?(ye(`장바구니에 추가되었습니다`),B()):W(`장바구니에 추가할 수 없습니다.`)}catch(e){console.error(`장바구니 추가 오류:`,e),W(`오류가 발생했습니다.`)}},Fe=()=>r(async()=>{let{worker:e}=await import(`./browser-CqQww8xQ.js`);return{worker:e}},[]).then(({worker:e})=>e.start({onUnhandledRequest:`bypass`,serviceWorker:{url:`${_}mockServiceWorker.js`,options:{scope:_}}}));function Ie(){j(),Ne(),M()}Fe().then(Ie);export{F as addToCart,R as clearCart,P as getCart,I as getCartCount,D as handleLinkClick,O as initLinkInterceptor,E as navigateTo,L as removeFromCart,V as showToast,B as updateCartIconCount,z as updateQuantity};