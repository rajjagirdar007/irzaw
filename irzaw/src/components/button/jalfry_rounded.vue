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
  border: 4px solid #ffffff; /* White border */
  text-transform: uppercase;
  color: #ffffff; /* White text color */
  font-size: 16px;
  letter-spacing: 2px;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  background-color: #000000; /* Background color for the button */
}

.custom-button .line {
  position: absolute;
  background: #000000; /* Dark color for the lines */
  padding: 1px !important;
}

.custom-button .line.top,
.custom-button .line.bottom {
  width: calc(100% + 8px); /* Adjusted width to include the border */
  height: 2px;
}

.custom-button .line.right,
.custom-button .line.left {
  height: calc(100% + 8px); /* Adjusted height to include the border */
  width: 2px;
}

.custom-button .line.top {
  top: 0;
  left: -4px; /* Adjusted left position to include the border */
  animation: animate1 2s linear infinite;
}

.custom-button .line.right {
  top: -4px; /* Adjusted top position to include the border */
  right: 0;
  animation: animate2 2s linear infinite;
  animation-delay: 1s;
}

.custom-button .line.bottom {
  bottom: 0;
  left: -4px; /* Adjusted left position to include the border */
  animation: animate3 2s linear infinite;
}

.custom-button .line.left {
  top: -4px; /* Adjusted top position to include the border */
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

