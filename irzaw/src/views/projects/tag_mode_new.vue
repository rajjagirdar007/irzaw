<template>
<sidebar></sidebar>
<div class="flex">
    <checkboxes :nested-array="level1" :selected="selected" @click="getProjects()"></checkboxes>

    <div class="tables flex">
        <div class="frame_one">
            <h3>Selected Projects</h3>

            <div class="frame">
                <table class="hover">
                    <thead>

                        <tr>

                            <th>Project Number</th>
                            <th>Name</th>
                            <th>Location</th>
                            <th>View</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in this.projects_selected" @click="deselect(item.name, item.id)" :style="this.deselect.includes(item.id)  ? {'background-color': '#000000', 'color': 'white'} :  {'background-color': '#f1f1f1', 'color': '#2c3e50'}">
                            <td>{{item.project_number}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.location}}</td>
                            <td>
                              <router-link :to="{name: 'edit_projects', params:{select: item.id}, query: {page: 'Info'}}">View</router-link>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>
            <div class="update" @click="this.submitdeform()">
              Deselect Projects with Filters
          </div>
        </div>
        <div class="frame_one">
            <h3>Projects Not Selected</h3>

            <div class="frame">
                <table class="hover">

                    <thead>

                        <tr>

                            <th>Project Number</th>
                            <th>Name</th>
                            <th>Location</th>
                            <th>View</th>

                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="item in this.projects_not_selected" @click="select(item.name, item.id)" :style="this.select.includes(item.id)  ? {'background-color': '#000000', 'color': 'white'} :  {'background-color': '#f1f1f1', 'color': '#2c3e50'}">
                            <td>{{item.project_number}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.location}}</td>
                            <td>
                              <router-link :to="{name: 'edit_projects', params:{select: item.id}, query: {page: 'Info'}}">View</router-link>
                            </td>
                        </tr>
                    </tbody>

                </table>

            </div>
            <div class="update" @click="this.submitform()">
                Update Projects with Filters
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import sidebar from '@/components/header/main_header.vue';
import checkboxes from '@/components/checkbox/checkbox3.vue';

