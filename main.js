// ==========================================
// 1. DYNAMIC INVENTORY HUB (ALL ORIGINAL DATA RESTORED)
// ==========================================
const jewelryProducts = [
    // ------------------- RINGS -------------------
    {
        id: "ring-solitaire-01",
        name: "Timeless Solitaire Diamond Band",
        category: "Rings",
        price: 499,
        desc: "Meticulously shaped luxury ring base focusing clean top diamond alignment. Engineered for contemporary minimal stacking aesthetics.",
        baseFolder: "images/rings/ring-solitaire-01",
        hasDiscount: true, 
        discountPrice: 399,
        discountTag: "20% OFF"
    },
    {
        id: "ring-vintage-gold-02",
        name: "The Vintage style Gold Band",
        category: "Rings",
        price: 599,
        desc: "Antique traditional hand-carved gold textures wrapping an elite wide band architectural profile.",
        baseFolder: "images/rings/ring-vintage-02",
        hasDiscount: true,
        discountPrice: 449,
        discountTag: "25% OFF"
    },
    {
        id: "ring-minimal-band-03",
        name: "Minimal Sleek Comfort Band",
        category: "Rings",
        price: 299,
        desc: "Sleek and ultra-thin micro pave band design constructed for lightweight daily wear statements.",
        baseFolder: "images/rings/ring-minimal-band-03",
        hasDiscount: true,
        discountPrice: 199,
        discountTag: "30% OFF"
    },

    // ------------------- NECKLACES -------------------
    {
        id: "neck-royal-heritage-01",
        name: "Sara Royal Heritage Choker",
        category: "Necklaces",
        price: 999,
        desc: "An absolute magnum opus festive setting, incorporating heavy filigree metal work loops and certified droplet rubies.",
        baseFolder: "images/necklaces/neck-royal-heritage-01",
        hasDiscount: true,
        discountPrice: 799,
        discountTag: "20% OFF"
    },

    // ------------------- EARRINGS -------------------
    {
        id: "ear-jhumka-traditional-01",
        name: "Imperial Filigree Drop Jhumkas",
        category: "Earrings",
        price: 399,
        desc: "Stunning festive traditional hanging shoulder-grazing columns displaying custom organic texture drops.",
        baseFolder: "images/earrings/ear-jhumka-traditional-01",
        hasDiscount: true,
        discountPrice: 299,
        discountTag: "25% OFF"
    },

    // ------------------- BRACELETS -------------------
    {
        id: "brac-cuff-luxury-01",
        name: "Eclipse Matte Statement Cuff",
        category: "Bracelets",
        price: 499,
        desc: "Solid heavy-gauge matte satin finish gold wrist piece wrapping micro structural accent nodes.",
        baseFolder: "images/bracelets/brac-cuff-luxury-01",
        hasDiscount: true,
        discountPrice: 349,
        discountTag: "30% OFF"       
    },
    {   
        id: "brac-chain-minimal-02",
        name: "Minimalist Chain Link Bracelet",
        category: "Bracelets",
        price: 199,
        desc: "Delicate chain link bracelet designed for everyday wear, featuring a sleek and modern aesthetic.",
        baseFolder: "images/bracelets/brac-chain-minimal-02",
        hasDiscount: true,
        discountPrice: 149,
        discountTag: "19% OFF"
    }
];

let cartProductsList = []; 
let currentlyViewedProduct = {}; 

