<template>
<main_header></main_header>


<div class="container">
    <div class="flex space width">
        <h3 class=" left"><span class="bold">Tag Mode</span></h3>
        <div class="top-button">
            <div class="">
                <router-link to="/projects">Back to Projects</router-link>
            </div>
        </div>
    </div>
	
	<div class="search input-group" id="t">
		        <input v-model="search" placeholder="Search Projects" type="text" class="input input-group-field">
			<div class="filter-button" @click="showFilter = !showFilter">Select Filters</div>
			
	</div>


	<div class="filter">


	</div>




	<div class="table">

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

				<tr v-for="element in filterBySelected" @click="select(element.name, element.id)" :style="this.select.includes(element.id) || isInComputedFilter(element)  ? {'background-color': '#000000', 'color': 'white'} :  {'background-color': '#f1f1f1', 'color': '#2c3e50'}">
					<td>{{element.project_number}}</td>
					<td>{{element.name}}</td>
					<td>{{element.location}}</td>
					<td>
		                            <router-link :to="{name: 'edit_projects', params:{select: element.id}, query: {page: 'Info'}}">View</router-link>

					</td>

				</tr>
				
			</tbody>



		</table>

               	      	
	      <checkboxes id="check" v-show="showFilter" :nested-array="level1" :selected="selected"></checkboxes>
<!--<form>
	        	<button class="button" @click="submitForm()">Submit the Changes</button>
      		</form>-->


	</div>	
  <div v-if="this.select.length > 0" class="floating-button" @click="submitform()">
    Submit the Changes
  </div>

</div>




<!--<div class="container">
    <div class="checkboxes-container">
      <checkboxes :nested-array="level1" :selected="selected"></checkboxes>
    </div>
    <div class="main-container">
      <div class="search-bar">
        <input v-model="search" placeholder="Search Projects" type="text" class="input">
      </div>
      <div class="projects-grid">
        <div class="card" v-for="item in filteredProjects" @click="select(item.name, item.id)" :style="this.select.includes(item.id) || isInComputedFilter(item)  ? {'background-color': '#000000', 'color': 'white'} :  {'background-color': 'white'}">
          <p class="para">{{ item.name }}</p>
        </div>
      </div>
      <form>
        <button class="button" @click="submitForm()">Submit the Changes</button>
      </form>
    </div>
  </div>-->
</template>


<script>
import axios from 'axios';
import main_header from '@/components/header/main_header.vue';
import checkboxes from '@/components/checkbox/checkbox3.vue';

export default {

	created() {
		var name = this.$route.query.name; 
		var parent_name = this.$route.query.parent_name; 
		this.selected.push(name);
		this.selected.push(parent_name);
		this.selected.push("Sector");
		console.log(this.selected)
	       	if (name){
			this.showFilter = true;

		}
		let self = this;
               axios.get('https://dev.irzaw.com/getProjects').then(function(response){    
               		console.log(response); 
                 	self.projects  = response.data;	
		});
	          axios.get('https://dev.irzaw.com//get_allTags').then(function(response){    
                    console.log(response); 
                 self.level1  = response.data;
                 //self.tags_level2  = response.data.level2;
                 //self.tags_level3  = response.data.level3;
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

	},
	data() {
		return {
			projects: [],
			select: [],
			select_names: [],
			filters: null,
			search: '',
			selected: [],
			level1: [],
			array1: [],
			showFilter: false
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
				this.$router.go('multiple'); 
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
	},
	components: {checkboxes, main_header},
	watch: {
		selected(newselect){
		      this.select_names = [...newselect];
		}
	},
	computed: {
		filteredProjects() {
                	return this.projects.filter(project => {
                        	const name = project.name.toString().toLowerCase();
                        	const loc = project.location.toString().toLowerCase();
                                const proj_num  = project.project_number.toString().toLowerCase();
				
				
				const search = this.search.toString().toLowerCase();
                        	return name.includes(search) || proj_num.includes(search) || loc.includes(search) 
                       		});

	},
	filterBySelected() {
			      if (this.selected.length === 0) {
        				return [];
      				} else {
        
					return this.projects.filter((item) => {
					const itemCategories = item.category.split(",");
						            //return this.selected.every((selectedCategory) => itemCategories.includes(selectedCategory));
            
						return this.selected.some((selectedCategory) => itemCategories.includes(selectedCategory));	
						//return this.selected.every((selectedCategory) => itemCategories.includes(selectedCategory));
					  });

      			}
			
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
    
}
}
</script>


<style scoped>
/*.main{
	display: grid;
}
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3px;
  width: 70%;
  margin: auto;
  position: relative;
}
.input{
	position: relative;
	max-width: 100%;
	width: 100%;
	margin-bottom: 1%;
}
button{
background: black;
}
.para{
	margin: 0 auto; 
}
.flex{
	display: flex;
}
.container {
  display: flex;
  flex-direction: row;
	justify-content: center;
	
}
*/
.checkboxes-container {
  margin-right: 3vw;
	margin-top: 5vw;
}

.main-container {
  display: flex;
  flex-direction: column;
 margin-top: 2vw;
	width: 60vw;
}

.search-bar {
  margin-bottom: 10px; /* Adjust spacing between search bar and projects grid */
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px; /* Adjust gap between project cards */
}

.card {
  padding: 10px;
  border: 1px solid #ccc;
}

.button {
}
.container{
display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
	width: 70vw;
margin: 0 auto;
}

.input{
    width: 100%;
    text-align: left;
    max-width: 100%;

}

.floating-button {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: black;
  color: white;
    padding: 10px;  
display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 9999; /* Ensure it's above other content */
}
#check{
    min-width: 25%;
    /* background-color: black; */
    border: 1px solid black;
    border-radius: 10px;
    height: fit-content;
    margin: 10px;
    color: white !important;
    padding: 10px;
}

#check label{
	color: white;

}

.table{
display: flex;
}

.search{
display: flex;
    width: 80%;
    padding: 1vw;
    border-left: 0;
    align-items: center;
}

.width{
width: 100%;
    margin-top: 20px;

}
</style>
