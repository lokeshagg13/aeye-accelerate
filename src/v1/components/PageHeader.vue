<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <header class="header">
    <div class="navbar">
      <div @click="openDropdown" class="navbar-icon">
        <svg t="1711784679283" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="4371" width="32" height="32">
          <path d="M0 128h1024v85.333333H0zM0 469.333333h1024v85.333334H0zM0 810.666667h1024v85.333333H0z"
            fill="#2c2c2c" p-id="4372"></path>
        </svg>
        <!-- Left navigation bar icon -->
      </div>
      <div  class="navbar-mid">
        <div class="logo" @click="navigateToHomePage">
          <img src="@/v1/assets/project_logo.svg" width="62" height="62" />
        </div>
        <div class="app-title">
          <h1>A.EYE</h1>
        </div>
      </div>
    </div>
  </header>
  <div v-if="dropdownShowing" class="dropdown-content">
    <div @click="navigateToLLPage" class="dropdown-item">Learning Language</div>
    <!-- <div class="dropdown-item">Learning Mathematics</div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      dropdownShowing: false,
      timeoutId: null,
    };
  },
  methods: {
    openDropdown() {
      if (this.timeoutId) clearTimeout(this.timeoutId);
      // Set a new timeout to close the dropdown
      this.timeoutId = setTimeout(() => {
        this.closeDropdown();
      }, 3000);
      this.dropdownShowing = true;
    },
    closeDropdown() {
      this.dropdownShowing = false;
    },
    navigateToHomePage() {
      if (this.dropdownShowing) this.closeDropdown();
      this.$router.push("/v1");
    },
    navigateToLLPage() {
      if (this.dropdownShowing) this.closeDropdown();
      this.$router.push("/v1/LearningLanguage");
    },
  },
};
</script>

<style scoped>
.header {
  width: 100%;
  background-color: #d3d1dc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  color: black;
  /* Ensure there is no external margin */
}

.navbar {
  display: flex;
  align-items: center;
  width: 100%;
}

.navbar-icon {
  width: 30px;
  height: 30px;
  margin-left: 10px;
  cursor: pointer;
}

.navbar-mid {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
}

.logo {
  width: 62px;
  height: 62px;
  margin-right: 20px;
  cursor: pointer;
}

.dropdown-content {
  flex-direction: column;
  position: fixed;
  left: 0;
  background-color: #d3d1dc;
  min-width: 120px;
  max-width: 250px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 2;
  font-size: 14px;
}

.dropdown-item {
  text-decoration: none;
  color: black;
  padding: 8px 12px;
  display: block;
  white-space: nowrap;
  font-size: large;
  cursor: pointer;
  border-bottom: 1px solid;
  text-align: left;
}

@media screen and (max-width: 768px) {
  .dropdown-content {
    max-width: 180px;
  }
}
</style>
