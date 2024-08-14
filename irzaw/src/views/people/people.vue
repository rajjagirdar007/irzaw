<template>
<main_header></main_header>

<div class="leadership" v-if="showLeaders">

    <div class="row-flex">

        <div class="title title2">
            <h2><span class="bold">Leadership</span> <span class="total">({{this.people.leadership.length}} leaders)</span></h2>

        </div>
        <div class="button-areas">
            <div class="top-button">
                <div class="">
                    <router-link to="/people/add_leader">Add Leader</router-link>
                </div>
            </div>
            <div class="top-button switch-button">
                <div class="">
                    <span @click="this.showLeaders = !this.showLeaders">See Team</span>
                </div>
            </div>
        </div>
    </div>

    <table class="hover clean tabel">
        <thead>
            <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Image</th>
                <th>Active</th>
                <th>View/Edit</th>
                <th>Delete</th>
            </tr>
        </thead> 

        <draggable :list="people.leadership" group="people" :options="{}" tag="tbody" @change="onChange">
            <template #item="{element}">
                <tr v-show="element.first_name.toString().toLowerCase().includes(this.name.toString().toLowerCase()) || element.last_name.toString().toLowerCase().includes(this.name.toString().toLowerCase()) || element.role.toString().toLowerCase().includes(this.name.toString().toLowerCase()) || element.client.toString().toLowerCase().includes(this.name.toString().toLowerCase()) || element.category.toString().toLowerCase().includes(this.name.toString().toLowerCase()) || element.description.toString().toLowerCase().includes(this.name.toString().toLowerCase())">
                    <td class="bold">{{element.first_name}} {{ element.last_name }}</td>
                    <td class="">{{element.role}}</td>
                    <td><img class="thumbnail" :src="this.hostname + '/images_api/images/people/leadership/' + element.leadership_picture"></td>

                    <td><input type="checkbox" v-model="element.active" :true-value="1" :false-value="0" @change="setNewValueLeader(element.id, $event)"></td>
                    <td>
                        <router-link :to="{name: 'edit_leader', params:{select: element.id}}">Edit</router-link>
                    </td>
                    <td><a class="delete" @click="deleteLeader(element.id)">Delete</a></td>
                </tr>
            </template>
        </draggable>

    </table>


    <table class="hover mobile">
        <thead>
            <tr>
                <th>Name</th>
                <th>View/Edit</th>
                <th>Delete</th>
            </tr>
        </thead>

        <draggable :list="people.leadership" group="people" :options="{}" tag="tbody" @change="onChange">
            <template #item="{element}">
                <tr v-show="element.first_name.toString().toLowerCase().includes(this.name.toString().toLowerCase()) || element.last_name.toString().toLowerCase().includes(this.name.toString().toLowerCase()) || element.role.toString().toLowerCase().includes(this.name.toString().toLowerCase()) || element.client.toString().toLowerCase().includes(this.name.toString().toLowerCase()) || element.category.toString().toLowerCase().includes(this.name.toString().toLowerCase()) || element.description.toString().toLowerCase().includes(this.name.toString().toLowerCase())">
                    <td class="bold">{{element.first_name}} {{ element.last_name }}</td>

                    <td>
                        <router-link :to="{name: 'edit_leader', params:{select: element.id}}">Edit</router-link>
                    </td>
                    <td><a class="delete" @click="deleteLeader(element.id)">Delete</a></td>
                </tr>
            </template>
        </draggable>

    </table>

</div>

<div class="employees leadership" v-else>
    <div class="row-flex">

        <div class="title title2">
            <h2><span class="bold">The Team</span> <span class="total">({{this.people.people.length}} members)</span></h2>

        </div>
        <div class="button-areas">
            <div class="top-button">
                <div class="">
                    <router-link to="/add_people">Add Member</router-link>
                </div>
            </div>
            <div class="top-button switch-button">
                <div class="">
                    <span @click="this.showLeaders = !this.showLeaders">See Leadership</span>
                </div>
            </div>

        </div>
    </div>

    <table class="hover clean tabel">
        <thead>
            <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Image</th>
                <th>Active</th>
                <th>View/Edit</th>
                <th>Delete</th>
            </tr>
        </thead>

        <draggable :list="people.people" group="people" :options="{}" tag="tbody" @change="onChangeEmployee">
            <template #item="{element}">
                <tr v-show="element.first_name.toString().toLowerCase().includes(this.name.toString().toLowerCase()) || element.last_name.toString().toLowerCase().includes(this.name.toString().toLowerCase()) || element.role.toString().toLowerCase().includes(this.name.toString().toLowerCase()) || element.client.toString().toLowerCase().includes(this.name.toString().toLowerCase()) || element.category.toString().toLowerCase().includes(this.name.toString().toLowerCase()) || element.description.toString().toLowerCase().includes(this.name.toString().toLowerCase())">
                    <td class="bold">{{element.first_name}} {{ element.last_name }}</td>
                    <td class="">{{element.role}}</td>
                    <td><img class="thumbnail" :src="this.hostname + '/images_api/images/people/leadership/' + element.leadership_picture"></td>

                    <td><input type="checkbox" v-model="element.active" :true-value="1" :false-value="0" @change="setNewValuePeople(element.id, $event)"></td>
                    <td>
                        <router-link :to="{name: 'edit_people', params:{select: element.id}}">Edit</router-link>
			
                    </td>
                    <td><a class="delete" @click="deletePeople(element.id)">Delete</a></td>
                </tr>
            </template>
        </draggable>

    </table>
    <table class="hover mobile">
        <thead>
            <tr>
                <th>Name</th>
                <th>View/Edit</th>
                <th>Delete</th>
            </tr>
        </thead>

        <draggable :list="people.people" group="people" :options="{}" tag="tbody" @change="onChangeEmployee">
            <template #item="{element}">
                <tr v-show="element.first_name.toString().toLowerCase().includes(this.name.toString().toLowerCase()) || element.last_name.toString().toLowerCase().includes(this.name.toString().toLowerCase()) || element.role.toString().toLowerCase().includes(this.name.toString().toLowerCase()) || element.client.toString().toLowerCase().includes(this.name.toString().toLowerCase()) || element.category.toString().toLowerCase().includes(this.name.toString().toLowerCase()) || element.description.toString().toLowerCase().includes(this.name.toString().toLowerCase())">
                    <td class="bold">{{element.first_name}} {{ element.last_name }}</td>

                    <td>
                        <router-link :to="{name: 'edit_people', params:{select: element.id}}">Edit</router-link>
                    </td>
                    <td><a class="delete" @click="deleteLeader(element.id)">Delete</a></td>
                </tr>
            </template>
        </draggable>
