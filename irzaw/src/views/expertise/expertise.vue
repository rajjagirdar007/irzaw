<template>
	<main_header></main_header>
	<div >

  		<h5>Select which page you would like to edit</h5>
 		<div class="expertise_select">
			<a class="top-button" v-for="item in this.buttons"><router-link :to="'/expertise_details/' + item.id + '/' + item.tag_id" >{{item.type}}</router-link></a>
		</div>

	</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import main_header from '@/components/header/main_header.vue';



export default {
  name: 'Expertise',
 

  data() {
        return{
                buttons: [],
		editing: null,
		input:null,
		hostname: 'https://irzaw.com' 
        }
        },
methods: {
	setEditing(item) {
		this.editing = item;
		this.$router.go('/expertise_details/' +  item.id);
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
created() {
                axios
                        .get(this.hostname + '/get_allexpertise')
                        .then(response => (this.buttons = response.data))

},
mounted() {
                let username = this.getCookie('username');
                let permission = this.getCookie('permission');
                let token = this.getCookie('token');
                if (username && permission && token) {
                    console.log(username, permission, token);
                        if (permission == "marketing"){
                                 this.$router.push("/marketing_view/projects/panel");

                        }

                } else {
                    this.$router.push("/?logout=true");
                }
},
components: {main_header}
};

</script>

<style scoped> 
textarea{
margin: 0 auto;
}
.add_button{
	color: black; 
	border: 1px solid black;
	background-color: white;

}
.expertise_select{
	margin: 0 auto !important;
	display: inline-grid;
}
.float-center{
	width: fit-content;
}
.slide-right-enter-active {
  transition: all 3s;
}
.slide-right-leave-active {
  transition: all 3s;
}
.slide-right-enter {
}
.slide-right-leave-to {
}
#id{
 width: 60vw;
 margin: 0 auto !important;
 vertical-align: center;
}

</style>
