<template>
<div :class="{ 'sidebar': true}" v-if="isDesktop">
    <div class="sidebar-content">

        <div class="logo">

            <h1>irzaw.</h1>

        </div>

        <div class="links">
            <div class="link-button link_desktop" v-for="link in links" :class="{ active_tile: activeTile === link.name }" @click="setActiveTile(link.name)" @mouseover="setHoveredTile(link.name)" @mouseleave="resetHoveredTile">
                <span>{{link.name}}</span>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                    <path fill="#fff" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                </svg>
            </div>

        </div>

        <div class="account account_desktop">
            <div class="username">
                {{this.username}}
            </div>
            <svg @click="logout" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                <path fill="#fff" d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
            </svg>
        </div>
    </div>
</div>

<div :class="{ 'sidebar': true, 'mobile': true, 'slide-mobile': isSidebarOpen, 'slide-mobile2': !isSidebarOpen}" v-if="!isDesktop">
    <div class="close-button" @click="isSidebarOpen = false">X</div>

    <div class="sidebar-content">

        <div class="logo logo_mobile">

            <h1>irzaw.</h1>

        </div>

        <div class="links">
            <div class="link-button link_mobile" v-for="link in links" :class="{ active_tile: activeTile === link.name }" @click="setActiveTile(link.name)" @mouseover="setHoveredTile(link.name)" @mouseleave="resetHoveredTile">
                <span>{{link.name}}</span>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                    <path fill="#fff" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                </svg>
            </div>

        </div>

        <div class="account">
            <div class="username">
                {{this.username}}
            </div>
            <svg @click="logout" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                <path fill="#fff" d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
            </svg>
        </div>
    </div>
</div>
<div class="header" v-if="!isDesktop">
    <div class="logo header_logo">irzaw.</div>
    <svg class="svg" @click="toggleSidebar" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
        <path fill="#fff" d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
    </svg>

</div>
</template>

<script>
export default {
    name: 'Sidebar',

    data() {
        return {
            isSidebarOpen: false,
            activeTile: null,
            hoveredTile: null,
            isDesktop: false,
            links: [{
                    name: 'projects',
                    route: '/projects'
                },
                {
                    name: 'expertise',
                    route: '/expertise'
                },
                {
                    name: 'people',
                    route: '/people'
                }
            ],
            username: null,
            permission: null,
            token: null
        }
    },

    methods: {
        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen
        },
        setActiveTile(tile) {
            this.activeTile = tile;
        },
        setHoveredTile(tile) {
            this.hoveredTile = tile;
        },
        resetHoveredTile() {
            this.hoveredTile = null;
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
        logout() {
            this.$store.dispatch('performLogin');
            this.$router.push('/login?logout=true');
        },
    },
    mounted() {
        this.isDesktop = window.innerWidth > 768;
        if (this.$route.path.includes('expertise')) {
            this.activeTile = 'expertise'
        } else if (this.$route.path.includes('people')) {
            this.activeTile = 'people'
        } else if (this.$route.path.includes('projects')) {
            this.activeTile = 'projects'
        }
        window.addEventListener('resize', () => {
            this.isDesktop = window.innerWidth > 768;
            console.log(this.isDesktop)
        });

        let username = this.getCookie('username');
        let permission = this.getCookie('permission');
        let token = this.getCookie('token');
        this.username = username;
        this.permission = permission;
        this.token = token;
        if (username && permission && token) {
            console.log(username, permission, token);
            if (permission == "marketing") {
                this.$router.push("/marketing_view/projects/panel");

            }

        } else {
            this.$router.push("/?logout=true");
        }
    },
    beforeDestroy() {
        window.removeEventListener('resize', () => {
            this.isDesktop = window.innerWidth > 768;
        });
    }
}
</script>

<style scoped>
@import '@/assets/font.css';

.header_logo {
    padding: 2vw;
}

h1 {
    font-family: 'PoppinsMedium', sans-serif !important;
}

.svg {}

.header {
    background-color: #000;
    width: 100vw;
    top: 0;
    left: 0;
    color: #fff;
    display: flex;
    justify-content: space-between;
    position: static;
    font-family: 'PoppinsMedium', sans-serif !important;
    align-items: center;
    transition: all 0.3s ease;
}

.link_mobile {
    width: 70vw;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
}

.link_desktop {
    width: 60%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
}

.slide-mobile2 {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
}

.slide-mobile {
    transform: translateX(0);
    transition: transform 0.3s ease;
}

.logo {
    padding: 1vw 4vw;
    font-size: 24px;
}

.logo_mobile {
    justify-content: center;
}

.hidden {
    display: none;
}

.links {
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #fff;
}

.mobile {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    z-index: 10;
    transition: 0.5s;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    display: flex;
    justify-content: center;
    flex-direction: column;
    /* flex-wrap: nowrap; */
    /* align-content: flex-start; */
    align-items: center;
}

.sidebar {
    position: sticky;
    padding: 0 !important;
    top: 0;
    left: 0;
    width: 300px;
    height: 100vh;
    background: #fff;
    transition: 0.5s;
    font-family: 'PoppinsMedium', sans-serif;
    background-color: black;
    color: white;
}

.sidebar.is-collapsed {
    transform: translateX(-200px);
}

.sidebar-content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
}

.link-button {
    cursor: pointer;
    padding: 0.5vw 1vw;
    transition: background-color .3s;
    border-radius: 1vw;
    margin: 1vw;
}

.link-button:hover,
.link-button.active_tile {
    background-color: #26252C;
    /* Change the color to your desired pressed state color */
}

.open {
    background: none;
    border: none;
    font-size: 1.5em;
    color: black;
    cursor: pointer;
    position: absolute;
    top: 10px;
    left: 10px;
}

.logo {
    display: flex;
    justify-content: space-between;

}

.account {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1vw;

}

.account_desktop {
    width: 75%;
    margin: 0 auto;
}

@media (max-width: 768px) {
    .sidebar {
        position: absolute;
        width: 100vw !important;
    }

    .desktop {
        display: none;
    }

    .sidebar.is-open {
        transform: none;
    }

    .open {
        display: block;
    }

}
</style>