document.addEventListener('DOMContentLoaded', () => {
    // Elements Mapping
    const detailsModal = document.getElementById('productDetailsModal');
    const cartDrawer = document.getElementById('cartDrawer');
    const cartOverlay = document.getElementById('cartOverlay');

    window.openCart = () => { cartDrawer.classList.remove('translate-x-full'); cartOverlay.classList.remove('opacity-0', 'pointer-events-none'); };
    window.closeCart = () => { cartDrawer.classList.add('translate-x-full'); cartOverlay.classList.add('opacity-0', 'pointer-events-none'); };
    
    if(document.getElementById('floatingCartBtn')) document.getElementById('floatingCartBtn').onclick = window.openCart;
    if(document.getElementById('closeCartBtn')) document.getElementById('closeCartBtn').onclick = window.closeCart;
    if(cartOverlay) cartOverlay.onclick = window.closeCart;

    // ==========================================
    // 2. GRID SECTIONS RENDERING DISTRIBUTION
    // ==========================================
    window.renderSeparatedGrids = function() {
        const ringsGrid = document.getElementById('ringsGrid');
        const necklacesGrid = document.getElementById('necklacesGrid');
        const earringsGrid = document.getElementById('earringsGrid');
        const braceletsGrid = document.getElementById('braceletsGrid');

        if(ringsGrid) ringsGrid.innerHTML = "";
        if(necklacesGrid) necklacesGrid.innerHTML = "";
        if(earringsGrid) earringsGrid.innerHTML = "";
        if(braceletsGrid) braceletsGrid.innerHTML = "";

        jewelryProducts.forEach(product => {
            const isDiscountValid = product.hasDiscount === true && product.discountPrice < product.price;
            const finalPrice = isDiscountValid ? product.discountPrice : product.price;

            const displayPrice = isDiscountValid 
                ? `<span class="text-stone-400 line-through mr-2">₹${product.price.toLocaleString('en-IN')}.00</span><span class="text-amber-700 font-bold">₹${finalPrice.toLocaleString('en-IN')}.00</span>`
                : `₹${product.price.toLocaleString('en-IN')}.00`;

            const tagHTML = (isDiscountValid && product.discountTag)
                ? `<span class="absolute top-4 left-4 bg-amber-700 text-white text-[9px] font-mono tracking-widest uppercase px-2 py-1 z-10 rounded-xs shadow-sm select-none">${product.discountTag}</span>`
                : '';

            const cardHTML = `
                <div class="group cursor-pointer flex flex-col space-y-4" onclick="triggerModalDetails('${product.id}')">
                    <div class="w-full h-64 sm:h-72 md:h-80 bg-stone-50 rounded-xs overflow-hidden relative border border-stone-200/30 p-2 transition-all duration-500 hover:shadow-md">
                        ${tagHTML}
                        <img src="${product.baseFolder}-front.jpg" alt="${product.name}" class="w-full h-full object-contain transition-transform duration-700 group-hover:scale-102" onerror="this.src='https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600'">
                    </div>
                    <div class="space-y-1 text-center md:text-left px-1">
                        <h3 class="font-serif text-xs md:text-sm font-light text-stone-900 tracking-wide transition-colors group-hover:text-amber-800 line-clamp-1">${product.name}</h3>
                        <span class="text-xs font-medium text-stone-400 font-mono block">${displayPrice}</span>
                    </div>
                </div>
            `;

            if (product.category === "Rings" && ringsGrid) ringsGrid.insertAdjacentHTML('beforeend', cardHTML);
            if (product.category === "Necklaces" && necklacesGrid) necklacesGrid.insertAdjacentHTML('beforeend', cardHTML);
            if (product.category === "Earrings" && earringsGrid) earringsGrid.insertAdjacentHTML('beforeend', cardHTML);
            if (product.category === "Bracelets" && braceletsGrid) braceletsGrid.insertAdjacentHTML('beforeend', cardHTML);
        });
    };

    // ==========================================
    // 3. SEAMLESS PREVIEW MODAL LOGIC
    // ==========================================
    window.triggerModalDetails = function(productId) {
        const product = jewelryProducts.find(p => p.id === productId);
        if (!product) return;

        const isDiscountValid = product.hasDiscount === true && product.discountPrice < product.price;
        const finalPrice = isDiscountValid ? product.discountPrice : product.price;

        currentlyViewedProduct = { title: product.name, price: finalPrice, imgSrc: `${product.baseFolder}-front.jpg`, qty: 1, checked: true };

        document.getElementById('modalProductName').innerText = product.name;
        document.getElementById('modalProductCategory').innerText = product.category;
        
        const modalPriceBox = document.getElementById('modalProductPrice');
        if (isDiscountValid) {
            modalPriceBox.innerHTML = `<span class="text-stone-400 line-through text-base mr-3">₹${product.price.toLocaleString('en-IN')}.00</span><span>₹${product.discountPrice.toLocaleString('en-IN')}.00</span>`;
        } else {
            modalPriceBox.innerText = "₹" + product.price.toLocaleString('en-IN') + ".00";
        }

        document.getElementById('modalProductDesc').innerText = product.desc;
        document.getElementById('modalProductMainImg').src = `${product.baseFolder}-front.jpg`;

        const thumbsRow = document.getElementById('modalThumbnailsRow');
        thumbsRow.innerHTML = "";
        ['front', 'side', 'top', 'detail'].forEach(angle => {
            const imgSrc = `${product.baseFolder}-${angle}.jpg?v=${new Date().getTime()}`;
            const fallbackSrc = `${product.baseFolder}-front.jpg?v=${new Date().getTime()}`;
            
            thumbsRow.insertAdjacentHTML('beforeend', `
                <button onclick="document.getElementById('modalProductMainImg').src='${imgSrc}'" class="h-14 border border-stone-200 hover:border-stone-500 rounded-xs overflow-hidden bg-white transition-all cursor-pointer p-1">
                    <img src="${imgSrc}" class="w-full h-full object-contain" onerror="this.src='${fallbackSrc}'">
                </button>
            `);
        });

        detailsModal.classList.remove('opacity-0', 'pointer-events-none');
        detailsModal.firstElementChild.classList.remove('scale-95');
    };

    if (document.getElementById('closeDetailsModalBtn')) {
        document.getElementById('closeDetailsModalBtn').onclick = () => {
            detailsModal.classList.add('opacity-0', 'pointer-events-none');
            detailsModal.firstElementChild.classList.add('scale-95');
        };
    }

    // ==========================================
    // 4. ADVANCED CHECKOUT BILLING RENDERER
    // ==========================================
    function calculateAndRenderCart() {
        const cartItemsContainer = document.getElementById('cartItemsContainer');
        if (!cartItemsContainer) return;
        cartItemsContainer.innerHTML = "";

        let globalCount = 0; 
        let subtotalSum = 0;
        let totalSavings = 0;

        cartProductsList.forEach((product, idx) => {
            globalCount += product.qty; 
            
            const originalItem = jewelryProducts.find(p => p.name === product.title);
            const originalPrice = originalItem ? originalItem.price : product.price;
            
            subtotalSum += (product.price * product.qty);
            totalSavings += ((originalPrice - product.price) * product.qty);

            cartItemsContainer.insertAdjacentHTML('beforeend', `
                <div class="flex items-start justify-between border-b border-stone-100 pb-4 text-xs">
                    <div class="flex items-start space-x-3">
                        <div class="w-14 h-16 bg-stone-50 rounded-xs overflow-hidden flex-shrink-0 border border-stone-200/40">
                            <img src="${product.imgSrc}" class="w-full h-full object-contain">
                        </div>
                        <div class="space-y-1">
                            <h4 class="font-serif font-light text-stone-900 line-clamp-1 tracking-wide">${product.title}</h4>
                            <div class="flex items-center space-x-2 text-[10px]">
                                <span class="text-stone-400 font-mono">Qty: ${product.qty}</span>
                                <button onclick="deleteItem(${idx})" class="text-amber-700 underline pl-1 cursor-pointer">Remove</button>
                            </div>
                        </div>
                    </div>
                    <span class="font-mono font-bold text-stone-900">₹${(product.price * product.qty).toLocaleString('en-IN')}.00</span>
                </div>
            `);
        });

        if (cartProductsList.length === 0) {
            cartItemsContainer.innerHTML = `<p class="text-xs text-stone-400 text-center pt-8 font-light tracking-wide">Your dynamic selection vault is empty.</p>`;
        }

        // Delivery Rules
        let deliveryCharge = 0;
        if (subtotalSum > 0 && subtotalSum < 500) {
            deliveryCharge = 40;
        }

        let grandTotal = subtotalSum + deliveryCharge;

        document.getElementById('cartSubtotalAmount').innerText = "₹" + subtotalSum.toLocaleString('en-IN') + ".00";
        document.getElementById('cartSavingsAmount').innerText = "-₹" + totalSavings.toLocaleString('en-IN') + ".00";
        document.getElementById('cartDeliveryAmount').innerText = deliveryCharge === 0 ? (subtotalSum >= 500 ? "FREE" : "₹0.00") : "₹" + deliveryCharge + ".00";
        document.getElementById('cartGrandTotalAmount').innerText = "₹" + grandTotal.toLocaleString('en-IN') + ".00";

        const badge = document.getElementById('floatingCartBadge');
        if (badge) {
            badge.innerText = globalCount;
            if (globalCount > 0) badge.classList.remove('opacity-0');
            else badge.classList.add('opacity-0');
        }
    }

    window.deleteItem = function(idx) {
        cartProductsList.splice(idx, 1); 
        calculateAndRenderCart();
    };

    if (document.getElementById('modalAcquireBtn')) {
        document.getElementById('modalAcquireBtn').onclick = () => {
            detailsModal.classList.add('opacity-0', 'pointer-events-none');
            const matchIdx = cartProductsList.findIndex(item => item.title === currentlyViewedProduct.title);
            
            if (matchIdx > -1) { 
                cartProductsList[matchIdx].qty++; 
            } else { 
                cartProductsList.push({ ...currentlyViewedProduct }); 
            }
            
            calculateAndRenderCart();
            window.openCart();
        };
    }

    renderSeparatedGrids();
});
// 1. Main Categories Menu Toggle
function toggleMegaMenu(event) {
    event.stopPropagation();
    const dropdown = document.getElementById('navCategoriesDropdown');
    const arrow = document.getElementById('dropdownArrow');
    
    if (dropdown.classList.contains('pointer-events-none')) {
        dropdown.classList.remove('opacity-0', 'scale-95', 'pointer-events-none');
        dropdown.classList.add('opacity-100', 'scale-100', 'pointer-events-auto');
        arrow.classList.add('rotate-180');
    } else {
        closeAllDropdowns();
    }
}

