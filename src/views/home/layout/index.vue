<template>
  <div class="client-layout">
    <!-- Menu (Navbar) cố định ở trên cùng -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <!-- Logo hoặc tên thương hiệu -->
        <router-link class="navbar-brand" to="/">
          <span>APPON</span>
        </router-link>

        <!-- Nút toggle cho thiết bị di động -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Menu items -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <div class="d-flex justify-content-between w-100">
            <!-- Các mục chính (Home, About, Services, Contact) -->
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link class="nav-link" to="/" exact>Home</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/about">About</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/services">Services</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/prices">Prices</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/contact">Contact</router-link>
              </li>
            </ul>

            <!-- Mục Login (tách biệt bên tay phải) -->
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link class="nav-link login-link" to="/login">
                  <i class="bi bi-box-arrow-in-right login-icon"></i>
                  <span>Login</span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <!-- Nội dung chính -->
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClientLayout',
};
</script>

<style scoped>
.client-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Navbar */
.navbar {
  background-color: #2c3e50 !important; /* Màu xanh đậm của APPON */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: white !important;
}

.nav-link {
  color: white !important;
  font-size: 1.1rem;
  padding: 10px 15px;
}

.nav-link:hover {
  color: #d1d1d1 !important;
}

.nav-link.router-link-active {
  font-weight: bold;
  border-bottom: 2px solid white;
}

/* Định dạng riêng cho mục Login */
.login-link {
  background-color: #1a252f; /* Màu nền đậm hơn để nổi bật */
  border-radius: 20px; /* Bo góc để giống nút */
  padding: 8px 20px !important;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  margin-left: 20px; /* Tăng khoảng cách với các mục menu khác */
}

.login-link:hover {
  background-color: #34495e;
  color: white !important;
}

/* Khoảng cách giữa icon và chữ Login */
.login-icon {
  margin-right: 4px; /* Khoảng cách 4px giữa icon và chữ */
}

/* Nội dung chính */
.content {
  margin-top: 70px; /* Đảm bảo nội dung không bị che bởi navbar cố định */
  flex: 1;
  padding: 20px;
  background-color: #f8f9fa;
}

/* Responsive: Điều chỉnh trên thiết bị di động */
@media (max-width: 991px) {
  .navbar-nav {
    text-align: center;
  }

  .login-link {
    margin-left: 0;
    margin-top: 10px; /* Tách biệt mục Login trong menu hamburger */
  }
}
</style>