let user = null;
let cart = [];
let orders = [];

// Đăng nhập
document.getElementById("login-button").addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (username && phone) {
        user = { username, phone };
        document.getElementById("login-modal").style.display = "none";
        document.getElementById("main-content").style.display = "block";
        document.getElementById("user-info").textContent = `Chào, ${user.username}`;
    } else {
        document.getElementById("login-error").textContent = "Vui lòng nhập đầy đủ thông tin!";
    }
});

// Thêm sản phẩm vào giỏ hàng
document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
        const product = e.target.closest(".product-card");
        const id = product.dataset.id;
        const name = product.dataset.name;
        const price = product.dataset.price;

        cart.push({ id, name, price });
        renderCart();
    });
});

// Hiển thị giỏ hàng
function renderCart() {
    const cartItems = document.querySelector(".cart-items");
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Giỏ hàng của bạn đang trống.</p>";
    } else {
        cart.forEach((item, index) => {
            const div = document.createElement("div");
            div.classList.add("mb-2");
            div.innerHTML = `
                <p>${item.name} - ${item.price}đ/kg</p>
                <button class="btn btn-sm btn-danger remove-item" data-index="${index}">Xóa</button>
            `;
            cartItems.appendChild(div);
        });
    }
}

// Xóa sản phẩm trong giỏ hàng
document.querySelector(".cart-items").addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-item")) {
        const index = e.target.dataset.index;
        cart.splice(index, 1);
        renderCart();
    }
});

// Xác nhận đơn hàng
document.querySelector(".confirm-order").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Giỏ hàng trống!");
        return;
    }

    const order = {
        user,
        items: [...cart],
        total: cart.reduce((sum, item) => sum + parseFloat(item.price), 0),
        date: new Date().toLocaleString(),
    };

    orders.push(order);
    cart = [];
    renderCart();
    renderOrders();
    alert("Đặt hàng thành công!");
});

// Hiển thị danh sách đơn hàng
function renderOrders() {
    const orderList = document.getElementById("order-list");

    if (orders.length === 0) {
        orderList.innerHTML = "<p class='text-center'>Chưa có đơn hàng nào.</p>";
        return;
    }

    let html = `
        <table class="table table-bordered">
            <thead class="table-dark">
                <tr>
                    <th>STT</th>
                    <th>Khách hàng</th>
                    <th>Số điện thoại</th>
                    <th>Sản phẩm</th>
                    <th>Tổng tiền</th>
                    <th>Thời gian</th>
                </tr>
            </thead>
            <tbody>
    `;

    orders.forEach((order, index) => {
        html += `
            <tr>
                <td>${index + 1}</td>
                <td>${order.user.username}</td>
                <td>${order.user.phone}</td>
                <td>${order.items.map(item => `${item.name} (${item.price}đ/kg)`).join("<br>")}</td>
                <td>${order.total}đ</td>
                <td>${order.date}</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;
    orderList.innerHTML = html;
}

// Xóa toàn bộ giỏ hàng
document.querySelector(".clear-cart").addEventListener("click", () => {
    cart = [];
    renderCart();
});

// Hiển thị giỏ hàng ban đầu
renderCart();
