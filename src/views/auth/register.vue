<template>
    <div class="register-container">
      <!-- Tiêu đề -->
      <h2 class="mb-4">APPON Register</h2>
  
      <!-- Form đăng ký -->
      <form @submit.prevent="handleRegister" class="register-form">
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input
            type="text"
            class="form-control"
            id="username"
            v-model="username"
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
            v-model="email"
            placeholder="Enter email"
            required
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="password"
            placeholder="Enter password"
            required
          />
        </div>
        <div class="mb-3">
          <label for="confirm-password" class="form-label">Confirm Password</label>
          <input
            type="password"
            class="form-control"
            id="confirm-password"
            v-model="confirmPassword"
            placeholder="Confirm password"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary w-100">Register</button>
      </form>
  
      <!-- Thông báo lỗi -->
      <div v-if="errorMessage" class="alert alert-danger mt-3">
        {{ errorMessage }}
      </div>
  
      <!-- Liên kết quay lại đăng nhập -->
      <p class="mt-3">
        Already have an account? <router-link to="/login" class="login-link">Login here</router-link>
      </p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Register',
    data() {
      return {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        errorMessage: '',
      };
    },
    methods: {
      handleRegister() {
        // Kiểm tra mật khẩu và xác nhận mật khẩu có khớp không
        if (this.password !== this.confirmPassword) {
          this.errorMessage = 'Passwords do not match';
          return;
        }
  
        // Logic đăng ký (tạm thời lưu vào localStorage để demo)
        const user = {
          username: this.username,
          email: this.email,
          password: this.password,
        };
        localStorage.setItem('user', JSON.stringify(user));
  
        // Chuyển hướng về trang đăng nhập sau khi đăng ký thành công
        this.$router.push('/');
      },
    },
  };
  </script>
  
  <style scoped>
  .register-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .register-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
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
  
  .login-link {
    color: #2c3e50;
    font-weight: bold;
    text-decoration: none;
  }
  
  .login-link:hover {
    text-decoration: underline;
  }
  </style>