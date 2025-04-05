<template>
    <div class="dashboard-home">
      <h2>Welcome to APPON Dashboard</h2>
      <p>Here you can manage your fanpage, track trading insights, and more.</p>
      <div class="row mt-4">
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Fanpage Stats</h5>
              <p class="card-text">Total Likes: 1,250</p>
              <p class="card-text">New Followers: 45</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Trading Insights</h5>
              <p class="card-text">Gold Price: $3,052/oz</p>
              <p class="card-text">Trend: Upward</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Recent Activity</h5>
              <p class="card-text">Logged in at: 29/03/2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DashboardHome',
  };
  </script>
  
  <style scoped>
  .dashboard-home {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .card {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .card-title {
    color: #2c3e50;
  }
  </style>