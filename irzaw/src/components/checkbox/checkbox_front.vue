<template>
    <div class="custom-checkbox">
      <input type="checkbox" v-model="isChecked" @change="handleChange" :id="uniqueId" :true-value="1" :false-value="0"/>
      <label :for="uniqueId" :style="{ '--size': size + 'px' }">
        <svg viewBox="0,0,50,50">
          <path d="M5 30 L 20 45 L 45 5"></path>
        </svg>
      </label>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isChecked: false,
        uniqueId: `checkbox-${Math.floor(Math.random() * 1000000)}`, // Generate a unique ID
      };
    },
    props: {
      size: {
        type: Number,
        default: 30,
      },
      value: {
        type: Number,
        default: 0,
      },
    },
    watch: {
      value(newVal) {
        if (newVal == 1){
            this.isChecked = true;
        } else {
            this.isChecked = false;
        }
      },
    },
    methods: {
      handleChange() {
        this.$emit('input', this.isChecked);
        this.$emit('change', this.isChecked);
      },
    },
  };
  </script>
  
  <style scoped>
  .custom-checkbox *,
  .custom-checkbox *:after,
  .custom-checkbox *:before {
      box-sizing: border-box;
  }
  
  .custom-checkbox input {
      position: absolute;
      opacity: 0;
  }
  
  .custom-checkbox input:checked+label svg path {
      stroke-dashoffset: 0;
  }
  
  .custom-checkbox input:focus+label {
      transform: scale(1.03);
  }
  
  .custom-checkbox input+label {
      display: block;
      border: 2px solid #333;
      width: var(--size);
      height: var(--size);
      border-radius: 6px;
      cursor: pointer;
      transition: all .2s ease;
  }
  
  .custom-checkbox input+label:active {
      transform: scale(1.05);
      border-radius: 12px;
  }
  
  .custom-checkbox input+label svg {
      pointer-events: none;
      padding: 5%;
  }
  
  .custom-checkbox input+label svg path {
      fill: none;
      stroke: #333;
      stroke-width: 4px;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-dasharray: 100;
      stroke-dashoffset: 101;
      transition: all 250ms cubic-bezier(1, 0, .37, .91);
  }
  </style>
  