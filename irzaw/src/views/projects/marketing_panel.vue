<template>
<main_header></main_header>

<div class="parent" :class="{ 'mod-is-open': showModal }">

    <div class="div1">

        <div class="row-flex">

            <div class="title">
                <h2><span class="bold">MP Engineers + Architects</span> <span class="total">({{this.draggableValue.length}} projects)</span></h2>
            </div>
            <div class="button-areas">
                <div class="top-button">
                    <div class="" @click="this.card2 = !this.card2">
                        <router-link to="/projects/tag_mode">Tag Mode</router-link>
                    </div>
                </div>

                <div class="top-button">
                    <div class="">
                        <router-link to="/projects/add">Add Project</router-link>
                    </div>
                </div>
                
            </div>
        </div>

        <div class="row">
            <div class='search input-group' id="t">
                <span class="input-group-label" @click="this.showModal = true"> &#19904; Filter</span>
                <input type="text" class="input-group-field searchthis" v-model="this.name" placeholder="Search Projects">
            </div>

            <!-- <div class="flex">
                <div class="filter-button">
                    <router-link to="/listv5">Edit Filters</router-link>
                </div>
            </div> -->
        </div>
        <table class="hover clean">
            <thead>
                <tr>
                    <th>Project Number</th>
                    <th>Name</th>
                    <!--	<th>Thumbnail</th>-->
                    <th>Location</th>
                    <!--<th>Category</th>-->
                    <th>Active</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>Preview</th>
                </tr>
            </thead>
            <draggable :list="draggableValue"  :options="{}" tag="tbody" @change="onChange">
                <template #item="{element}">
                    <tr v-show="element.name.toString().toLowerCase().includes(this.name.toString().toLowerCase()) || element.project_number.toString().toLowerCase().includes(this.name.toString().toLowerCase()) || element.location.toString().toLowerCase().includes(this.name.toString().toLowerCase()) || element.client.toString().toLowerCase().includes(this.name.toString().toLowerCase()) || element.category.toString().toLowerCase().includes(this.name.toString().toLowerCase()) || element.description.toString().toLowerCase().includes(this.name.toString().toLowerCase())">
                        <td class="bold">{{element.project_number}}</td>
                        <td class="name">{{element.name}}</td>
                        <td>{{element.location}}</td>

                        <td><input type="checkbox" v-model="element.active" :true-value="1" :false-value="0" @change="setNewValue(element.id, $event)"></td>
                        <td>
                            <router-link :to="{name: 'edit_projects', params:{select: element.id}, query: {page: 'Info'}}">Edit</router-link>
                        </td>
                        <td><a class="delete" @click="deleteProject(element.id)">Delete</a></td>
                        <td>
                            <router-link :to="{name: 'edit_projects', params:{select: element.id}, query: {page: 'Preview'} }">Preview</router-link>
                        </td>
                    </tr>
                </template>
            </draggable>
        </table>

        <table class="mobile hover">
            <thead>
                <tr>
                    <th>Project Number</th>
                    <th>Name</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tr v-for="element in this.draggableValue" v-show="element.name.toString().toLowerCase().includes(this.name.toString().toLowerCase()) || element.project_number.toString().toLowerCase().includes(this.name.toString().toLowerCase()) || element.location.toString().toLowerCase().includes(this.name.toString().toLowerCase())">
                <td class="bold">{{element.project_number}}</td>
                <td class="name"><span v-if="element.name.length < 40">{{element.name}}</span><span v-else>{{element.name.slice(0, 39)}}...</span></td>
                <td>
                    <router-link :to="{name: 'edit_projects', params:{select: element.id}, query: {page: 'Info'}  }">Edit</router-link>
                </td>
                <td><a class="delete" @click="deleteProject(element.id)">Delete</a></td>
            </tr>

        </table>

    </div>

</div>
<div class="modal" :class="{ 'is-open': showModal }">
    <div class="modal-overlay" @click="this.showModal = false;"></div>
    <div class="modal-content">
        <div class="close" @click="this.showModal = false;">X</div>
        <div class="sort">
            <h6 class="modal-title">Sort by:</h6>
            <div class='flex'>
                <div class="sort-button"><span class="center">Project Date</span></div>
                <div class="sort-button"><span class="center">Date Added</span></div>
                <div class="sort-button"><span class="center">Project #</span></div>
            </div>
        </div>
        <div class="filter-mo">
            <h6 class="modal-title">Filter by:</h6>
            <checkboxes :style="{ color: 'white' }" :key="this.keycheck" :nested-array="level1" :selected="this.selected"></checkboxes>
        </div>

    </div>
</div>
</template>

<script>
import axios from 'axios'
import draggable from 'vuedraggable'
import main_header from '@/components/header/main_header.vue';
import checkboxes from '@/components/checkbox/checkbox3.vue';

