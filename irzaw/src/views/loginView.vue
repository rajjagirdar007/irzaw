<template>
<dheader></dheader>

  <div class="home">
    <div class="content">
      <h1>projects.</h1>
      <h1>people.</h1>
      <h1>expertise.</h1>
	<button @click="clickhandler" class="submit-button">Login with Jalfry</button>
    </div>
  </div>
</template>

<script>
import dheader from '@/components/header/home_nav.vue';
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
components: {dheader}, 
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
function setCookie(name,value) {
    var expires = "";
        var date = new Date();
	//one hour timer
        date.setTime(date.getTime() + (60*60*1000));
        expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + (value || "")  + expires + "; path=/;SameSite=Strict";
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
			
			postToken('https://jalfry.com/login/authorize', { domain: d, token, secret: '', username })
			.then((data) => {
				if (data.status) {
					//user is logged in, implement app session logic here... username and permission is stored in data object
					console.log(data);
					setCookie('username', data.username);
					setCookie('permission', data.permission);
					setCookie('token', token);
					if (data.permission == "projects") {
						window.location = "/projects";
					}else if (data.permission == "marketing"){
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
.container {
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
flex-direction: column;
}
input[type=password]{

max-width: 150px;
}
.input-container {
  text-align: center;
}

.input-field {
  background-color: black;
  color: white;
  border: 1px solid white;
  padding: 10px;
  margin: 5px;
}

.submit-button {
  background-color: white;
  color: black;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.submit-button:disabled {
  background-color: gray;
  color: lightgray;
  cursor: not-allowed;
}
</style>
