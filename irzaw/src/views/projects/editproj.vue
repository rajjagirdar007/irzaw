<template>
<!-- <header1></header1> -->
<div class="header">
    <div class="right-items">
        <div class="logo" @click="this.$router.go('/')">irzaw</div>
    </div>
    <div class="left-items">
        <div class="back-button" @click="logout()">logout</div>
        <div class="edit-links">
            <div class="edit-link" :class="{'active_nav': headerActive('Info') }" @click="this.subArray='Info'">Info</div>
            <div class="edit-link" :class="{'active_nav': headerActive('Tags') }" @click="this.subArray='Tags'">Tags</div>
            <div class="edit-link" :class="{'active_nav': headerActive('Photos') }" @click="this.subArray='Photos'">Photos</div>
            <div class="edit-link" :class="{'active_nav': headerActive('Preview') }" @click="this.subArray='Preview'">Preview</div>
            <div class="edit-link" :class="{'active_nav': headerActive('People') }" @click="this.subArray='People'">People</div>
            <div class="edit-link" :class="{'active_nav': headerActive('Marketing') }" @click="this.subArray='Marketing'">Marketing</div>

            <!-- <div class="edit-link " @click="this.subArray='Files'">Files</div>
            <div class="edit-link" @click="this.subArray='Finances'">Finances</div>
            <div class="edit-link" @click="this.subArray='People'">People</div> -->

        </div>
    </div>
</div>
<form>

    <div class="flex space">
        <h3 class=" left">Project <span class="bold">{{this.form.project_number}}</span></h3>
        <div class="top-button">
            <div class="">
                <router-link to="/projects">Back to Projects</router-link>
            </div>
        </div>
    </div>

    <div v-show="this.subArray == 'Info'">
        <div>
            <label>Project Name</label>
            <input class="form-control" v-model="this.form.name" type="text" required />
        </div>

        <div>
            <label for="clients">Client</label>
            <select class="form-control" id="mylist" v-model="this.form.client" name="clients">
                <option></option>
                <option v-for="item in this.clients" v-bind:value="item.client">
                    {{ item.client }}
                </option>
            </select>
        </div>

        <div>
            <label for="project_number">Project Number</label>
            <input type="text" class="form-control" v-model="this.form.project_number" id="project_number" name="project_number" required />
        </div>

        <div>
            <label for="location">Location </label>
            <input type="text" placeholder="City, State" class="form-control" v-model="this.form.location" id="location" name="location" required />
        </div>

        <div>
            <label for="date">Date</label>
            <input type="text" id="date" name="date" placeholder="YYYY" class="form-control" v-model="this.form.date" maxLength="4" required />
        </div>

        <div>
            <label for="partners">Partners</label>
            <textarea id="partners" name="partners" rows="3" v-model="this.form.partners" class="form-control"></textarea>
        </div>

        <div>
            <label for="description">Description</label>
            <textarea ref="textarea" id="description" rows="6" name="description" v-model="this.form.description" class="form-control" @keydown="handle_keydown" required></textarea>
            <div v-if="showModal" class="modal-for-text" :style="modalStyle">
                <p>peoples names</p>
            </div>
        </div>

        <button @click="handleSubmit()" class="label save" id="btn">
            Save Changes
        </button>
    </div>

    <div v-if="this.subArray == 'Tags'">
        <label>Select Relevant Tags</label>
        <checkboxes class="center" :nested-array="level1" :selected="this.seperate"></checkboxes>

        <button @click="handleSubmit()" class="label save" id="btn">
            Save Changes
        </button>

    </div>
    <div v-show="this.subArray == 'Photos'">
        <label for="extra_imgs">Project Photos</label>
        <div class="thumbnail-c" v-for="image in this.form.image">
            <img class="thumbnail" :src="this.hostname + '/images_api' + image" />
            <a @click="deleteImage(image)">Delete</a>
        </div>
        <input multiple="multiple" id="files" type="file" ref="fileInput" @change="add()" class="form-control" />

        <button @click="handleSubmit()" class="label save" id="btn">
            Save Changes
        </button>
    </div>

    <div v-show="this.subArray == 'Preview'" class="preview-class">
        <div class="sub">
            <h6>Select screen size to preview: </h6>
        </div>
        <div class="buttons">
            <p class="label but" :class="{'active_nav': previewActive('Mobile') }" @click="changeSize('mobile')">Mobile</p>
            <p class="label but" :class="{'active_nav': previewActive('Tablet') }" @click="changeSize('tablet')">Tablet</p>
            <p class="label but" :class="{'active_nav': previewActive('Desktop') }" @click="changeSize('desktop')">Desktop</p>
        </div>
        <iframe :style="iframeStyle" ref="iframe" class="iframe" :src="'https://mpengs.com/projects/details/' + this.form.id"></iframe>
        <a class="label save preview-link" id="btn" target="_blank" :href="'https://mpengs.com/projects/details/' + this.form.id">
            Open in New Tab
        </a>
    </div>

    
