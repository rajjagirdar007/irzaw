<template>
  <main_header></main_header>
  <div class="form">
    <div class="flex">
      <div class="left-items">
        <h2>Editing {{ form.type }}</h2>
      </div>
      <div class="right-items">
        <button class="top-button">
          <div>
            <router-link to="/expertise">Back to Expertise</router-link>
          </div>
        </button>
      </div>
    </div>

    <div>
      <label>Expertise Type</label>
      <input class="form-control" v-model="form.type" type="text" required>
    </div>

    <div>
      <label>Headline</label>
      <input class="form-control" v-model="form.headline" type="text" required>
    </div>


    <div>
      <label>Description</label>
      <textarea rows="6" class="form-control" v-model="form.description" required></textarea>
    </div>

    <div>
      <label>Image</label>
      <img class="thumbnail block" :src="this.hostname + '/images_api/images/expertise/expertise_main/' + form.image">
      <input id="image" type="file" ref="fileInput" @change="addImage()" class="form-control" />
    </div>

    <div>
	<label>Active Subdisciplines</label>
	<table>
		<thead>
			<tr>
				<th>Tag</th>
				<th>Photo</th>
				<th>Edit</th>
				<th>Projects</th>	
			</tr>
		</thead>
		<tbody>
			<tr v-for="item in this.tags">
				<td>{{item.name}}</td>
				<td><img class="thumbnail" :src="this.hostname + '/images_api/images/expertise/tags/' + item.images"></td>
				<td><router-link  :to="{name: 'edit_tag', params:{id: item.id}}">Edit</router-link></td>
				<td><router-link  :to="{name: 'tag_mode', query:{name: item.name, parent_name: form.type}}">View Projects</router-link></td>
			</tr>

		</tbody>


	</table>


    </div>

    <button @click="submit()" class="label save" id="btn">Save Changes</button>
  </div>
</template>
<script>
// @ is an alias to /src
import axios from 'axios';
import main_header from '@/components/header/main_header.vue';



export default {
  name: 'editExpertise',
 

  data() {
        return{
                hostname: 'https://irzaw.com',
		expertise_data: {},
		form: {
			type: "",
			description: "",
			image: "",
			headline: "",
			tag_id: null
		},
		tags: [] 
        }
        },
methods: {
        addImage() {
            var imageData = new FormData();
            const image_expertise = this.$refs.fileInput.files;
            for (let i = 0; i < image_expertise.length; i++) {
                imageData.append('expertise', image_expertise[i]);
                console.log(image_expertise[i]);
                this.form.image = image_expertise[i].name;
            }

            console.log(this.form);

            try {
                const response = axios.post(this.hostname + '/uploadexpertiseimage', imageData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                this.submit();
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        },
    submit() {
      axios.post(
        this.hostname + "/editexpertise/" + this.$route.params.id,
        this.form
      ).then(this.getData());
    },
    getData2() {
	    let self = this;
	    axios.get(this.hostname + '/get_expertise/' + this.$route.params.id).then(function (response) {
	      self.form.type = response.data[0].type;
	      self.form.description = response.data[0].description;
	      self.form.image = response.data[0].image;
	      self.form.headline = response.data[0].headline;
	      self.form.tag_id = response.data[0].tag_id; 	    
	});
                                                axios 
                                                  .get(this.hostname + '/expertise_tags/' + this.form.tag_id)
                                                  .then(function (response1) {
                                                        console.log(response1.data);
                                                          self.tags = response1.data;
                                                          console.log(self.tags)
                                                 });
    },
  async getData() {
    try {
      const response = await axios.get(this.hostname + '/get_expertise/' + this.$route.params.id);
      this.form.type = response.data[0].type;
      this.form.description = response.data[0].description;
      this.form.image = response.data[0].image;
      this.form.headline = response.data[0].headline;
      this.form.tag_id = response.data[0].tag_id;
      // Load tags after data is obtained
      await this.loadTags();
    } catch (error) {
      console.error(error);
    }
  },
  async loadTags() {
    try {
      const response = await axios.get(this.hostname + '/expertise_tags/' + this.form.tag_id);
      console.log(response.data);
      this.tags = response.data;
      console.log(this.tags);
    } catch (error) {
      console.error(error);
    }
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
            axios.get(this.hostname + '/get_expertise/' + this.$route.params.id).then(function (response) {
              self.form.type = response.data[0].type;
              self.form.description = response.data[0].description;
              self.form.image = response.data[0].image;
              self.form.headline = response.data[0].headline;
              self.form.tag_id = response.data[0].tag_id;           
        });
                                                axios 
                                                  .get(this.hostname + '/expertise_tags/' + this.form.tag_id)
                                                  .then(function (response1) {
                                                        console.log(response1.data);
                                                          self.tags = response1.data;
                                                          console.log(self.tags)
                                                 });
},
mounted(){
	this.getData();
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
</style>

