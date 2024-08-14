<template>
<div class="page">
    <div class="header_new">
        <h1 class="main_logo">irzaw.</h1>
        <h3 class="message">ai-powered crm software</h3>
    </div>

    <div class="main_page">

        <div class="links">
            <div class="link">
                projects.
            </div>

            <div class="link">
                expertise.
            </div>

            <div class="link">
                people.
            </div>

            <div class="button_banner_new" @click="clickhandler">
                <div class="button_new">enter irzaw</div>
                <div class="banner_new">powered by jalfry</div>
            </div>
        </div>

    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        login() {
            // Simulate a login request
            if (this.username === 'irzaw' && this.password === 'user') {
                // Perform actual login actions, e.g., store the authentication state in Vuex
                this.$store.dispatch('performLogin');
                this.$router.push('/newpanel');
            } else {
                alert('Invalid credentials. Please try again.');
            }
        },
        clickhandler() {
            let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=400,height=600,left=100,top=100`;
            sso = window.open("https://jalfry.com/sso", "login with jalfry", params);
        }
    },
};

let sso;

//define hostname here. For example, h = 'example.com'
let h = 'irzaw.com';

//define domain name here. Using the above example, d = 'example'
let d = 'irzaw';

//define the URL to your login page. Using the above examples, login_url = 'https://example.com/login'. The 'https://' in the beginning is necessary!
let login_url = 'https://irzaw.com/login';

//define the route to your login logic. This should be a post route handler on the backend where you handle logged in users. For example, login_logic_url = 'https://example.com/login'. The 'https://' in the beginning is necessary!
let login_logic_url = 'https://irzaw.com/login';

async function post(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    return response.json();
}

async function postToken(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        redirect: 'follow',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': JSON.stringify(data)
        },
        body: JSON.stringify(data)
    })

    return response.json();
}

function clickhandler(e) {
    e.preventDefault();

    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=400,height=600,left=100,top=100`;
    sso = window.open("https://jalfry.com/sso", "login with jalfry", params);
}

function setCookie(name, value) {
    var expires = "";
    var date = new Date();
    //one hour timer
    date.setTime(date.getTime() + (60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + (value || "") + expires + "; path=/;SameSite=Strict";
}

window.addEventListener("message", (e) => {
    e.preventDefault();

    if (e.origin == "https://jalfry.com") {
        if (e.data.ready) {
            let obj = {
                domain: d,
                login_link: login_url,
                current_link: window.location.href
            }
            sso.postMessage(obj, 'https://jalfry.com/sso');
        } else {
            let ed = e.data;
            let token = ed.token;
            let username = ed.username;

            postToken('https://jalfry.com/login/authorize', {
                    domain: d,
                    token,
                    secret: '',
                    username
                })
                .then((data) => {
                    if (data.status) {
                        //user is logged in, implement app session logic here... username and permission is stored in data object
                        console.log(data);
                        setCookie('username', data.username);
                        setCookie('permission', data.permission);
                        setCookie('token', token);
                        if (data.permission == "projects") {
                            window.location = "/projects";
                        } else if (data.permission == "marketing") {
                            window.location = "/marketing_view/projects/panel"
                        }
                        /*

post(login_logic_url, { username: data.username, permission: data.permission, token })

.then((data) => {

window.location = data.url;

})
                        */
                    } else {
                        //user does not have access to this application... jalfry will tell the user this in the login pop up window
                        console.log('no access :(');
                    }
                })
        }
    }
})
</script>

<style scoped>
@import '@/assets/font.css';

.page {
    background-color: black;
    color: white;
    font-family: 'PoppinsMedium', sans-serif;
    height: 100vh;
    width: 100vw;
    border-radius: 0;
    top: 0;
    left: 0;
    position: fixed;
}

.header_new {
    font-family: 'PoppinsMedium', sans-serif;
    display: flex;
    justify-content: space-between;
    padding: 1vw 4vw;
    align-items: center;
}

.links {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%
}

.link {
    font-size: 40px;
    padding: 2rem;
}

.message {
    font-weight: 200;
    font-style: italic;
    font-size: 14px;
    font-family: 'PoppinsMedium', sans-serif;
}

.main_logo {
    font-size: 24px;
    font-family: 'PoppinsMedium', sans-serif;
}

.main_page {
    height: 100%;
}




    .button_banner_new {
      position: relative;
      width: fit-content;
    }

    .button_new {
      padding: 10px 20px;
      border: none;
      min-width: 150px;
      text-align: center;
    background-color: white;
    color: black;      
      border-radius: 5px;
      cursor: pointer;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
          font-size: 30px;

    }

    .banner_new {
      position: absolute;
      right: 5px;
      font-size: 12px;
      white-space: nowrap;
      overflow: hidden;
      background-color: black;
    color: white;
    padding: 2px;
    border: 1px solid white;
    border-top: none;
    border-radius: 0 0 5px 5px;
    }

</style>