<div v-show="subArray === 'People'" @click="getPeopleInfo()" class="people-class">
  <h3 class="left">People</h3>

  <table class="stack">
    <thead>
      <tr>
        <th>Role</th>
        <th>Name</th>
        <th></th>
        <th>Work Description</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in peopleInfo" :key="item.id">
        <td>{{ item.role }}</td>
        <td>{{ item.employee_data.first_name }} {{ item.employee_data.last_name }}</td>
        <td><img class="thumbnail" :src="this.hostname + '/images_api/images/people/leadership/' + item.employee_data.leadership_picture" alt="Employee Image"></td>
        <td>{{ item.description }}</td>
        <td><a class="button alert" @click="deleteTag(item.id)">Delete</a></td>
      </tr>
      <tr>
  <td>
    <p>Enter role of the person:</p>
    <div class="input-group">
      <span class="input-group-label">Role</span>
      <input class="input-group-field" v-model="people.role" type="text" placeholder="Role">
    </div>
  </td>
  <td>
    <p class="switch button" @click="emp = !emp">{{ emp ? 'See Leadership' : 'See Employees' }}</p>
  </td>
  <td>
    <div v-if="emp">
      <p>Select an Employee</p>
      <select v-model="people.engineer_id" class="select">
        <option v-for="item2 in peopleData.people" :value="item2.id">{{ item2.first_name }} {{ item2.last_name }} {{ item2.certifications }}</option>
      </select>
    </div>
    <div v-else>
      <p>Select a Leader</p>
      <select v-model="people.leader_id" class="select">
        <option v-for="item3 in peopleData.leadership" :value="item3.id">{{ item3.first_name }} {{ item3.last_name }} {{ item3.certifications }}</option>
      </select>
    </div>
  </td>
  <td>
    <div class="field">
      <label class="label">Description of work done</label>
      <div class="control">
        <textarea class="textarea" rows="6" v-model="people.description" placeholder="Description of work done..."></textarea>
      </div>
    </div>
  </td>
  <td>
    <button class="button success"  @click="addPerson()">Add person</button>
  </td>
</tr>
    </tbody>
  </table>
</div>
    <!-- <div v-show="this.subArray == 'People'" @click="getPeopleInfo()" class="people-class">
        <h3 class="left">People</h3>

        <table>
            <thead>
                <tr>
                    <th>Role</th>
                    <th>Name</th>
                    <th></th>
                    <th>Work Description</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in this.peopleInfo">
                    <td>{{item.role}}</td>
                    <td>{{item.employee_data.first_name}} {{item.employee_data.last_name}}</td>
                    <td><img class="thumbnail" :src="this.hostname + '/images_api/images/people/leadership/' + item.employee_data.leadership_picture"></td>
                    <td>{{item.description}}</td>
                    <td><a class="delete" @click="deleteTag(item.id)">Delete</a></td>
                </tr>
                <tr>
                    <td>
                        <p>Enter role of person: </p>

                        <div class="input-group">
                            <span class="input-group-label">Role</span>
                            <input class="input-group-field" v-model="this.people.role" type="text" />
                        </div>
                    </td>
                    <td>
                        <p class="switchbutton" @click="this.emp = !this.emp">{{ this.emp ? 'See Leadership' : 'See Employees' }}</p>
                    </td>
                    <td>
                        <div class="" v-if="this.emp">
                            <p>Select an Employee</p>
                            <select class="form-control" id="mylist" v-model="this.people.engineer_id" name="Employee" placeholder="Employee">
                                <option v-for="item2 in this.peopleData.people" v-bind:value="item2.id">
                                    {{ item2.first_name }} {{ item2.last_name }} {{ item2.certifications }}
                                </option>
                            </select>
                        </div>
                        <div v-else>
                            <p>Select a Leader</p>
                            <select class="form-control" id="mylist" v-model="this.people.leader_id" name="Leader" placeholder="Leadership">
                                <option v-for="item3 in this.peopleData.leadership" v-bind:value="item3.id">
                                    {{ item3.first_name }} {{ item3.last_name }} {{ item3.certifications }}
                                </option>
                            </select>
                        </div>

                    </td>

                    <td>
                        <textarea class="form-control" rows="6" v-model="this.people.description" placeholder="Description of work done..."> </textarea>
                    </td>
                    <td>
                        <button class="switchbutton" v-if="this.people.role.length > 0 && this.people.description.length > 0" @click="addPerson()">Add person</button>
                    </td>
                </tr>
            </tbody>

        </table>
    </div> -->
        