</table>


</div>

</template>

<script>
import axios from 'axios';
import main_header from '@/components/header/sidebar.vue';
import draggable from 'vuedraggable'

export default {
    data() {
        return {
            people: {
                leadership: [],
                people: [],
            },
            name: '',
            showLeaders: true,
	    hostname: 'https://irzaw.com'
        };
    },
    mounted() {


        // Make a GET request to your '/get_allpeople' endpoint using Axios
        axios.get(this.hostname + '/get_allpeople')
            .then((response) => {
                this.people.leadership = response.data.leadership;
                this.people.people = response.data.people;
                console.log(response.data)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
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
    methods: {
        onChange(event) {
            this.reorder()
            console.log(this.selected)
        },
        onChangeEmployee(event) {
            this.reorderPeople()
            console.log(this.selected)
        },
        reorder() {
            this.people.leadership.forEach((person, index) => (person.priority = index + 1))
            console.log(this.people.leadership)
            axios.post(this.hostname + '/updatePeople', {
                    leadership: this.people.leadership
                })
                .then(response => {
                    // Handle success
                    console.log('Leader updated:', response.data);
                    this.getData();
                })
                .catch(error => {
                    // Handle error
                    console.error('Failed to update leader:', error);
                });
        },
        reorderPeople() {
            this.people.people.forEach((person, index) => (person.priority = index + 1))
            console.log(this.people.leadership)
            axios.post(this.hostname + '/updatePeopleEmployee', {
                    people: this.people.people
                })
                .then(response => {
                    // Handle success
                    console.log('Leader updated:', response.data);
                    this.getData();
                })
                .catch(error => {
                    // Handle error
                    console.error('Failed to update leader:', error);
                });
        },
        getData() {
            axios.get(this.hostname + '/get_allpeople')
                .then((response) => {
                    this.people.leadership = response.data.leadership;
                    this.people.people = response.data.people;
                    console.log(response.data)
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        },
        deleteLeader(id) {
            const variable = {
                id_delete: id
            }
            console.log(variable);
            axios.post(this.hostname + '/delete_leader', variable)
                .then(console.log('this has been deleted'));
            this.getData();
        },
        deletePeople(id) {
            const variable = {
                id_delete: id
            }
            console.log(variable);
            axios.post(this.hostname + '/delete_people', variable)
                .then(console.log('this has been deleted'));
            this.getData();
        },
        setNewValueLeader(id, event) {

            if (event.target.checked) {
                var value = 1;
            } else {
                var value = 0;
            }
            const variable = {
                id_update: id,
                value: value
            }
            console.log(variable);
            axios.post(this.hostname + '/active_leader', variable)
                .then(console.log('this has been deleted'));
            this.getData();

        },
        setNewValuePeople(id, event) {

            if (event.target.checked) {
                var value = 1;
            } else {
                var value = 0;
            }
            const variable = {
                id_update: id,
                value: value
            }
            console.log(variable);
            axios.post(this.hostname + '/active_people', variable)
                .then(console.log('this has been deleted'));
            this.getData();
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
    components: {
        main_header,
        draggable
    },
};
</script>

<style scoped>
@import '@/assets/font.css';

#app {
    display: flex !important;
}
.tabel {}
.next{
display: flex;
flex-direction: row;	
}

.leadership {
    width: 72vw;

    margin: 0 auto;
    margin-top: 2vh;
}

.title2 {
    flex-direction: row;
}

.button-2 {
    font-size: 14px;
}

.switch-button {
    background: #fff;
    color: #000;
    border: 2px solid black;
}
@media (max-width: 768px) {
	.next{
		flex-direction: column;		
	}
}
</style>
