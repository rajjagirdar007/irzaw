<template>
<main_header></main_header>
<div class="form">
    <div class="flex">
        <div class="left-items">
            <h2>Add New Project</h2>
        </div>
        <div class="right-items">

            <button class="top-button">
                <div class="">
                    <router-link to="/projects">Back to Projects</router-link>
                </div>
            </button>

        </div>
    </div>
    <div>
        <label>Project Name</label>
        <input class="form-control" v-model="this.form.name" type="text" required>
    </div>

    <div>

        <label for="clients">Client</label>
        <select class="form-control" id="mylist" v-model="this.form.client" name="clients">
            <option></option>
            <option v-for="item in this.clients" v-bind:value="item.client">
                {{item.client}}
            </option>
        </select>
    </div>

    <div>
        <label for="project_number">Project Number</label>
        <input type="text" class="form-control" v-model="this.form.project_number" id="project_number" name="project_number" required>

    </div>

    <div>
        <label for="location">Location </label>
        <input type="text" placeholder="City, State" class="form-control" v-model="this.form.location" id="location" name="location" required>
    </div>
    <div>



       <!-- <span class="input-group-label">Month</span>
        <input type="text"  v-model="this.form.month" id="month" name="month" placeholder="Enter month" class="input-group-field form-control">
        <span class="input-group-label">Year</span>
        <input class="input-group-field form-control"  v-model="this.form.date"  type="text" id="date" name="date" placeholder="Enter year">
        <span class="input-group-label">Completed?  <input class="input-group-field" id="space" type="checkbox"></span>
-->



		<label for="date">Date   </label>
	<!--<input type="text" id="month" name="month" placeholder="Enter month" class="form-control" v-model="this.form.month"  required>-->
        <input type="text" id="date" name="date" placeholder="Enter year" class="form-control" v-model="this.form.date"  required>
   </div>
<!--	
    <div>
	<label for="completed">Completed?</label>
	<input type="checkbox" id="completed" name="completed" class="form-control" v-model="this.form.completed"  required>
    </div>
-->
    <div>
        <label for="partners">Partners</label>
        <textarea id="partners" name="partners" rows="3" v-model="this.form.partners" class="form-control"></textarea>
    </div>

    <div>
        <label for="description">Description</label>
        <textarea id="description" rows="6" name="description" v-model="this.form.description" class="form-control" required></textarea>
    </div>

    <div>
        <label>Select Relevant Tags</label>
        <checkboxes class="center" :nested-array="level1" :selected="this.seperate"></checkboxes>

    </div>

    <div>

        <label for="leaders">Select Leader on this Project</label>
        <select class="form-control" id="thislist" v-model="this.form.leaders" name="leaders">
            <option></option>
            <option v-for="item in this.leadership" v-bind:value="item.id">
                {{item.first_name}} {{item.last_name}}
            </option>
        </select>
    </div>

    <label for="extra_imgs">Project Photos</label>
    <div class="thumbnail-c" v-for="image in this.form.image">
        <img class="thumbnail" :src="'https://mpengs.com' + image">
        <a @click="deleteImage(image)">Delete</a>
    </div>
    <input multiple="multiple" id="files" type="file" ref="fileInput" @change="add()" class="form-control" />

    <button @click="handleSubmit()" class="label save" id="btn">Save Changes</button>

</div>
</template>

<script>
import axios from 'axios';
import checkboxes from '@/components/checkbox/checkbox3.vue';
import main_header from '@/components/header/main_header.vue';