// 2. Side-Flyout Submenu Click Control (Ditto Screenshot Style)
function toggleFlyout(event, flyoutId) {
    event.stopPropagation();
    const targetFlyout = document.getElementById(flyoutId);
    const allFlyouts = document.querySelectorAll('.sub-flyout-menu');
    
    // Pehle se khule hue baki saare side flyouts ko band karega
    allFlyouts.forEach(flyout => {
        if (flyout.id !== flyoutId) {
            flyout.classList.add('hidden');
            flyout.classList.remove('flex');
        }
    });
    
    // Current flyout ko toggle karega
    if (targetFlyout.classList.contains('hidden')) {
        targetFlyout.classList.remove('hidden');
        targetFlyout.classList.add('flex');
    } else {
        targetFlyout.classList.add('hidden');
        targetFlyout.classList.remove('flex');
    }
}

// 3. Document par kahi bhi click ho toh poora system auto-close ho jaye
function closeAllDropdowns() {
    const dropdown = document.getElementById('navCategoriesDropdown');
    const arrow = document.getElementById('dropdownArrow');
    const allFlyouts = document.querySelectorAll('.sub-flyout-menu');
    
    if (dropdown) {
        dropdown.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
        dropdown.classList.remove('opacity-100', 'scale-100', 'pointer-events-auto');
    }
    if (arrow) arrow.classList.remove('rotate-180');
    
    allFlyouts.forEach(flyout => {
        flyout.classList.add('hidden');
        flyout.classList.remove('flex');
    });
}

