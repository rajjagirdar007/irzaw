<template>
<main_header></main_header>
<div class="form">
    <div class="flex">
        <div class="left-items">
            <h2>Add New Person</h2>
        </div>
        <div class="right-items">
            <button class="top-button">
                <div>
                    <router-link to="/people">Back to People</router-link>
                </div>
            </button>
        </div>
    </div>

    <div>
        <label>First Name</label>
        <input class="form-control" v-model="this.form.first_name" type="text" required>
    </div>

    <div>
        <label>Last Name</label>
        <input class="form-control" v-model="this.form.last_name" type="text" required>
    </div>

    <div>
        <label>Certifications</label>
        <input class="form-control" v-model="this.form.certifications" type="text" required>
    </div>

    <div>
        <label>Description</label>
        <textarea rows="6" class="form-control" v-model="this.form.description" required></textarea>
    </div>

    <div>
        <label>Role</label>
        <input class="form-control" v-model="this.form.role" type="text" required>
    </div>

    <input type="hidden" value="true" v-model="this.form.active">

    <div>
        <label>Leadership Picture</label>
        <input id="leadership" type="file" ref="fileInput1" @change="addLeadership()" class="form-control" />
    </div>

    <div>
        <label>Personal Picture</label>
        <input id="personal" type="file" ref="fileInput2" @change="addPersonal()" class="form-control" />

    </div>

    <button @click="submitLeader()" class="label save" id="btn">Save Changes</button>
</div>
</template>

<script>
import axios from 'axios';
import main_header from '@/components/header/main_header.vue';

export default {
    data() {
        return {
            form: {
                first_name: "",
                last_name: "",
                certifications: "",
                leadership_picture: "",
                personal_picture: "",
                description: "",
                role: "",
                active: "1", // Default value "Yes"
            },
	    hostname: 'https://irzaw.com'
        };
    },
    components: {
        main_header
    },
    methods: {
        addLeadership() {
            var imageData = new FormData();
            const leadership = this.$refs.fileInput1.files;
            for (let i = 0; i < leadership.length; i++) {
                imageData.append('leadership', leadership[i]);
                console.log(leadership[i]);
                this.form.leadership_picture = leadership[i].name;
            }

            console.log(this.form);

            try {
                const response = axios.post(this.hostname + '/uploadpeopleleadership', imageData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        },
        addPersonal(){
          var imageData = new FormData();
          const personal = this.$refs.fileInput2.files;
          for (let i = 0; i < personal.length; i++) {
                imageData.append('personal', personal[i]);
                console.log(personal[i]);
                this.form.personal_picture = + personal[i].name;
            }
            console.log(this.form);

            try {
                const response = axios.post(this.hostname + '/uploadpeoplepersonal', imageData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        },
        submitLeader() {
            axios
                .post(
                    this.hostname + "/addleader",
                    this.form
                )
                .then(console.log("this has been inserted"));
                this.$router.go('/people');

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
		// Code to run when the component is mounted
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



	}

};
</script>

<style>
.save {

    font-size: large;
    padding: 10px;
    margin: 15px 5px;

}

.thumbnail-c {
    width: 150px;
    display: table-cell;
}

input {
    margin: 0px;
    padding: .5rem !important;

}

select {
    margin: 0px;
    padding: .5rem !important;

}

label {
    text-align: left;
    padding: 5px;

}

.form {

    width: 70%;
    margin: 0 auto;
    margin-top: 20px;
}

.form-control {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 100% !important;
}

.left-items {
    display: flex;
    flex-direction: row-reverse;
    /* Start from right */
    align-items: center;
    font-weight: 900;
}

.right-items {
    display: flex;
    flex-direction: row;
    /* Start from left */
    align-items: center;
}

.flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
}
</style>
