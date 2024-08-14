<template>
<main_header></main_header>
<div class="form">
    <div class="flex">
        <div class="left-items">
            <h2>Editing {{ form.name }}</h2>
        </div>
        <div class="right-items">
            <button class="top-button">
                <div>
                    <router-link to="/tags/view">Back to Tags</router-link>
                </div>
            </button>
        </div>
    </div>

    <div>
        <label>Tag Name</label>
        <input class="form-control" v-model="form.name" type="text" required>
    </div>

    <div>
        <label>Active</label>
        <input type="checkbox" v-model="form.active" :true-value="1" :false-value="0">
    </div>

    <div>
        <label>Image</label>
        <img :src="this.hostname + '/images_api/images/expertise/tags/' + this.form.images">
    </div> 
        
    <div>
        <label>Upload Image for {{this.form.name}}</label>
        <input type="file" @change="uploadImage(this.form.id)" ref="fileInput" accept="image/*" :key="this.selected_filter">
    </div>

    <button @click="submit()" class="label save" id="btn">Save Changes</button>
</div>
</template>

<script>
import axios from 'axios';
import main_header from '@/components/header/main_header.vue';

export default {
    data() {
        return {
            form: {
                id: null,
                name: "",
                level: 1,
                parent_id: null,
                images: '',
                active: 1,
            },
            tags: [], // List of available tags for parent selection
            hostname: 'https://irzaw.com',
        };
    },
    components: {
        main_header
    },
    created() {
        this.loadTags();
        this.loadTagData();
        console.log(this.data);
    },
    methods: {
        loadTags() {
            axios.get(this.hostname + '/get_tags').then((response) => {
                this.tags = response.data;
            });
        },
        loadTagData() {
            let self = this;
            axios.get(this.hostname + '/get_tags/' + this.$route.params.id).then(function (response) {
                self.form.id = response.data.id;
                self.form.name = response.data.name;
                self.form.level = response.data.level;
                self.form.images = response.data.images;
                self.form.parent_id = response.data.parent_id;
                self.form.active = response.data.active;
            });
        },
        submit() {
            axios.post(this.hostname + "/edittag/" + this.$route.params.id, this.form)
                .then(() => {
                    console.log("Tag has been updated");
                    this.loadTagData();
                });
        },
        async uploadImage() {
            var imageData = new FormData();
            const image = this.$refs.fileInput.files[0];
            imageData.append('image', image); 
            this.form.images = image.name;
            console.log(imageData);
            try {
                const response = await axios.post(
                    this.hostname + "/tag_upload",
                    imageData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        },
                    }
                )
                this.submit();

            } catch (error) {
                console.error(error);
            }

            // try {
            //     const response = axios.post(this.hostname + '/tag_upload', imageData, {
            //         headers: {
            //             'Content-Type': 'multipart/form-data'
            //         }
            //     });

            //     console.log(response.data);
            // } catch (error) {
            //     console.error(error);
            // }

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
