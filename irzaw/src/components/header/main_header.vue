<template>
  <div class="header">
    <div class="desktop-menu">
      <div class="flex" id="head">
        <div class="logo" @click="this.$router.go('/')">irzaw</div>
        <div class="links">
          <div class="back-button"><router-link class="desktop-button" to="/projects">projects.</router-link></div>
          <div class="back-button"><router-link class="desktop-button" to="/people">people.</router-link></div>
          <div class="back-button"><router-link class="desktop-button" to="/expertise">expertise.</router-link></div>
          <div class="back-button border" @click="logout()">logout {{this.username}}</div>

	</div>
      </div>
    </div>
    <div class="mobile-menu">
      <div class="flex justify">
        <div class="logo" @click="this.$router.go('/')">irzaw</div>
        <div class="flex">
      		<div class="back-button border" @click="logout()">logout</div>
		<div class="logo svg" @click="toggleMenu()">
			<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
				<path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
			</svg>
		</div>
	</div>
      </div>
      <div class="menu" :class="{ active: isMenuOpen }">
        <div class="back-button"><router-link class="mobile-button" to="/projects">projects.</router-link></div>
        <div class="back-button"><router-link class="mobile-button" to="/people">people.</router-link></div>
        <div class="back-button"><router-link class="mobile-button" to="/expertise">expertise.</router-link></div>
	<div class="back-button" @click="toggleMenu()">close</div>      
</div>
    </div>
  </div>
</template>

<style>
.header {
  background-color: black;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 999;
}
.mobile-button{
	color: black;
}

.desktop-button{
	color: white;
}
.svg{
	vertical-align: middle;
	fill: white;
}
.desktop-menu {
  display: flex;
  align-items: center;
}

.justify{
	    justify-content: space-between !important;
}
.flex {
  display: flex;
  align-items: center;
}

.logo {
  color: white;
  font-size: 20px;
}

.links {
  display: flex;
}

.back-button {
  color: white ;
  font-size: 16px;
  cursor: pointer;
  margin-right: 10px;
}

.mobile-menu {
  display: none;
}

.menu-button {
  display: block;
  cursor: pointer;
}

.menu {
  display: none;
  background-color: black;
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  z-index: 999;
  flex-direction: column;
}

.active {
  display: flex;
}

.border {
  border: solid white 1px;
  border-radius: 10px;
  padding: 5px !important;
}



@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .desktop-menu {
    display:none;
  }

  .mobile-menu{
	display: block;
	width: 100%;
  }
}

#head{
width: 100vw;
}
/* Add more styles as needed for responsiveness */
</style>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
	username: null,
	permission : null,
	token: null
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    goBack() {
      window.history.back();
    },
    logout() {
      this.$store.dispatch('performLogin');
      this.$router.push('/login?logout=true');
    },
                getCookie(name) {
                    var nameEQ = name + "=";
                    var ca = document.cookie.split(';');
                    for (var i = 0; i < ca.length; i++) {
                        var c = ca[i];
                        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
                    }
                    return null;
                },
  },
mounted() {
                let username = this.getCookie('username');
                let permission = this.getCookie('permission');
                let token = this.getCookie('token');
                this.username = username; 
		this.permission = permission;
		this.token = token;
		if (username && permission && token) {
                    console.log(username, permission, token);
                        if (permission == "marketing"){
                                 this.$router.push("/marketing_view/projects/panel");

                        }

                } else {
                    this.$router.push("/?logout=true");
                }
}
};
</script>

