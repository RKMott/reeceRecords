let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(id, name, price) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(name + ' added to cart!');
}

function renderCart() {
  // Check if cart should be cleared
  if (localStorage.getItem('clearCart') === 'true') {
    localStorage.removeItem('cart');
    localStorage.removeItem('clearCart');
    alert('Thank you! Your cart has been cleared after your purchase.');
  }

  const cartDiv = document.getElementById('cart');
  if (!cartDiv) return;

  cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
    cartDiv.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  let total = 0;
  let html = '<ul>';
  cart.forEach((item) => {
    total += item.price * item.quantity;
    html += `
      <li>
        ${item.name} x ${item.quantity} - £${(item.price * item.quantity).toFixed(2)}
        <button onclick="removeFromCart(${item.id})">Remove One</button>
      </li>`;
  });
  html += `</ul><p>Total: £${total.toFixed(2)}</p>`;
  cartDiv.innerHTML = html;
}

function removeFromCart(id) {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cart.findIndex(item => item.id === id);
  
    if (index !== -1) {
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
      } else {
        cart.splice(index, 1);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart(); // refresh the cart display
    }
  }

function submitCartData(form) {
  document.getElementById('cart_data').value = JSON.stringify(cart);
  return true;
}

window.onload = renderCart;