export default {
    name: 'YourComponent',
    data() {
        return {

            projects: [],
            current_filters: [],
            name: '',
            level1: [],
            selected: [],
            card: false,
            showModal: false,
            keycheck: 0,
	    backend_hostname: 'https://dev.irzaw.com'
        };
    },
    props: {

    },
    computed: {

        filteredObjects() {
            return

            this.projects.filter((item) => {
                return item.category.split(",").some((category1) => this.selected.includes(category1));
            });

        },
        filteredObjects1() {
            return this.projects.filter((item) => {
                const itemCategories = item.category.split(",");
                return this.selected.every((selectedCategory) => itemCategories.includes(selectedCategory));
            });
        },

        draggableValue() {
            if (this.selected.length === 0) {
                return this.projects;
            } else {

                return this.projects.filter((item) => {
                    const itemCategories = item.category.split(",");
                    return this.selected.every((selectedCategory) => itemCategories.includes(selectedCategory));
                });

            }
        },
        parsedArray(str) {
            const values = str.split(',').map(value => value.trim());
            const hasEmptyElement = values.some(value => value === '');

            return {
                hasEmptyElement
            };
        }

    },
    methods: {
        onChange(event) {
            this.reorder()
            console.log(this.selected)
        },
        refresh() {
            this.keycheck += 1;
            console.log(this.keycheck);
            this.$router.go('/newview');
        },
        reorder() {
            this.draggableValue.forEach((project, index) => (project.priority = index + 1))
            console.log(this.draggableValue)
            axios.post(this.backend_hostname + '/updateProjects', {
                    projects: this.projects
                })
                .then(response => {
                    // Handle success
                    console.log('Projects updated:', response.data);
                })
                .catch(error => {
                    // Handle error
                    console.error('Failed to update projects:', error);
                });
        },
        setNewValue(id, event) {

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
            axios.post(this.backend_hostname + '/active_project', variable)
                .then(console.log('this has been deleted'));
            this.$router.go('/view');

        },
        deleteProject(id) {
            const variable = {
                id_delete: id
            }
            console.log(variable);
            axios.post(this.backend_hostname + '/delete_project', variable)
                .then(this.getdata());
            this.getdata();

        },
        parsedArray(str) {
            const values = str.split(',').map(value => value.trim());
            const hasEmptyElement = values.some(value => value === '');

            return {
                hasEmptyElement
            };
        },
        removecat(ele, cat) {

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
        getdata() {
            let self = this;
            axios.get(this.backend_hostname + '/getProjects').then(function (response) {
                console.log(response);
                self.projects = response.data;
            }); 
            axios.get(this.backend_hostname + '/get_allTags').then(function (response) {
                console.log(response);
                self.level1 = response.data;

            });

        }

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
            this.$router.push("/login?logout=true");
        }
    },
    created() {
        this.getdata();
        
    },
    destroyed() {
        // Code to run when the component is destroyed
    },
    components: {
        checkboxes,
        draggable,
        main_header
    },
};
</script>

<style>
 tr {

    display: table-row;
}

.searchthis {
    max-width: unset !important;
}

.clean {
    text-align: left;
}

.name {}

.div1 {

    width: 75vw;
    margin: 0 auto;

}

.card {
    display: block;
    margin: 20px;
}

.card-divider {
    display: block;
    margin: 10px;
}

.active {

    background-color: #e3e3e5;
}

input[type=text] {}

.row {
    min-width: 72vw;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.row-flex {
    min-width: 72vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
}

.flex {

    display: flex;
}

#white {
    color: white !important;
}

.hidden {
    display: none;
}

.modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
}

.modal-overlay {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 200%;
    background-color: rgba(0, 0, 0, 0.4);
}

.total {
    font-size: 30px;
    font-weight: 200;
}

.modal-content {
    background-color: black;
    color: white;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    border-radius: 15px;
    width: 40%;
    min-height: 40%;
    z-index: 99;
    position: relative;

}

.bold {
    font-weight: 900;
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

.is-open {
    display: block;
}

.cat {
    margin: 1px;
}

#t {
    margin: 0 auto;
    border-left: none;
}

.thumbnail {

    width: 100px;
}

.delete {

    color: red;
}

.filter-mo label {

    color: white !important;
}

.search {

    width: 80% !important;
    padding: 1vw;
    border-left: 0;
}

.filter-button {
    background-color: black;
    color: white;
    padding: 0.7vw;
    border-radius: 5px;
    margin: 5px;
}

.sort-button {
    border-radius: 10px;
    width: 100px;
    border: 1px solid white;
    margin: 1.5vh;
}

.modal-title {

    text-align: left;
    font-size: 20px;
    font-weight: 900;

}

.top-button {
  
    background-color: black;
    color: white;
    border-radius: 5px;
    padding: 0.5vw 2vw;
    font-size: 18px;
    margin: 0.3vw;

}

.top-button a {
    	vertical-align: sub;
	color: white !important;
}

.filter-button a {
    color: white !important;
}

.title {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
}

.button-areas {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
}

.center {
    vertical-align: center;

}

.mobile {
    display: none;
}

#dark {
    color: white;
    background-color: black;
}

@media screen and (max-width: 767px) {

    .row,
    .row-flex {
        flex-direction: column;

    }

    #t {
        max-width: 80%;
    }

    .mobile {
        display: block;

    }

    .clean {
        display: none;
    }

    .title {

        font-weight: 900;

    }

    .modal-content {
        margin: 12% auto;
        width: 100vw;
        height: 100vh;
        border-radius: 0px;
    }

    .mod-is-open {
        display: none;
    }

    #dark {

        display: none;
    }

    .hidden {
        display: block;
    }

}
</style>
