<template>
  <footer class="app-footer">
    <div class="footer-content">
      <div class="bitcoin-info">
        <i class="fab fa-bitcoin"></i>
        <p>Powered by Bitcoin</p>
      </div>

      <div class="social-links">
        <a href="https://www.linkedin.com/in/noam-green-3b597927b/" target="_blank" rel="noopener noreferrer">
          <i class="fab fa-linkedin"></i>
        </a>
        <a href="https://github.com/NoamGreen96" target="_blank" rel="noopener noreferrer">
          <i class="fab fa-github"></i>
        </a>
        <a href="https://www.facebook.com/noam.green.420/" target="_blank" rel="noopener noreferrer">
          <i class="fab fa-facebook"></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {}
</script>

<style lang="scss">
.app-footer {
  background-color: #333;
  color: #fff;
  padding: 1rem;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.social-links {
  display: flex;
}

.social-links a {
  margin-right: 0.5rem;
}

.bitcoin-info {
  display: flex;
  align-items: center;
}

.bitcoin-info i {
  margin-right: 0.5rem;
  font-size: 1.2rem;
}
</style>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
</style>
