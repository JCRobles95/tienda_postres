// Tu número de WhatsApp (incluye el código de país, sin '+' o '00')
const WHATSAPP_NUMBER = "5211234567890"; // Reemplaza con tu número

// Lista de productos
const products = [
    {
        id: 1,
        name: "Pastel de Chocolate",
        price: 250,
        image: "img/chocolatecake.png", // URL de la imagen del producto
        description: "Intenso y delicioso pastel de chocolate."
    },
    {
        id: 2,
        name: "Cheesecake de Fresa",
        price: 220,
        image: "img/cheesecakeFresa.png",
        description: "Cremoso cheesecake con fresas frescas."
    },
    {
        id: 3,
        name: "Flan Napolitano",
        price: 180,
        image: "img/flanNapolitano.png",
        description: "El clásico flan con un toque de caramelo."
    }
];

// Carrito de compras
let cart = [];

// ¡Aquí irá el resto de la lógica!

const menuContainer = document.getElementById('menu-container');

function renderProducts() {
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p><strong>Precio: $${product.price} MXN</strong></p>
            <button onclick="addToCart(${product.id})">Agregar al Carrito</button>
        `;
        menuContainer.appendChild(productCard);
    });
}

// Llama a la función para que se ejecute al cargar la página
renderProducts();

const cartItemsContainer = document.getElementById('cart-items');

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        renderCart();
    }
}

function renderCart() {
    cartItemsContainer.innerHTML = ''; // Limpiar el carrito antes de volver a mostrarlo
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.innerText = `${item.name} - $${item.price} MXN`;
            cartItemsContainer.appendChild(cartItem);
        });
    }
}

// Llama a renderCart al inicio para mostrar el mensaje de carrito vacío
renderCart();

const checkoutBtn = document.getElementById('checkout-btn');

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Tu carrito está vacío. ¡Añade un postre!");
        return;
    }

    let message = "¡Hola! Quiero hacer un pedido:\n\n";
    let total = 0;

    cart.forEach(item => {
        message += `- ${item.name} ($${item.price})\n`;
        total += item.price;
    });

    message += `\n*Total: $${total} MXN*`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Abre WhatsApp en una nueva pestaña
    window.open(whatsappURL, '_blank');
});