document.addEventListener('click', function() {
    closeAllDropdowns();
});
// ==========================================
// WISHLIST CORE LOGIC - INJECT IN MAIN.JS
// ==========================================

// 1. Function: Product card par heart dabaane par local storage mein save karne ke liye
window.addToWishlist = function(id, event) {
    if (event) {
        event.stopPropagation(); // Isse card ka bada product details modal popup open nahi hoga
        event.preventDefault();
    }
    
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    if (!wishlist.includes(id)) {
        wishlist.push(id);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        alert('Item Saved to Wishlist! ❤️');
        updateWishlistBadge();
    } else {
        alert('This item is already in your wishlist!');
    }
};

// 2. Function: Upper header counter badge ko real-time update rakhne ke liye
window.updateWishlistBadge = function() {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const badge = document.getElementById('wishlistCountBadge');
    if (badge) {
        badge.innerText = wishlist.length;
        // Agar items hain toh badge visible karo, nahi toh 0 dikhao
        if (wishlist.length > 0) {
            badge.style.opacity = '1';
        }
    }
};

// 3. Page load hote hi automatic chalne wala trigger
document.addEventListener('DOMContentLoaded', () => {
    updateWishlistBadge();
});
// ==========================================
// 🎯 REAL-TIME LIVE SEARCH & AUTOCOMPLETE RECS LOGIC
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('storeSearchInput');
    const suggestionsBox = document.getElementById('searchSuggestionsBox');

    if (!searchInput || !suggestionsBox) return;

    // Listener: Jab user input box mein type karega
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        suggestionsBox.innerHTML = ""; // Purani items clear karo

        if (query.length === 0) {
            hideSearchSuggestions();
            return;
        }

        // Inventory list se product match filter match check karo (by name or category)
        const matchedProducts = jewelryProducts.filter(product => 
            product.name.toLowerCase().includes(query) || 
            product.category.toLowerCase().includes(query)
        );

        if (matchedProducts.length === 0) {
            suggestionsBox.innerHTML = `<div class="px-4 py-2.5 text-stone-400 italic text-[9px] font-mono tracking-normal normal-case">No items found...</div>`;
            showSearchSuggestions();
            return;
        }

        // Suggestions rows html structure load dynamically
        matchedProducts.forEach(product => {
            const rowHTML = `
                <div onclick="executeSearchSelect('${product.id}')" class="flex items-center justify-between px-4 py-2 hover:bg-stone-50 cursor-pointer transition-colors border-b border-stone-100/40 last:border-0 group/row">
                    <div class="flex items-center space-x-2.5 max-w-[80%]">
                        <div class="w-7 h-8 bg-stone-50 overflow-hidden flex-shrink-0 border border-stone-200/30 p-0.5">
                            <img src="${product.baseFolder}-front.jpg" class="w-full h-full object-contain" onerror="this.src='https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=100'">
                        </div>
                        <span class="truncate font-medium text-stone-700 group-hover/row:text-stone-950">${product.name}</span>
                    </div>
                    <span class="font-mono text-stone-400 text-[9px]">₹${product.price}</span>
                </div>
            `;
            suggestionsBox.insertAdjacentHTML('beforeend', rowHTML);
        });

        showSearchSuggestions();
    });

    // Suggestion select trigger handler click target control
    window.executeSearchSelect = function(id) {
        searchInput.value = "";
        hideSearchSuggestions();
        // Direct target preview details popup trigger call karega bina context loose kiye
        if (typeof window.triggerModalDetails === 'function') {
            window.triggerModalDetails(id);
        }
    };

    function showSearchSuggestions() {
        suggestionsBox.classList.remove('opacity-0', 'scale-95', 'pointer-events-none');
        suggestionsBox.classList.add('opacity-100', 'scale-100', 'pointer-events-auto');
    }

    function hideSearchSuggestions() {
        suggestionsBox.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
        suggestionsBox.classList.remove('opacity-100', 'scale-100', 'pointer-events-auto');
    }

    // Dropdown auto-hide logic jab click outside box area target ho
    document.addEventListener('click', (e) => {
        const wrapper = document.getElementById('searchMainWrapper');
        if (wrapper && !wrapper.contains(e.target)) {
            hideSearchSuggestions();
        }
    });
});
// =========================================================
// 🎯 SCREENSHOT STYLE EXACT FULL WIDTH CENTERED SEARCH HUB
// =========================================================