export default {

    created() {
        var name = this.$route.query.name;
        var parent_name = this.$route.query.parent_name;
        this.selected.push(name);
        this.selected.push(parent_name);
        this.selected.push("Sector");
        console.log(this.selected)
        if (name) {
            this.showFilter = true;

        }
        let self = this;
        axios.get('https://dev.irzaw.com/getProjects').then(function (response) {
            console.log(response.data);
            self.projects = response.data;
        });
        axios.get('https://dev.irzaw.com//get_allTags').then(function (response) {
            console.log(response);
            self.level1 = response.data;
            //self.tags_level2  = response.data.level2;
            //self.tags_level3  = response.data.level3;
        });
    },
    mounted() {
        this.getProjects();
        let username = this.getCookie('username');
        let permission = this.getCookie('permission');
        let token = this.getCookie('token');
        if (username && permission && token) {
            console.log(username, permission, token);
            if (permission == "marketing") {
                this.$router.push("/marketing_view/projects/panel");

            }

        } else {
            this.$router.push("/?logout=true");
        }

    },
    data() {
        return {
            projects: [],
            select: [],
            select_names: [],
            deselect: [],
            deselect_names: [],
            filters: null,
            search: '',
            selected: [],
            level1: [],
            array1: [],
            showFilter: false,
            projects_selected: [],
            projects_not_selected: []
        }
    },
    methods: {
        select(name, id) {
            if (this.select.indexOf(id) === -1) {
                this.select.push(id);
            } else {
                this.select.splice(this.select.indexOf(id), 1);
            }
            if (this.select_names.indexOf(name) === -1) {
                this.select_names.push(name);
            } else {
                this.select_names.splice(this.select_names.indexOf(name), 1);

            }
            console.log(this.select);
            console.log(this.select_names);
        },
        deselect(name, id) {
            if (this.deselect.indexOf(id) === -1) {
                this.deselect.push(id);
            } else {
                this.deselect.splice(this.deselect.indexOf(id), 1);
            }
            if (this.deselect_names.indexOf(name) === -1) {
                this.deselect_names.push(name);
            } else {
                this.deselect_names.splice(this.deselect_names.indexOf(name), 1);

            }
            console.log(this.deselect);
            console.log(this.deselect_names);
        },
        removeProject(name, id) {
            this.select.splice(this.select.indexOf(id), 1);
            this.select_names.splice(this.select_names.indexOf(name), 1);
        },
        updatetags(variable) {
            this.filters = variable.join();
            console.log(this.filters);
        },
        submitform() {
            const object1 = {
                id: this.select,
                filter: this.selected.join()
            };
            console.log(object1);
            axios.post('https://irzaw.com/change_filters', object1)
                .then(console.log('this has been inserted'));
            //this.$router.go('multiple');
        },
        submitdeform() {
            const object2 = {
                id: this.deselect,
                filter: this.selected
            };
            console.log(object2);
            axios.post('https://irzaw.com/deselect_filters', object2)
                .then(console.log('this has been inserted'));
                this.$router.go('');

                //this.$router.go('multiple');
        },
        isInComputedFilter(item) {
            console.log(this.filterBySelected);
            return this.filterBySelected.includes(item);
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
        getProjects() {
            var sele = this.selected;
            axios.post('/projects_by_cat', {
                    sele
                })
                .then(res => {
                    this.projects_selected = res.data;
                    // this.projects_not_selected = this.projects.filter(project => {
                    //     return !this.projects_selected.some(selectedProject => selectedProject.id === project.id);
                    // });
                    console.log(res.data); 
                })
                .catch(err => {
                    console.log(err);
                });


                axios.post('/projects_not_in_cat', {
                    sele
                })
                .then(res2 => {
                    this.projects_not_selected = res2.data;
                    console.log(res2.data); 
                })
                .catch(err => {
                    console.log(err);
                });
        },
        submitform() {
            const object1 = {
                id: this.select,
                filter: this.selected.join()
            };
            console.log(object1);
            axios.post('https://irzaw.com/change_filters', object1)
                .then(console.log('this has been inserted'));
            this.$router.go('');
        },
    },
    components: {
        checkboxes,
        sidebar
    },
    watch: {
        selected(newselect) {
            console.log(this.selected)
            this.select_names = [...newselect];
            this.getProjects();

        }
    },
    computed: {
        filteredProjects() {
            return this.projects.filter(project => {
                const name = project.name.toString().toLowerCase();
                const loc = project.location.toString().toLowerCase();
                const proj_num = project.project_number.toString().toLowerCase();

                const search = this.search.toString().toLowerCase();
                return name.includes(search) || proj_num.includes(search) || loc.includes(search)
            });

        },
        // filterBySelected() {
        //     if (this.selected.length === 0) {
        //         return [];
        //     } else {

        //         return this.projects.filter((item) => {
        //             const itemCategories = item.category.split(",");
        //             //return this.selected.every((selectedCategory) => itemCategories.includes(selectedCategory));

        //             return this.selected.some((selectedCategory) => itemCategories.includes(selectedCategory));
        //             //return this.selected.every((selectedCategory) => itemCategories.includes(selectedCategory));
        //         });

        //     }

        // },
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

    }
}
</script>

<style scoped>
@import '@/assets/font.css';

.frame {
    width: 100%;
    height: 100%;
    overflow-y: scroll;

}

.frame_one {
    width: 35vw;
    height: 70vh;
    margin: 0 auto;
    margin: 15px;
    font-family: 'PoppinsMedium', sans-serif !important;


}

.update {
    min-width: 100%;
    background-color: #000000;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 10px;

}

@media (max-width: 1250px) {
  .flex {
    flex-direction: column;
  }
  
  .frame_one{
    width: 85vw;
    margin-bottom: 12vh;
  }

    /* For mobile phones: */
    .desktop-menu {
      display:none;
    }
  
    .mobile-menu{
    display: block;
    width: 100%;
    }
  
}


</style>
