<template>
<div class="flex_response">
    <main_header></main_header>

    <div class="parent">
        <div class="desktop">
            <div class="top_row space">
                <span class="">
                </span>

                <div class="buttons">
                    <div class="add_button">
                        Edit Filters
                    </div>
                    <div class="add_button">
                        Tag Mode
                    </div>
                    <div class="add_button">
                        <router-link to="/projects/add">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
                                <path fill="#ffffff" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                            </svg>
                            Add Project
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="top_row">
                <input type="text" class="search_bar">

                <select class="filter">
                    <option>Filter by Location</option>
                </select>

                <select class="filter">
                    <option>Filter by Sector</option>
                </select>
            </div>

            <table class="unstriped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Project Number</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>Preview</th>
                    </tr>
                </thead>
                <draggable :list="draggableValue" :options="{}" tag="tbody" @change="onChange">
                    <template #item="{element}">
                        <tr :class="!element.active? 'active_project' : ''">
                            <!-- <td><input type="checkbox" v-model="element.active" :true-value="1" :false-value="0" @change="setNewValue(element.id, $event)"></td> -->
                            <td>
                                <div class="checkbox-wrapper-23">
                                    <input type="checkbox" id="check-23" v-model="element.active" :true-value="1" :false-value="0" @change="setNewValue(element.id, $event)" />
                                    <label for="check-23" style="--size: 35px">
                                        <svg viewBox="0,0,50,50">
                                            <path d="M5 30 L 20 45 L 45 5"></path>
                                        </svg>
                                    </label>
                                </div>
                            </td>
                            <td class="left"><span class="banner">{{element.project_number}}</span></td>
                            <td class="name left">{{element.name}}</td>
                            <td class="location left">{{element.location}}</td>
                            <td class="icon edit">
                                <router-link :to="{name: 'edit_projects', params:{select: element.id}, query: {page: 'Info'}}">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                                        <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                                    </svg>
                                </router-link>
                            </td>
                            <td class="icon delete" @click="deleteProject(element.id)">
                                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
                                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                </svg>
                            </td>
                            <td class="icon preview">
                                <router-link :to="{name: 'edit_projects', params:{select: element.id}, query: {page: 'Preview'} }">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                                    </svg>
                                </router-link>
                            </td>

                        </tr>
                    </template>
                </draggable>

            </table>
        </div>
        <div class="mobile">
            <div class="top_row space">
                <span class="">
                </span>

                <div class="buttons">
                    <div class="add_button">
                        Edit Filters
                    </div>
                    <div class="add_button">
                        Tag Mode
                    </div>

                </div>
            </div>
            <div class="top_row">
                <div class="add_button mobile_add">
                    <router-link to="/projects/add">
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
                            <path fill="#ffffff" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                        </svg>
                        Add Project
                    </router-link>
                </div>
            </div>
            <div class="top_row">
                <select class="filter">
                    <option>Filter by Location</option>
                </select>

                <select class="filter">
                    <option>Filter by Sector</option>
                </select>
            </div>
            <div class="top_row">
                <input type="text" class="search_bar">

            </div>


            <table class="unstriped">
                <thead>
                    <tr>
                        <th>Project Number</th>
                        <th>Name</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <draggable :list="draggableValue" :options="{}" tag="tbody" @change="onChange">
                    <template #item="{element}">
                        <tr :class="!element.active? 'active_project' : ''">

                            <td class="left"><span class="banner">{{element.project_number}}</span></td>
                            <td class="name left">{{element.name}}</td>
                            <td class="icon edit">
                                <router-link :to="{name: 'edit_projects', params:{select: element.id}, query: {page: 'Info'}}">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                                        <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                                    </svg>
                                </router-link>
                            </td>
                            <td class="icon delete" @click="deleteProject(element.id)">
                                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
                                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                </svg>
                            </td>

                        </tr>
                    </template>
                </draggable>

            </table>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import draggable from 'vuedraggable'
import main_header from '@/components/header/sidebar.vue';
import checkboxes from '@/components/checkbox/checkbox3.vue';
import checkbox_front from '@/components/checkbox/checkbox_front.vue';
import jalfry from '@/components/button/jalfry_rounded.vue';

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
            backend_hostname: 'https://irzaw.com',
            username: ''
        };
    },
    props: {

    },
    computed: {

        filteredObjects() {

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
                    projects: this.projects,
                    update: {
                        username: this.username,
                        change: 'Updated order of projects.'
                    }
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
            this.username = username;
        } else {
            this.$router.push("/?logout=true");
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
        main_header,
        jalfry,
        checkbox_front
    },
};
</script>

<style scoped>
@import '@/assets/font.css';

#app {
    display: flex !important;
}

.space {
    justify-content: space-between;
}

.top_row {
    display: flex;
}

.search_bar {
    width: 100%;
    max-width: unset;
    border-radius: 5px;
    margin: 5px;
}

.mobile_add{
    width: 100%;
}

.add_button {
    min-width: 160px;
    border-radius: 5px;
    color: white;
    background-color: black;
    vertical-align: revert;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 5px;
    padding: 5px;
}

.buttons {
    width: unset;
    margin: unset;
    display: flex;
}

.add_button a {

    color: white !important;
}

.desktop {
    width: 75%;
    margin: 2vh auto;
}

.left {
    text-align: left;
}

td,
th {
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 40px;
}

.parent {
    margin: 0 auto;
    font-family: 'PoppinsMedium', sans-serif !important;
}

.unstriped {

    font-family: 'PoppinsMedium', sans-serif !important;

}

tr {
    border-bottom: 0;
}

.active_project {
    background-color: #f0f0f0;
    opacity: .5;
}

.checkbox-wrapper-23 *,
.checkbox-wrapper-23 *:after,
.checkbox-wrapper-23 *:before {
    box-sizing: border-box;
}

.checkbox-wrapper-23 input {
    position: absolute;
    opacity: 0;
}

.checkbox-wrapper-23 input:checked+label svg path {
    stroke-dashoffset: 0;
}

.checkbox-wrapper-23 input:focus+label {
    transform: scale(1.03);
}

.checkbox-wrapper-23 input+label {
    display: block;
    border: 2px solid black;
    width: var(--size);
    height: var(--size);
    border-radius: 6px;
    cursor: pointer;
    transition: all .2s ease;
}

.checkbox-wrapper-23 input+label:active {
    transform: scale(1.05);
    border-radius: 12px;
}

.checkbox-wrapper-23 input+label svg {
    pointer-events: none;
    padding: 5%;
}

.checkbox-wrapper-23 input+label svg path {
    fill: none;
    stroke: black;
    stroke-width: 9px;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 100;
    stroke-dashoffset: 101;
    transition: all 250ms cubic-bezier(1, 0, .37, .91);
}

.mobile {
    display: none;
}

.flex_response {
    display: flex;
}

.banner {
    background-color: #000;
    padding: 2px 6px;
    color: #fff;
    margin: 0 auto;
    border-radius: 9px;
    font-size: 20px;
    white-space: nowrap;
}

.title_banner {
    background-color: #000;
    padding: 2px 6px;
    color: #fff;
    margin: 0 auto;
    border-radius: 9px;
    font-size: 28px;
    white-space: nowrap;
}

.filter {
    max-width: 160px;
    border-radius: 5px;
    margin: 5px;
}

@media screen and (max-width: 767px) {
    .desktop {
        display: none;
    }

    .flex_response {
        display: block;
    }

    .mobile {
        display: block;
        width: 75%;
        margin: 0 auto;
    }

}
</style>