</form>
</template>

<script>
import axios from "axios";
import checkboxes from "@/components/checkbox/checkbox3.vue";

export default {
    props: ["select"],
    data() {
        return {
	    hostname: 'https://irzaw.com',
            showModal: false,
            cursorPosition: {
                top: 0,
                left: 0
            },
            tags_level1: [],
            level1: [],
            tags_level2: [],
            tags_level3: [],
            clients: [],
            selected_tags: [],
            image: [],
            form: {
                name: "",
                id: "",
                client: "",
                project_number: null,
                location: null,
                category: null,
                date: null,
                partners: null,
                description: null,
                priority: null,
                image: null,
            },
            first_form: null,
            seperate: [],
            subArray: 'Info',
            iframeStyle: {
                maxWidth: '70vw',
                width: '70vw',
                height: '80vh',
                margin: '0 auto',
                display: 'block'
            },
            preview: '',
            text: '',
            peopleInfo: [],
            showrow: false,
            people: {
                role: "",
                project_id: this.$route.params.select,
                leader_id: null,
                engineer_id: null,
                description: ''
            },
            peopleData: {
                leadership: [],
                people: []

            },
            emp: true
        }
    },
    watch: {
        seperate: function () {
            this.form.category = this.seperate.join();
        },
    },
    components: {
        checkboxes,
    },
    computed: {
        modalStyle() {
            return {
                top: `${this.cursorPosition.top}px`,
                left: `${this.cursorPosition.left}px`
            }
        }
    },
    methods: {
        handle_keydown(event) {
            if (event.key === '@') {
                this.showModal = true;
                const textarea = this.$refs.textarea;
                const selectionStart = textarea.selectionStart;
                this.updateCursorPosition(selectionStart);
            } else {
                this.showModal = false;
            }
        },
        updateCursorPosition(selectionStart) {
            const textareaRect = this.$refs.textarea.getBoundingClientRect();
            const lineHeight = parseFloat(getComputedStyle(this.$refs.textarea).lineHeight);
            const lines = this.text.substr(0, selectionStart).split('\n').length;
            console.log(selectionStart % lines);
            const cursorPositionX = textareaRect.left;
            const cursorPositionY = textareaRect.top + (lines - 1) * lineHeight + window.scrollY;

            this.cursorPosition = {
                top: cursorPositionY,
                left: cursorPositionX
            };
        },
        AddNewPerson() {
            this.showrow = true;
        },
        addPerson() {
            axios
                .post(
                    this.hostname + "/addPeopleProject/",
                    this.people
                )
                .then(this.getPeopleInfo());
            //	   this.$router.go('/panel');
            // this.getdata();

        },
        deleteImage(image) {
            const index = this.form.image.indexOf(image);
            if (index !== -1) {
                this.form.image.splice(index, 1);
            }
            this.submit();
        },
        deleteTag(id) {
            const variable = {
                id_delete: id
            }
            console.log(variable);
            axios.post(this.hostname + '/delete_peopleproject', variable)
                .then(this.getPeopleInfo());
            this.getPeopleInfo();

        },
        add() {
            const formData = new FormData();
            const files = this.$refs.fileInput.files;
            for (let i = 0; i < files.length; i++) {
                formData.append("image", files[i]);
                console.log(files[i]);
                this.form.image.push("/images/projects/" + files[i].name);
            }
            try {
                const response = axios.post(
                    this.hostname + "/uploadmultiple",
                    formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
            this.submit();
            console.log(formData.getAll("image"));
            console.log("/images/projects/" + this.form.image);
        },
        getSubfilter(id) {
            this.parent_filter_id = id.toString;
            console.log(this.parent_filter_id);
            axios
                .get(this.hostname + "/get_subfilters/" + id)
                .then((response) => this.tags_level2.push(response.data));
        },
        getSubfilterCheck(id) {
            this.parent_filter_id = id.toString;
            console.log(this.parent_filter_id);
            axios
                .get(this.hostname + "/get_subfilters/" + id)
                .then((response) => (this.tags_level2 = response.data));
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
            const files1 = document.getElementById("files");
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
                formData.append("images", files[i]);
            }
            console.log(formData.files);
            try {
                const response = await axios.post(
                    this.hostname + "/uploadmultiple",
                    formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                //this.$router.go('/insert');

                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        },
        headerActive(id) {
            return id === this.subArray;
        },
        previewActive(id) {
            return id === this.preview;
        },
        submit() {
            this.form.category = this.seperate.join();
            this.form.image = this.form.image.join();
            axios
                .post(
                    this.hostname + "/editproject/" + this.$route.params.select,
                    this.form
                )
                .then(console.log("this has been inserted"));
            //	   this.$router.go('/panel');
            this.getdata();
        },
        getdata() {
            let self = this;
            const decoder = new TextDecoder();
            axios
                .get(this.hostname + "/getProject/" + this.$route.params.select)
                .then(function (response) {
                    console.log(response);
                    self.form.name = response.data[0].name;
                    self.form.id = response.data[0].id;
                    self.form.client = response.data[0].client;
                    self.form.project_number = response.data[0].project_number;
                    self.form.location = response.data[0].location;
                    self.form.category = response.data[0].category;
                    self.form.date = response.data[0].date;
                    self.form.partners = response.data[0].partners;
                    self.form.description = response.data[0].description;
                    self.form.priority = response.data[0].priority;
                    self.form.image = response.data[0].image.split(",");

                    self.seperate = self.form.category.split(",");
                    console.log(self.form.category.split(","));
                    self.$emit("selected1", self.form.category.split(","));
                });
        },
        getPeopleInfo() {
            let self = this;
            axios.get(this.hostname + "/peopleProjects/" + this.$route.params.select).then(function (response) {
                console.log(response);
                self.peopleInfo = response.data;
                this.subArray == 'People';
            });
            console.log(self.peopleInfo);
        },
        changeSize(device) {
            switch (device) {
                case 'mobile':
                    this.setIframeSize('375px', '667px');
                    break;
                case 'tablet':
                    this.setIframeSize('768px', '1024px');
                    break;
                case 'desktop':
                    this.setIframeSize('1366px', '768px');
                    break;
                case 'largeDesktop':
                    this.setIframeSize('1920px', '1080px');
                    break;
            }
        },
        setIframeSize(width, height) {
            this.iframeStyle.width = width;
            this.iframeStyle.height = height;
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
        axios.get(this.hostname + "/getFilters_level1").then(function (response) {
            console.log(response);
            self.tags_level1 = response.data;
            //this.tags_level2  = response.data.level2;
            //this.tags_level3  = response.data.level3;
        });
        axios.get(this.hostname + "/client").then(function (response) {
            console.log(response);
            self.clients = response.data;
        });

        axios.get(this.hostname + "/get_allTags").then(function (response) {
            console.log(response);
            self.level1 = response.data;
            self.tags_level2 = response.data.level2;
            self.tags_level3 = response.data.level3;
        });

        axios.get(this.hostname + "/peopleProjects/" + this.$route.params.select).then(function (response) {
            console.log(response);
            self.peopleInfo = response.data;
        });
        axios.get(this.hostname + '/get_allpeople')
            .then((response) => {
                this.peopleData.leadership = response.data.leadership;
                this.peopleData.people = response.data.people;
                console.log(response.data)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    },
    mounted() {
        let self = this;
        self.subArray = this.$route.query.page;
        const decoder = new TextDecoder();
        axios
            .get(this.hostname + "/getProject/" + this.$route.params.select)
            .then(function (response) {
                console.log(response);
                self.form.name = response.data[0].name;
                self.form.id = response.data[0].id;
                self.form.client = response.data[0].client;
                self.form.project_number = response.data[0].project_number;
                self.form.location = response.data[0].location;
                self.form.category = response.data[0].category;
                self.form.date = response.data[0].date;
                self.form.partners = response.data[0].partners;
                self.form.description = response.data[0].description;
                self.form.priority = response.data[0].priority;
                self.form.image = response.data[0].image.split(",");

                self.seperate = self.form.category.split(",");
                console.log(self.form.id);
                self.$emit("selected1", self.form.category.split(","));
            });
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
    },
};
</script>

<style scoped>
.save {
    font-size: large;
    padding: 10px;
    margin: 15px 5px;
}

.iframe {
    max-width: 70vw;
    height: 90vh;
    width: 70vw;
}

.buttons {
    margin-left: 1.5vw;

}

.but {
    text-align: left;
    margin: 1vw;
    padding: .5vw;
    float: left;
}

.sub {
    margin-left: 1vw;
    text-align: left;
    float: left;
}

.preview-link {
    margin-top: 2vh;
    display: block;

}

.thumbnail-c {
    width: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

input {
    margin: 0px;
    padding: 0.5rem !important;
}

select {
    margin: 0px;
    padding: 0.5rem !important;
}

label {
    text-align: left;
    padding: 5px;
}

form {
    width: 70%;
    margin: 0 auto;
    margin-top: 20px;
}

.form-control {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 100% !important;
}

.box-row {
    display: flex;
    align-items: center;
    padding: 10px;
    overflow-x: auto;
    /* Enable horizontal scrolling on smaller screens */
}

.box {
    min-width: 100px;
    height: 100px;
    background-color: black;
    color: white;
    text-align: center;
    line-height: 100px;
    margin-right: 10px;
    /* Add spacing between boxes */
    border-radius: 3px;
}

#container {
    display: flex;
    align-items: center;
    padding: 20px;
    background-color: white;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    margin: 20px;
}

#image {
    flex: 1;
    padding: 10px;
    max-width: 50%;
}
.flex{
	display: flex;
	justify-content: space-between;
}
#content {
    flex: 1;
    padding: 10px;
    max-width: 50%;
    border-left: 1px solid #ccc;
}

#title {
    margin: 0;
    font-size: 28px;
    color: white;
    background-color: black;
    border-radius: 10px;
    font-weight: 800;
}

.preview-class {
    display: flex;
    flex-direction: column;
}

#info-list {
    list-style-type: none;
    padding: 0;
    margin-top: 10px;
    margin-left: 15px;
}

#info-item {
    margin-bottom: -5px;
    display: flex;
    flex-direction: column;
}

.label {
    background-color: black;
    color: white;
    font-weight: bold;
    padding: 5px 10px;
    border-radius: 4px;
    margin-bottom: 5px;
}

.info {
    color: #555;
    font-size: 18px;
    margin-left: 10px;
}

.modal-for-text {
    position: absolute;
    background-color: white;
    border: 1px solid #ccc;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

@media (max-width: 600px) {
    #container {
        flex-direction: column;
        padding: 10px;
        /* Adjust padding for smaller screens */
    }

    #image,
    #content {
        max-width: 100%;
        padding: 0 10px;
        /* Add some padding to the sides */
        text-align: center;
        border-left: 0px;
    }

    #title {
        font-size: 22px;
        /* Adjust font size for mobile */
        border-radius: 0;
        /* Remove border-radius for mobile */
        margin-top: 10px;
        /* Add some space above the title */
    }

    .label {
        text-align: center;
    }
}

.header {
    background-color: black;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 999;
}

.logo {
    color: white;
    font-size: 20px;
}

.back-button {
    color: white;
    font-size: 16px;
    cursor: pointer;
}

.links {
    list-style-type: none;
    margin: 0;
    padding: 0;

}

.links li {
    color: white;
    display: inline-block;
    font-size: 14px;
    margin-right: 10px;

}

.left-items {
    display: flex;
    flex-direction: row-reverse;
    /* Start from right */
    align-items: center;
}

.right-items {
    display: flex;
    flex-direction: row;
    /* Start from left */
    align-items: center;
}

.edit-links {
    display: flex;

}

.edit-link {
    color: white;
    padding: 5px;
    border: 0.5px solid white;
    border-radius: 5px;
    margin: 5px;
}

.active_nav {

    background-color: white !important;
    color: black !important;

}

@media (max-width: 768px) {
    .iframe {
        display: none !important;
    }

    .buttons {
        display: none !important;
    }

    .preview-link {
        display: block;
        margin: 0 auto;

    }

    .sub {
        display: none;
    }
}

.switchbutton {
    color: white;
    background-color: black;
    padding: 5px;
    margin: 5px;
    border-radius: 3px;
}

.left{
    text-align: left;
}
</style>
