<template>
    <div class="home">
      <!-- Hero Section -->
      <section class="hero-section text-center text-white">
        <div class="container">
          <h1 class="display-4">Welcome to APPON</h1>
          <p class="lead">
            Empowering your business with innovative technology solutions, trading insights, and fanpage management.
          </p>
          <router-link to="/services" class="btn btn-primary btn-lg mt-3">
            Explore Our Services
          </router-link>
        </div>
      </section>
  
      <!-- Services Section -->
      <section class="services-section py-5">
        <div class="container">
          <h2 class="text-center mb-5">Our Services</h2>
          <div class="row">
            <div class="col-md-4 mb-4">
              <div class="card h-100">
                <div class="card-body">
                  <h5 class="card-title">Technology Solutions</h5>
                  <p class="card-text">
                    We provide cutting-edge software development and IT solutions to help your business grow.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-4">
              <div class="card h-100">
                <div class="card-body">
                  <h5 class="card-title">Business Consulting</h5>
                  <p class="card-text">
                    Our experts offer consulting services to optimize your operations and strategy.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-4">
              <div class="card h-100">
                <div class="card-body">
                  <h5 class="card-title">Support & Maintenance</h5>
                  <p class="card-text">
                    24/7 support to ensure your systems run smoothly and efficiently.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-4">
              <div class="card h-100">
                <div class="card-body">
                  <h5 class="card-title">Trading Insights</h5>
                  <p class="card-text">
                    Get real-time trading insights and analytics, including gold price updates.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-4">
              <div class="card h-100">
                <div class="card-body">
                  <h5 class="card-title">Fanpage Management</h5>
                  <p class="card-text">
                    Manage and grow your fanpage with our expert solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Fanpage Section -->
      <section class="fanpage-section py-5 bg-light">
        <div class="container">
          <h2 class="text-center mb-5">Our Fanpage</h2>
          <div class="row align-items-center">
            <div class="col-md-6">
              <h3>Hành Trình Phát Triển Bản Thân</h3>
              <p>
                Join our fanpage "Hành Trình Phát Triển Bản Thân" to get daily inspiration and tips for personal growth.
              </p>
              <p><strong>Total Likes:</strong> 1,250</p>
              <p><strong>Recent Post:</strong> "5 việc cần làm mỗi buổi sáng để thành công"</p>
              <a href="https://facebook.com" target="_blank" class="btn btn-primary">
                Visit Fanpage
              </a>
            </div>
            <div class="col-md-6 text-center">
              <div class="fanpage-placeholder">
                <p>[Fanpage Preview Placeholder]</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Trading Insights Section -->
      <section class="trading-section py-5">
        <div class="container">
          <h2 class="text-center mb-5">Trading Insights</h2>
          <div class="row">
            <div class="col-md-6 offset-md-3">
              <div class="card">
                <div class="card-body text-center">
                  <h5 class="card-title">Gold Price Update</h5>
                  <p><strong>Current Price:</strong> $3,052/oz</p>
                  <p><strong>Trend:</strong> Upward (based on 18/03/2025 forecast)</p>
                  <router-link to="/services" class="btn btn-primary">
                    Learn More
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Testimonials Section -->
      <section class="testimonials-section py-5 bg-light">
        <div class="container">
          <h2 class="text-center mb-5">What Our Clients Say</h2>
          <div class="row">
            <div class="col-md-4 mb-4">
              <div class="card">
                <div class="card-body">
                  <p class="card-text">
                    "APPON helped us streamline our operations with their amazing technology solutions!"
                  </p>
                  <p class="card-text text-end"><strong>- John Doe, CEO</strong></p>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-4">
              <div class="card">
                <div class="card-body">
                  <p class="card-text">
                    "Their trading insights are incredibly accurate and have helped us make better decisions."
                  </p>
                  <p class="card-text text-end"><strong>- Jane Smith, Trader</strong></p>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-4">
              <div class="card">
                <div class="card-body">
                  <p class="card-text">
                    "Managing our fanpage has never been easier thanks to APPON's expertise."
                  </p>
                  <p class="card-text text-end"><strong>- Anna Lee, Marketer</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- CTA Section -->
      <section class="cta-section py-5 text-center text-white">
        <div class="container">
          <h2 class="mb-4">Ready to Transform Your Business?</h2>
          <p class="lead">
            Contact us today to learn how APPON can help you achieve your goals.
          </p>
          <router-link to="/contact" class="btn btn-primary btn-lg">
            Get in Touch
          </router-link>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Home',
  };
  </script>
  
  <style scoped>
  .home {
    padding: 0;
  }
  
  /* Hero Section */
  .hero-section {
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url('https://via.placeholder.com/1500x600'); /* Placeholder background */
    background-size: cover;
    background-position: center;
    padding: 100px 0;
  }
  
  .hero-section h1 {
    font-weight: bold;
    color: white;
  }
  
  .hero-section .btn-primary {
    background-color: #2c3e50;
    border: none;
  }
  
  .hero-section .btn-primary:hover {
    background-color: #1a252f;
  }
  
  /* Services Section */
  .services-section {
    background-color: white;
  }
  
  .services-section .card {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: none;
  }
  
  .services-section .card-title {
    color: #2c3e50;
  }
  
  /* Fanpage Section */
  .fanpage-section {
    background-color: #f8f9fa;
  }
  
  .fanpage-placeholder {
    background-color: #e9ecef;
    padding: 50px;
    border-radius: 8px;
  }
  
  .fanpage-section .btn-primary {
    background-color: #2c3e50;
    border: none;
  }
  
  .fanpage-section .btn-primary:hover {
    background-color: #1a252f;
  }
  
  /* Trading Insights Section */
  .trading-section {
    background-color: white;
  }
  
  .trading-section .card {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: none;
  }
  
  .trading-section .card-title {
    color: #2c3e50;
  }
  
  .trading-section .btn-primary {
    background-color: #2c3e50;
    border: none;
  }
  
  .trading-section .btn-primary:hover {
    background-color: #1a252f;
  }
  
  /* Testimonials Section */
  .testimonials-section {
    background-color: #f8f9fa;
  }
  
  .testimonials-section .card {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: none;
  }
  
  /* CTA Section */
  .cta-section {
    background-color: #2c3e50;
  }
  
  .cta-section .btn-primary {
    background-color: white;
    color: #2c3e50;
    border: none;
  }
  
  .cta-section .btn-primary:hover {
    background-color: #e9ecef;
  }
  </style>