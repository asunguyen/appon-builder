<template>
    <div class="login-container">
  
      <!-- Tiêu đề -->
      <h2 class="mb-4">APPON Login</h2>
  
      <!-- Form đăng nhập -->
      <form @submit.prevent="handleLogin" class="login-form">
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
        <button type="submit" class="btn btn-primary w-100">Login</button>
      </form>
  
      <!-- Thông báo lỗi -->
      <div v-if="errorMessage" class="alert alert-danger mt-3">
        {{ errorMessage }}
      </div>
  
      <!-- Gợi ý đăng ký tài khoản -->
      <p class="mt-3">
        Don't have an account? <router-link to="/register" class="register-link">Register here</router-link>
      </p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Login',
    data() {
      return {
        username: '',
        password: '',
        errorMessage: '',
      };
    },
    methods: {
      handleLogin() {
        // Username và password mặc định của APPON
        const defaultUsername = 'SITSolutionAdmin';
        const defaultPassword = 'SIT2025Solution';
  
        if (
          this.username === defaultUsername &&
          this.password === defaultPassword
        ) {
          // Đăng nhập thành công, chuyển hướng đến dashboard
          this.$router.push('/dashboard');
        } else {
          // Hiển thị thông báo lỗi
          this.errorMessage = 'Invalid username or password';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .logo {
    width: 150px;
    height: auto;
  }
  
  .login-form {
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
  
  .register-link {
    color: #2c3e50;
    font-weight: bold;
    text-decoration: none;
  }
  
  .register-link:hover {
    text-decoration: underline;
  }
  </style>