export default {
    props: ['select'],
    data() {
        return {
            tags_level1: [],
            level1: [],
            tags_level2: [],
            tags_level3: [],
            clients: [],
            selected_tags: [],
            image: [],
            form: {
                name: '',
                client: '',
                project_number: null,
                location: null,
                category: null,
                date: null,
                partners: null,
                description: null,
                priority: null,
                image: [],
                active: 1,
                leaders: null,
		month: null,
		completed: null
            },
            first_form: null,
            seperate: [],
            showModal: false,
            leadership: [],
	    hostname: 'https://irzaw.com'
        }
    },
    watch: {

        seperate: function () {
            this.form.category = this.seperate.join();

        }
    },
    components: {
        checkboxes,
        main_header
    },
    methods: {

        deleteImage(image) {
            const index = this.form.image.indexOf(image);
            if (index !== -1) {
                this.form.image.splice(index, 1);
            }
            this.submit();
        },
        add() {
            const formData = new FormData();
            const files = this.$refs.fileInput.files;
            for (let i = 0; i < files.length; i++) {
                formData.append('image', files[i]);
                console.log(files[i]);
                this.form.image.push('/images/projects/' + files[i].name);
            }
            try {
                const response = axios.post(this.hostname + '/uploadmultiple', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
            //this.submit(); 
            console.log(formData.getAll('image'));
            console.log(this.form.image);

        },
        getSubfilter(id) {
            this.parent_filter_id = id.toString;
            console.log(this.parent_filter_id)
            axios
                .get(this.hostname + '/get_subfilters/' + id)
                .then(response => (this.tags_level2.push(response.data)))
        },
        getSubfilterCheck(id) {
            this.parent_filter_id = id.toString;
            console.log(this.parent_filter_id)
            axios
                .get(this.hostname + '/get_subfilters/' + id)
                .then(response => (this.tags_level2 = response.data))
        },
        selectCheckbox(id, name) {
            this.form.category.push(name);
            console.log(id + name);
            console.log(this.selected_tags);
        },
        submitForm() {
            console.log(this.seperate);
            this.form.category = this.seperate.join();
            console.log(this.form);
            //axios.post('https://irzaw.com/addproject', this.form)
            //    .then(console.log('this has been inserted'));  
        },
        updatetags(variable) {
            this.form.category = variable.join();
            console.log(variable.join());
        },
        async handleSubmit() {
            const files1 = document.getElementById('files');
            for (let j = 0; j < files1.files.length; j++) {
                this.image.push(files1.files[j].name);
            }
            //	this.form.image = this.image.join();
            //axios.post('https://irzaw.com/editproject/' + this.$route.params.select, this.form)
            //  .then(console.log('this has been inserted'));  

            this.submit();
            const formData = new FormData();
            const files = this.$refs.fileInput.files;
            for (let i = 0; i < files.length; i++) {
                formData.append('images', files[i]);
            }
            console.log(formData.files);
            try {
                const response = await axios.post(this.hostname + '/uploadmultiple', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
              //  this.$router.go('/newpanel');

                console.log(response.data);
            } catch (error) {
                //this.$router.go('/newpanel');
                console.error(error);
            }
        },
        submit() {
            this.form.category = this.seperate.join();
            this.form.image = this.form.image.join();
            var object = {
                form: this.form,
                team_tag: {
                    leader_id: this.form.leaders
                }
            }

            axios.post(this.hostname + '/addproject', object)
                .then(console.log('this has been inserted'));
            //this.$router.go('/newpanel');

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
        let self = this;
        axios.get(this.hostname + '/getFilters_level1').then(function (response) {
            console.log(response);
            self.tags_level1 = response.data;
            //this.tags_level2  = response.data.level2;
            //this.tags_level3  = response.data.level3;
        });
        axios.get(this.hostname + '/client').then(function (response) {
            console.log(response);
            self.clients = response.data;
        });

        axios.get(this.hostname + '/get_allTags').then(function (response) {
            console.log(response);
            self.level1 = response.data;
            self.tags_level2 = response.data.level2;
            self.tags_level3 = response.data.level3;
        });
        axios.get(this.hostname + '/get_allpeople')
            .then((response) => {
                this.leadership = response.data.leadership;
                console.log(response.data)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
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

    }
}
</script>

<style scoped>
/*input[type=text]{
margin: auto;
max-width: 100%;
}
input[type=file]{
margin: auto;
max-width: 100%;
}

input[type=number]{
	max-width: 100%;
}
.form-control{
	max-width: 100% !important; 
}
input[type=checkbox]{
margin: auto;
height: auto;
all: revert !important;
}
textarea{
	margin: auto;
}

select{
margin: auto;
}
#wdith{

width: 50%;

}
.center{
	margin: auto;
}
*/

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
#space{
	padding: 5px;
}
</style>
