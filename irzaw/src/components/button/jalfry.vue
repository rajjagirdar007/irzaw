<template>
  <div class="button-container">
    <a href="#" class="custom-button">
      <span class="line top"></span>
      <span class="line right"></span>
      <span class="line bottom"></span>
      <span class="line left"></span>
      Jalfry
    </a>
  </div>
</template>

<style>
.custom-button {
  display: inline-block;
  padding: 10px 20px;
  border: 4px solid #0f0f0f;
  text-transform: uppercase;
  color: #000000;
  font-size: 16px;
  letter-spacing: 2px;
  text-decoration: none;
  position: relative;
  overflow: hidden;
}

.custom-button .line {
  position: absolute;
  background: #0f0f0f;
  padding: 1px;
}

.custom-button .line.top,
.custom-button .line.bottom {
  width: 100%;
  height: 2px;
}

.custom-button .line.right,
.custom-button .line.left {
  height: 100%;
  width: 2px;
}

.custom-button .line.top {
  top: 0;
  left: 0;
  animation: animate1 2s linear infinite;
}

.custom-button .line.right {
  top: 0;
  right: 0;
  animation: animate2 2s linear infinite;
  animation-delay: 1s;
}

.custom-button .line.bottom {
  bottom: 0;
  left: 0;
  animation: animate3 2s linear infinite;
}

.custom-button .line.left {
  top: 0;
  left: 0;
  animation: animate4 2s linear infinite;
  animation-delay: 1s;
}

@keyframes animate1 {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

@keyframes animate2 {
  0% {
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(100%);
  }
}

@keyframes animate3 {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(-100%);
  }
}

@keyframes animate4 {
  0% {
    transform: translateY(100%);
  }

  100% {
    transform: translateY(-100%);
  }
}

.button-container {
  /* Add any additional styling for the container if needed */
}
</style>

