<template>
<main_header></main_header>
<ul id="main">
    <div class="flex space">
        <h3 class="bold left">Edit Filters</h3>
        <div class="top-button">
            <div class="new_anchor">
                <router-link to="/projects">Back to Projects</router-link>
            </div>
        </div>
    </div>
    <li class="list-item" v-for="item in items" :key="item.id">
        <div class="line">
            <h5 v-if="!item.edit">{{ item.name }}</h5>
            <div class="input-group  " v-else>
                <input class="input-group-field" v-model="item.newchange" :value="item.newchange" type="text">
                <div class="input-group-button">
                    <input type="submit" class="new_anchor" value="Change" @click="newchange(item.newchange, item.id);">
                </div>
            </div>
            <a class="alert    " @click="deleteSubfilter(item.id)">Delete</a>
            <a class="new_anchor" @click="item.edit = !item.edit" :id="item.edit ? 'enable_list' : 'disabled'">
                {{item.edit ? 'Cancel Edit' : 'Edit'}}
            </a>
            <a class="new_anchor" @click="addChild(item); toggleExpandadd(item);">
                {{item.addChild ? 'Cancel': 'Add Child'}}
            </a>
            <a class="new_anchor" :id="item.isExpanded ? 'enable_list' : 'disabled'" @click="toggleExpand(item)" v-if="item.subfilters.length > 0">
                {{ item.isExpanded ? 'Collapse' : 'Expand (' + item.subfilters.length + ')' }}
            </a> 
	    <router-link class="new_anchor advanced_setting" :to="{name: 'edit_tag', params:{id: item.id}}">Advanced</router-link>
            <input type="checkbox" v-model="item.active" :true-value="1" :false-value="0" @change="setNewValue(item.id, $event)">
            <!--<input v-if="item.addChild" :placeholder="'Add Child to ' + item.name" type="text">-->
        </div>
        <ul v-if="item.isExpanded">
            <li v-for="subfilter in item.subfilters" :key="subfilter.id">
                <div class="line">
                    <h5 v-if="!subfilter.edit">{{ subfilter.name }}</h5>
                    <div class="input-group  " v-else>
                        <input class="input-group-field" v-model="subfilter.newchange" :value="subfilter.newchange" type="text">
                        <div class="input-group-button">
                            <input type="submit" class="new_anchor" value="Change" @click="newchange(subfilter.newchange, subfilter.id);">
                        </div>
                    </div>
                    <a class="alert    " @click="deleteSubfilter(subfilter.id)">Delete</a>
                    <a class="new_anchor" @click="subfilter.edit = !subfilter.edit" :id="subfilter.edit ? 'enable_list' : 'disabled'">
                        {{subfilter.edit ? 'Cancel Edit' : 'Edit'}}
                    </a>
                    <a class="new_anchor" @click="addChild(subfilter); toggleExpandadd(subfilter);">
                        {{subfilter.addChild ? 'Cancel':'Add Child'}}
                    </a>
                    <a class="new_anchor" :id="subfilter.isExpanded ? 'enable_list' : 'disabled'" @click="toggleExpand(subfilter)" v-if="subfilter.subfilters.length > 0">
                        {{ subfilter.isExpanded ? 'Collapse' : 'Expand (' + subfilter.subfilters.length + ')' }}
                    </a>
              
	            <router-link class="new_anchor advanced_setting" :to="{name: 'edit_tag', params:{id: subfilter.id}}">Advanced</router-link>

                    <input type="checkbox" v-model="subfilter.active" :true-value="1" :false-value="0" @change="setNewValue(subfilter.id, $event)">
                    <!-- <input v-if="subfilter.addChild" type="text" :placeholder="'Add Child to ' + subfilter.name">-->
                </div>
                <ul v-if="subfilter.isExpanded">
                    <li v-for="nestedSubfilter in subfilter.subfilters" :key="nestedSubfilter.id">
                        <div class="line">
                            <h5 v-if="!nestedSubfilter.edit">{{ nestedSubfilter.name }}</h5>
                            <div class="input-group  " v-else>
                                <input class="input-group-field" :value="nestedSubfilter.newchange" v-model="nestedSubfilter.newchange" type="text">
                                <div class="input-group-button">
                                    <input type="submit" class="new_anchor" value="Change" @click="newchange(nestedSubfilter.newchange, nestedSubfilter.id);">
                                </div>
                            </div>
                            <a class="alert    " @click="deleteSubfilter(nestedSubfilter.id)">Delete</a>
                            <a class="new_anchor" @click="nestedSubfilter.edit = !nestedSubfilter.edit" :id="nestedSubfilter.edit ? 'enable_list' : 'disabled'">
                                {{nestedSubfilter.edit ? 'Cancel Edit' : 'Edit'}}
                            </a>
                            <a class="new_anchor" @click="addChild(nestedSubfilter); toggleExpandadd(nestedSubfilter);">
                                {{nestedSubfilter.addChild ?  'Cancel': 'Add Child'}}
                            </a>
                            <a class="new_anchor" :id="nestedSubfilter.isExpanded ? 'enable_list' : 'disabled'" @click="toggleExpand(nestedSubfilter)">
                                {{ nestedSubfilter.isExpanded ? 'Collapse' : 'Expand' }}
                            </a>
                           
                            <router-link class="new_anchor advanced_setting" :to="{name: 'edit_tag', params:{id: nestedSubfilter.id}}">Advanced</router-link>

			    <input type="checkbox" v-model="nestedSubfilter.active" :true-value="1" :false-value="0" @change="setNewValue(nestedSubfilter.id, $event)">
                        </div>
                        <ul v-if="nestedSubfilter.isExpanded">
                            <li v-for="nested2Subfilter in nestedSubfilter.subfilters" :key="nestedSubfilter.id">
                                <div class="line">
                                    <h5 v-if="!nested2Subfilter.edit">{{ nested2Subfilter.name }}</h5>
                                    <div class="input-group  " v-else>
                                        <input :value="nested2Subfilter.newchange" type="text" v-model="nested2Subfilter.newchange">
                                        <div class="input-group-button">
                                            <input type="submit" class="new_anchor" value="Change" @click="newchange(nested2Subfilter.newchange, nested2Subfilter.id);">
                                        </div>
                                    </div>
                                    <a class="alert    " @click="deleteSubfilter(nested2Subfilter.id)">Delete</a>
                                    <a class="new_anchor" @click="nested2Subfilter.edit = !nested2Subfilter.edit" :id="nested2Subfilter.edit ? 'enable_list' : 'disabled'">
                                        {{nested2Subfilter.edit ? 'Cancel Edit' : 'Edit'}}
                                    </a>
                                    <a class="new_anchor" @click="addChild(nested2Subfilter); toggleExpandadd(nested2Subfilter);">
                                        {{nested2Subfilter.addChild ?  'Cancel': 'Add Child'}}
                                    </a>
                                    <a class="new_anchor" :id="nested2Subfilter.isExpanded ? 'enable_list' : 'disabled'" @click="toggleExpand(nested2Subfilter)" v-if="nested2Subfilter.subfilters.length > 0">
                                        {{ nested2Subfilter.isExpanded ? 'Collapse' : 'Expand (' + nested2Subfilter.subfilters.length +')' }}
                                    </a>
                                    
	                            <router-link class="new_anchor advanced_setting" :to="{name: 'edit_tag', params:{id: nested2Subfilter.id}}">Advanced</router-link>

                                    <input type="checkbox" v-model="nested2Subfilter.active" :true-value="1" :false-value="0" @change="setNewValue(nested2Subfilter.id, $event)">
                                    <input v-if="nested2Subfilter.addChild" type="text" v-model="nested2Subfilter.newadd" :placeholder="'Add Child to ' + nested2Subfilter.name">
                                </div>
                            </li>
                            <div class="input-group" v-if="nestedSubfilter.addChild">
                                <input class="input-group-field" type="text" v-model="nestedSubfilter.newadd" :placeholder="'Add Child to ' + nestedSubfilter.name">
                                <div class="input-group-button">
                                    <input type="submit" class="new_anchor" value="Insert" @click="insert4(nestedSubfilter.newadd, nestedSubfilter.id)">
                                </div>
                            </div>
                        </ul>
                    </li>
                    <div class="input-group" v-if="subfilter.addChild">
                        <input class="input-group-field" type="text" v-model="subfilter.newadd" :placeholder="'Add Child to ' + subfilter.name">
                        <div class="input-group-button">
                            <input type="submit" class="new_anchor" value="Insert" @click="insert3(subfilter.newadd, subfilter.id)">
                        </div>
                    </div>
                </ul>
            </li>
            <div class="input-group" v-if="item.addChild">
                <input class="input-group-field" type="text" v-model="item.newadd" :placeholder="'Add Child to ' + item.name">
                <div class="input-group-button">
                    <input type="submit" class="new_anchor" value="Insert" @click="insert2(item.newadd, item.id)">
                </div>
            </div>
        </ul>
    </li>