window.openFullSearchModal = function() {
    const modal = document.getElementById('fullSearchOverlay');
    const input = document.getElementById('fullSearchInput');
    if (modal && input) {
        modal.classList.remove('opacity-0', 'pointer-events-none');
        modal.classList.add('opacity-100');
        setTimeout(() => input.focus(), 100); // Auto focus input field open
    }
};

window.closeFullSearchModal = function() {
    const modal = document.getElementById('fullSearchOverlay');
    const input = document.getElementById('fullSearchInput');
    const suggBox = document.getElementById('fullSearchSuggestions');
    if (modal) {
        modal.classList.add('opacity-0', 'pointer-events-none');
        modal.classList.remove('opacity-100');
    }
    if (input) input.value = "";
    if (suggBox) suggBox.classList.add('hidden');
};

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('fullSearchInput');
    const suggestionsBox = document.getElementById('fullSearchSuggestions');

    if (!searchInput || !suggestionsBox) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        suggestionsBox.innerHTML = "";

        if (query.length === 0) {
            suggestionsBox.classList.add('hidden');
            return;
        }

        const matched = jewelryProducts.filter(p => 
            p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
        );

        if (matched.length === 0) {
            suggestionsBox.innerHTML = `<div class="px-5 py-3 text-stone-400 italic text-[9px] normal-case tracking-normal">No items match your criteria...</div>`;
            suggestionsBox.classList.remove('hidden');
            suggestionsBox.classList.add('flex');
            return;
        }

        matched.forEach(product => {
            const row = `
                <div onclick="selectSearchItem('${product.id}')" class="flex items-center justify-between px-5 py-3 hover:bg-stone-50 cursor-pointer transition-colors border-b border-stone-100 last:border-0 group">
                    <div class="flex items-center space-x-3 max-w-[80%]">
                        <div class="w-8 h-9 bg-stone-50 overflow-hidden flex-shrink-0 border border-stone-200/40 p-0.5">
                            <img src="${product.baseFolder}-front.jpg" class="w-full h-full object-contain" onerror="this.src='https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=100'">
                        </div>
                        <span class="truncate font-medium text-stone-700 group-hover:text-stone-950">${product.name}</span>
                    </div>
                    <span class="font-mono text-stone-400 text-[9px]">₹${product.price}.00</span>
                </div>
            `;
            suggestionsBox.insertAdjacentHTML('beforeend', row);
        });

        suggestionsBox.classList.remove('hidden');
        suggestionsBox.classList.add('flex');
    });

    window.selectSearchItem = function(id) {
        closeFullSearchModal();
        if (typeof window.triggerModalDetails === 'function') {
            window.triggerModalDetails(id);
        }
    };
});