document.addEventListener('DOMContentLoaded', () => {
    const menu = [
        { id: 1, name: 'Pastel de Chocolate', description: 'Bizcocho húmedo de chocolate con betún cremoso.', price: 85.00, image: 'img/chocolateCake.png' },
        { id: 2, name: 'Flan Napolitano', description: 'Postre cremoso y suave con un delicioso caramelo.', price: 55.00, image: 'img/flanNapolitano.png' },
        { id: 3, name: 'Cheesecake de Fresa', description: 'Pastel de queso cremoso sobre una base de galleta, cubierto con fresas frescas.', price: 75.00, image: 'img/cheesecakeFresa.png' },
        { id: 4, name: 'Tiramisú', description: 'Capas de soletas empapadas en café y crema de mascarpone.', price: 90.00, image: 'img/tiramisu.png' },
        { id: 5, name: 'Pay de Limón', description: 'Refrescante postre de galletas marías y crema de limón.', price: 60.00, image: 'img/payDeLimon.png' },
        { id: 6, name: 'Brownie', description: 'Paquete de 3 brownies horneadas, crujientes por fuera y suaves por dentro.', price: 45.00, image: 'img/brownie.png' }
    ];

    let cart = [];

    const menuContainer = document.getElementById('menu-container');
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const orderTotalsContainer = document.getElementById('order-totals');
    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');
    const placeOrderBtn = document.getElementById('place-order-btn');
    const confirmationModal = document.getElementById('confirmation-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    // --- RENDER FUNCTIONS ---

    const renderMenu = () => {
        menuContainer.innerHTML = '';
        menu.forEach(item => {
            const card = document.createElement('div');
            card.className = 'menu-card bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-xl';
            card.innerHTML = `
                <div class="relative overflow-hidden">
                    <img src="${item.image}" alt="${item.name}" 
                         class="w-full h-56 object-cover transition-transform duration-300 hover:scale-110"
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBubyBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg=='; this.alt='Imagen no disponible';">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-bold text-gray-800 mb-2">${item.name}</h3>
                    <p class="text-gray-600 text-sm leading-relaxed mb-4 min-h-[3rem]">${item.description}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-2xl font-bold text-amber-800">$${item.price.toFixed(2)}</span>
                        <button data-id="${item.id}" class="add-to-cart-btn bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold px-6 py-2.5 rounded-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                            Agregar
                        </button>
                    </div>
                </div>
            `;
            menuContainer.appendChild(card);
        });
    };

    const renderCart = () => {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            emptyCartMessage.classList.remove('hidden');
            orderTotalsContainer.classList.add('hidden');
            placeOrderBtn.disabled = true;
        } else {
            emptyCartMessage.classList.add('hidden');
            cart.forEach(cartItem => {
                const menuItem = menu.find(item => item.id === cartItem.id);
                const itemEl = document.createElement('div');
                itemEl.className = 'flex justify-between items-center mb-4 p-3 bg-gray-50 rounded-lg';
                itemEl.innerHTML = `
                    <div class="flex-1">
                        <p class="font-bold text-gray-800">${menuItem.name}</p>
                        <p class="text-sm text-gray-500">$${menuItem.price.toFixed(2)} c/u</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <button data-id="${cartItem.id}" class="decrease-qty-btn bg-gray-200 rounded-full w-7 h-7 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-300 transition-colors duration-200">-</button>
                        <span class="w-8 text-center font-medium text-gray-800">${cartItem.quantity}</span>
                        <button data-id="${cartItem.id}" class="increase-qty-btn bg-gray-200 rounded-full w-7 h-7 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-300 transition-colors duration-200">+</button>
                    </div>
                `;
                cartItemsContainer.appendChild(itemEl);
            });
            renderTotals();
            orderTotalsContainer.classList.remove('hidden');
            placeOrderBtn.disabled = false;
        }
    };
    
    const renderTotals = () => {
        const subtotal = cart.reduce((sum, item) => {
            const menuItem = menu.find(i => i.id === item.id);
            return sum + (menuItem.price * item.quantity);
        }, 0);
        
        const tax = subtotal * 0.16;
        const total = subtotal + tax;
        
        subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        taxEl.textContent = `$${tax.toFixed(2)}`;
        totalEl.textContent = `$${total.toFixed(2)}`;
    };
    
    // --- EVENT HANDLERS ---
    
    const handleAddToCart = (itemId) => {
        const existingItem = cart.find(item => item.id === itemId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id: itemId, quantity: 1 });
        }
        renderCart();
    };
    
    const handleIncreaseQty = (itemId) => {
         const cartItem = cart.find(item => item.id === itemId);
         if(cartItem) {
             cartItem.quantity++;
             renderCart();
         }
    };
    
    const handleDecreaseQty = (itemId) => {
        const cartItem = cart.find(item => item.id === itemId);
        if(cartItem) {
            cartItem.quantity--;
            if(cartItem.quantity === 0) {
                cart = cart.filter(item => item.id !== itemId);
            }
            renderCart();
        }
    };
    
    const handlePlaceOrder = () => {
        confirmationModal.classList.remove('hidden');
    };
    
    const handleCloseModal = () => {
        confirmationModal.classList.add('hidden');
        cart = [];
        renderCart();
    };

    // --- EVENT LISTENERS ---

    menuContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const itemId = parseInt(e.target.dataset.id);
            handleAddToCart(itemId);
        }
    });
    
    cartItemsContainer.addEventListener('click', (e) => {
        const itemId = parseInt(e.target.dataset.id);
        if(e.target.classList.contains('increase-qty-btn')) {
            handleIncreaseQty(itemId);
        }
        if(e.target.classList.contains('decrease-qty-btn')) {
            handleDecreaseQty(itemId);
        }
    });
    
    placeOrderBtn.addEventListener('click', handlePlaceOrder);
    closeModalBtn.addEventListener('click', handleCloseModal);
    
    // Initial render
    renderMenu();
    renderCart();
});