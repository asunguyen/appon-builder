<template>
    <div class="profile-container">
      <h2 class="mb-4">Profile</h2>
  
      <!-- Thông báo thành công hoặc lỗi -->
      <div v-if="successMessage" class="alert alert-success mb-3">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="alert alert-danger mb-3">
        {{ errorMessage }}
      </div>
  
      <!-- Thông tin người dùng -->
      <div class="card mb-4">
        <div class="card-body">
          <h5 class="card-title">User Information</h5>
          <div class="row">
            <div class="col-md-6">
              <p><strong>Username:</strong> {{ user.username }}</p>
              <p><strong>Email:</strong> {{ user.email }}</p>
              <p><strong>Joined Date:</strong> {{ user.joinedDate }}</p>
            </div>
            <div class="col-md-6">
              <p><strong>Role:</strong> {{ user.role }}</p>
              <p><strong>Last Login:</strong> {{ user.lastLogin }}</p>
            </div>
          </div>
          <button class="btn btn-primary mt-3" @click="enableEdit">Edit Profile</button>
        </div>
      </div>
  
      <!-- Form chỉnh sửa thông tin (hiển thị khi nhấn Edit) -->
      <div v-if="isEditing" class="card">
        <div class="card-body">
          <h5 class="card-title">Edit Profile</h5>
          <form @submit.prevent="handleUpdate">
            <div class="mb-3">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                v-model="editUser.username"
                placeholder="Enter username"
                required
              />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="editUser.email"
                placeholder="Enter email"
                required
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">New Password (optional)</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="editUser.password"
                placeholder="Enter new password"
              />
            </div>
            <div class="d-flex gap-2">
              <button type="submit" class="btn btn-primary">Save Changes</button>
              <button type="button" class="btn btn-secondary" @click="cancelEdit">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Profile',
    data() {
      return {
        user: {
          username: '',
          email: '',
          joinedDate: '',
          role: 'Admin',
          lastLogin: '',
        },
        editUser: {
          username: '',
          email: '',
          password: '',
        },
        isEditing: false,
        successMessage: '',
        errorMessage: '',
      };
    },
    mounted() {
      // Lấy thông tin người dùng từ localStorage
      const userData = localStorage.getItem('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        this.user = {
          username: parsedUser.username || 'SITSolutionAdmin',
          email: parsedUser.email || 'admin@sitsolution.com',
          joinedDate: new Date().toLocaleDateString(), // Giả lập ngày tham gia
          role: 'Admin', // Giả lập vai trò
          lastLogin: new Date().toLocaleString(), // Giả lập thời gian đăng nhập cuối
        };
        // Sao chép thông tin để chỉnh sửa
        this.editUser = { ...this.user, password: '' };
      } else {
        this.errorMessage = 'User data not found. Please log in again.';
        //this.$router.push('/');
      }
    },
    methods: {
      enableEdit() {
        this.isEditing = true;
        this.successMessage = '';
        this.errorMessage = '';
      },
      cancelEdit() {
        this.isEditing = false;
        this.editUser = { ...this.user, password: '' };
        this.successMessage = '';
        this.errorMessage = '';
      },
      handleUpdate() {
        // Kiểm tra email hợp lệ
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.editUser.email)) {
          this.errorMessage = 'Please enter a valid email address';
          return;
        }
  
        // Cập nhật thông tin người dùng
        this.user.username = this.editUser.username;
        this.user.email = this.editUser.email;
  
        // Nếu có mật khẩu mới, cập nhật mật khẩu
        if (this.editUser.password) {
          this.user.password = this.editUser.password;
        }
  
        // Lưu lại vào localStorage (tạm thời để demo)
        localStorage.setItem('user', JSON.stringify(this.user));
  
        // Hiển thị thông báo thành công
        this.successMessage = 'Profile updated successfully!';
        this.errorMessage = '';
        this.isEditing = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .profile-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .card {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
  
  .card-title {
    color: #2c3e50;
    font-size: 1.25rem;
  }
  
  .form-label {
    font-weight: bold;
    color: #2c3e50;
  }
  
  .btn-primary {
    background-color: #2c3e50;
    border: none;
  }
  
  .btn-primary:hover {
    background-color: #1a252f;
  }
  
  .btn-secondary {
    background-color: #6c757d;
    border: none;
  }
  
  .btn-secondary:hover {
    background-color: #5a6268;
  }
  </style>