</ul>

<!-- <div id="imageUploadModal" class="modal">
    <div class="modal-content">
        <h3 class="modal-head">Upload Image for {{this.selected_filter_name}}</h3>
        <input type="file" @change="uploadImage(this.selected_filter)" ref="fileInput" accept="image/*" :key="this.selected_filter">
        <div class="flex buttons">
            <button @click="uploadImage(this.selected_filter)" class="back-button border">Submit</button>
            <button @click="closeImageUploadModal" class="back-button border">Close</button>
        </div>
    </div>
</div> -->
<div id="imageUploadModal" class="modal">
    <div class="modal-content">
        <h3 class="modal-head">Upload Image for {{this.selected_filter_name}}</h3>
        <input type="file" @change="uploadImage(this.selected_filter)" ref="fileInput" accept="image/*" :key="this.selected_filter">
        <div class="flex buttons">
            <button @click="uploadAndCloseModal" class="back-button border">Submit</button>
            <button @click="closeImageUploadModal" class="back-button border">Close</button>
        </div>
    </div>
</div>

</template>

<script>
import axios from 'axios'
import main_header from '@/components/header/main_header.vue';

export default {
    data() {
        return {
            items: [],
            hostname: 'https://dev.irzaw.com',
            selected_filter: null,
            selected_filter_name: null,
            image_value: null,
            current_item: null,
            key: 0,
            showModal: false
        }
    },
    components: {
        main_header
    },
    created() {
        axios.get(this.hostname + '/get_allTags').then(response => {
            console.log(response)
            this.items = response.data.map(item => ({
                ...item,
                edit: false,
                addChild: false,
                isExpanded: true,
                newchange: item.name,
                newadd: '',
                subfilters: item.subfilters.map(subfilter => ({
                    ...subfilter,
                    edit: false,
                    addChild: false,
                    isExpanded: true,
                    newchange: subfilter.name,
                    newadd: '',
                    subfilters: subfilter.subfilters.map(nestedSubfilter => ({
                        ...nestedSubfilter,
                        edit: false,
                        addChild: false,
                        isExpanded: true,
                        newchange: nestedSubfilter.name,
                        newadd: ''
                    }))
                }))
            }))
        })
    },
    methods: {
        addChild(item) {
            // code to delete the item
            item.addChild = !item.addChild;
        },
        editItem(item) {
            // code to edit the item
        },
        deleteSubfilter(id) {
            // code to delete the subfilter
            const variable = {
                id_delete: id
            }
            console.log(variable);
            axios.post(this.hostname + '/delete_filter', variable)
                .then(console.log('this has been deleted'));
            this.getdata();
        },
        editSubfilter(subfilter) {},
        toggleExpand(itemOrSubfilter) {
            itemOrSubfilter.isExpanded = !itemOrSubfilter.isExpanded;
            itemOrSubfilter.addChild = false;

        },
        toggleExpandadd(item) {
            if (item.isExpanded && item.addChild) {
                //item.addChild = false;

            } else if (!item.isExpanded && item.addChild) {

                item.isExpanded = true;
            } else if (item.isExpanded && !item.addChild) {
                //item.isExpanded = false;
            }
        },
        getdata() {
            let self = this
            axios.get(this.hostname + '/get_allTags').then(function (response) {
                console.log(response);
                self.items = response.data
            });

        },
        insertSubitem(id) {

            var object = {
                name: this.level2,
                level: 2,
                parent_id: id,
                active: true,
                subfilters: null,
                images: null
            }
            axios.post(this.hostname + '/insert', object)
                .then(console.log('this has been inserted'));
            this.$router.go('/listv5');

        },
        insertSubSubitem(id) {

            var object = {
                name: this.level3,
                level: 3,
                parent_id: id,
                active: true,
                subfilters: null,
                images: null
            }
            axios.post(this.hostname + '/insert', object)
                .then(console.log('this has been inserted'));
            this.$router.go('/listv5');
        },
        newchange(change, id) {
            var obj = {
                name: change,
                id: id
            }
            axios.post(this.hostname + '/change', obj)
                .then(console.log('this has been inserted'));
            this.$router.go('/listv5');
        },
        insert4(name, parent_id) {
            var object = {
                name: name,
                level: 4,
                parent_id: parent_id,
                active: true,
                subfilters: null,
                images: null
            }
            axios.post(this.hostname + '/insert', object)
                .then(console.log('this has been inserted'));
            this.$router.go('/listv5');

        },
        insert3(name, parent_id) {
            var object = {
                name: name,
                level: 3,
                parent_id: parent_id,
                active: true,
                subfilters: null,
                images: null
            }
            axios.post(this.hostname + '/insert', object)
                .then(console.log('this has been inserted'));
            this.$router.go('/listv5');

        },
        insert2(name, parent_id) {
            var object = {
                name: name,
                level: 2,
                parent_id: parent_id,
                active: true,
                subfilters: null,
                images: null
            }
            axios.post(this.hostname + '/insert', object)
                .then(console.log('this has been inserted'));
            this.$router.go('/listv5');

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
            axios.post(this.hostname + '/active_filters', variable)
                .then(console.log('this has been deleted'));
            this.$router.go('/listv5');

        },
        openImageUploadModal(item) {
            this.selected_filter = item.id;
            this.selected_filter_name = item.name;
            this.current_item = item;
            this.showModal = true;
            // Show the modal
            document.getElementById('imageUploadModal').style.display = 'block';
        },
        closeImageUploadModal() {
            this.selected_filter = null;
            this.selected_filter_name = null;
            //this.$refs.fileInput.reset();
            console.log("closed");
            console.log(this.$refs.fileInput.value)
            this.showModal = false;
            document.getElementById('imageUploadModal').style.display = 'none';
        },
        uploadImage() {
            var imageData = new FormData();
            const image = this.$refs.fileInput.files;
            this.current_item.images = image[0].name;
            // for (let i = 0; i < image.length; i++) {
            //     imageData.append('images', image[i]);
            //     console.log(image[i]);

            //     this.image_value = '/images/expertise/tags/' + image[i].name;
            // }
            console.log(this.selected_filter);
            console.log(this.selected_filter_name);
            console.log(this.current_item);

            const variable = {
                image: image[0].name,
                id: this.current_item.id
            }

            console.log(variable);
            this.closeImageUploadModal();

            // try {
            //     const response = axios.post(this.hostname + '/uploadtags', imageData, {
            //         headers: {
            //             'Content-Type': 'multipart/form-data'
            //         }
            //     });

            //     console.log(response.data);
            // } catch (error) {
            //     console.error(error);
            // }

        },
        uploadAndCloseModal() {
            // Perform your upload action here
            this.uploadImage(this.selected_filter);
            this.closeImageUploadModal();
        },
        closeImageUploadModal() {
            this.selected_filter = null;
            this.selected_filter_name = null;
            // Hide the modal
            const modal = document.getElementById('imageUploadModal');
            modal.style.display = 'none';
        },
        openImageUploadModal(item) {
            this.selected_filter = item.id;
            this.selected_filter_name = item.name;
            this.current_item = item;
            // Show the modal
            const modal = document.getElementById('imageUploadModal');
            modal.style.display = 'block';
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
}
</script>

<style>
@media only screen and (max-width: 767px) {
 
    .new_anchor{
        display: none;
    }

    .advanced_setting{
        display: block;
    }
  }

.line {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    border-left: 1px solid;
    padding: 10px;
}

li {

    display: flex;
    align-items: flex-start;
    flex-direction: column;

}

/* button {
    padding: 0.5vw;
} */

li h6 {
    margin: 0;
}

ul {
    margin: 0;
    padding: 0 0 0 2vw;
}

.button {
    margin: .5vw;
}

input[type=text] {
    margin: 0;
    width: inherit;
    text-align: left;
    max-width: 150px;
}

.input-group {
    width: auto;
    border-left: 1px solid;
    padding: 10px;
}

#main {
    max-width: 80vw;
    margin: 0 auto;
    margin-top: 5vh;
}

/* #enable_list {
    background-color: black;
    color: white;
    
} */

.list-item {
    border-left: 1px solid;
    padding: 10px;

}

.left {

    text-align: left;
}

.space {
    justify-content: space-between;
}

.new_anchor {
    margin: .5vw;
    text-decoration: none;
    color: black;
}

.alert {
    margin: .5vw;
    text-decoration: none;
    color: red;
}

.buttons {
    font-size: 20px;
    width: 70%;
    margin: 0 auto;
}

/* .button,
.button:focus,
.button:hover {
    background-color: black;
    border-radius: 5px;
} */

/* .enable_list {
    background-color: black;
    color: white;
}

.disabled {
    background-color: white;
    color: black;
} */

/* .button, .button:hover, .button:focus {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    font: inherit;
    color: black;
    cursor: pointer;
    text-decoration: underline;
} */

/* .alert, .alert:hover, .alert:focus {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    font: inherit;
    cursor: pointer;
    text-decoration: underline;
    color: #cc4b37 !important;
    background-color: white !important;
} */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    width: 300px;
    margin: 100px auto;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.modal-head {
    color: white;
    background-color: black;
    width: 100%;
    padding: 20px;
}

.none{
    display: none;
}
</style>
