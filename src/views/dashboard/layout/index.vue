<template>
    <div class="dashboard-container">
      <!-- Side-bar bên trái -->
      <div class="sidebar" :class="{ 'sidebar-collapsed': !isSidebarOpen }">
  
        <!-- Tiêu đề -->
        <h3 class="sidebar-title" v-if="isSidebarOpen">APPON</h3>
        <h3 class="sidebar-title-collapsed" v-else>SS</h3>
  
        <!-- Menu -->
        <ul class="nav flex-column">
          <!-- Menu Dashboard (có sub-menu) -->
          <li class="nav-item">
            <a
              href="#"
              class="nav-link"
              data-bs-toggle="collapse"
              :class="{ 'collapsed': !isDashboardOpen }"
              @click="toggleDashboardMenu"
              v-if="isSidebarOpen"
            >
              Dashboard
              <span class="float-end">
                <i :class="isDashboardOpen ? 'bi bi-chevron-down' : 'bi bi-chevron-right'"></i>
              </span>
            </a>
            <a
              href="#"
              class="nav-link"
              data-bs-toggle="collapse"
              :class="{ 'collapsed': !isDashboardOpen }"
              @click="toggleDashboardMenu"
              v-else
            >
              <i class="bi bi-house-door"></i>
            </a>
            <ul
              id="dashboardSubmenu"
              class="nav flex-column collapse"
              :class="{ 'show': isDashboardOpen }"
            >
              <li class="nav-item sub-item">
                <router-link to="/dashboard/summary" class="nav-link" exact v-if="isSidebarOpen">
                    Summary
                </router-link>
                <router-link to="/dashboard/summary" class="nav-link" exact v-else>
                  <i class="bi bi-house-door"></i>
                </router-link>
              </li>
              <li class="nav-item sub-item">
                <router-link to="/dashboard/profile" class="nav-link" v-if="isSidebarOpen">
                  Profile
                </router-link>
                <router-link to="/dashboard/profile" class="nav-link" v-else>
                  <i class="bi bi-person"></i>
                </router-link>
              </li>
            </ul>
          </li>
  
          <!-- Menu Trading Insights -->
          <li class="nav-item">
            <router-link to="/dashboard/trading" class="nav-link" v-if="isSidebarOpen">
              Trading Insights
            </router-link>
            <router-link to="/dashboard/trading" class="nav-link" v-else>
              <i class="bi bi-graph-up"></i>
            </router-link>
          </li>
  
          <!-- Menu Fanpage Management -->
          <li class="nav-item">
            <router-link to="/dashboard/fanpage" class="nav-link" v-if="isSidebarOpen">
              Fanpage Management
            </router-link>
            <router-link to="/dashboard/fanpage" class="nav-link" v-else>
              <i class="bi bi-megaphone"></i>
            </router-link>
          </li>
  
          <!-- Menu Logout (ngang cấp với Dashboard) -->
          <li class="nav-item">
            <router-link to="/" class="nav-link" @click="handleLogout" v-if="isSidebarOpen">
              Logout
            </router-link>
            <router-link to="/" class="nav-link" @click="handleLogout" v-else>
              <i class="bi bi-box-arrow-right"></i>
            </router-link>
          </li>
        </ul>
      </div>
  
      <!-- Nội dung chính bên phải -->
      <div class="content" :class="{ 'content-expanded': !isSidebarOpen }">
        <router-view />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Dashboard',
    data() {
      return {
        isSidebarOpen: true, // Trạng thái side-bar (mở/đóng)
        isDashboardOpen: true, // Trạng thái sub-menu Dashboard (mở/đóng)
      };
    },
    methods: {
      toggleSidebar() {
        this.isSidebarOpen = !this.isSidebarOpen;
        // Đóng sub-menu khi thu gọn side-bar
        if (!this.isSidebarOpen) {
          this.isDashboardOpen = false;
        }
      },
      toggleDashboardMenu() {
        if (this.isSidebarOpen) {
          this.isDashboardOpen = !this.isDashboardOpen;
        }
      },
      handleLogout() {
        // Xóa thông tin người dùng và chuyển hướng về trang đăng nhập
        localStorage.removeItem('user');
        this.$router.push('/');
      },
    },
  };
  </script>
  
  <style scoped>
  .dashboard-container {
    display: flex;
    min-height: 100vh;
    width: 100%;
  }
  
  /* Side-bar */
  .sidebar {
    width: 250px;
    background-color: #2c3e50;
    color: white;
    padding: 20px;
    position: fixed;
    height: 100%;
    overflow-y: auto;
    top: 0;
    left: 0;
    transition: width 0.3s ease;
  }
  
  .sidebar-collapsed {
    width: 60px;
  }
  
  .sidebar-toggle {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
  
  .sidebar-title {
    font-size: 1.5rem;
    margin-bottom: 20px;
    text-align: center;
    color: white;
  }
  
  .sidebar-title-collapsed {
    font-size: 1.2rem;
    margin-bottom: 20px;
    text-align: center;
    color: white;
  }
  
  .nav-link {
    color: white;
    font-size: 1.1rem;
    padding: 10px 15px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .nav-link:hover {
    background-color: #1a252f;
    color: white;
  }
  
  .nav-link.router-link-active {
    background-color: #1a252f;
    font-weight: bold;
  }
  
  /* Sub-menu */
  .sub-item .nav-link {
    padding-left: 30px;
    font-size: 1rem;
  }
  
  .sub-item .nav-link.router-link-active {
    background-color: #34495e;
  }
  
  /* Khi side-bar thu gọn */
  .sidebar-collapsed .nav-link {
    justify-content: center;
    padding: 10px;
  }
  
  .sidebar-collapsed .sub-item .nav-link {
    padding-left: 15px;
  }
  
  /* Nội dung chính */
  .content {
    margin-left: 250px;
    flex: 1;
    padding: 30px;
    background-color: #f8f9fa;
    min-height: 100vh;
    box-sizing: border-box;
    transition: margin-left 0.3s ease;
  }
  
  .content-expanded {
    margin-left: 60px;
  }
  </style>