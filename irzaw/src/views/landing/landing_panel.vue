<template>
	<div class="header">
		<div class="header-main">
			<p>Landing Panel</p>
		</div>
		<div class="header-minor">
			<button @click="open_add_slide" id="add_slide_button">Add Slide</button>
		</div>
	</div>
	<div class="container">
		<div v-for="(slide, slide_index) in slide_data" :key="slide_index" id="slide_container">
			<div class="slide-div">
				<p>Slide {{ slide.slide_no }}</p>
				<div v-for="(image, image_index) in slide.images" :key="image_index" class="image-div">
					<div :class="image_class_name(image.side)">
						<img :srcset="get_srcset(image.id)" :sizes="get_sizes()" :id="img_id(image.id)">
					</div>
				</div>
			</div>
		</div>

		<div v-if="add_slide_visible" id="add_slide_modal" class="modal">
			<div class="modal_content">
				<span class="close" id="closeModalBtn">&times;</span>
				<p>Add slide</p>
				<label for="left_image">Left Image</label>
				<input type="file" id="left_image" name="left">
				<br>
				<label for="right_image">Right Image</label>
				<input type="file" id="right_image" name="right">
				<br>
				<input type="text" placeholder="Slide Color Hex Code" id="add_slide_color">
				<br>
			<!--	<button onclick="add_slide()">Add</button>-->
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	name: 'landing_page',
	data() {
		return {
			add_slide_visible: false,
			slide_data: null,
		}
	},
	methods: {
		open_add_slide() {
			this.add_slide_visible = !this.add_slide_visible;
		},
		get_slide_data() {
			axios.get('https://cote.nyc/panel/get_slide_data')
			.then((response) => {
				console.log(response);
				this.slide_data = response.data;
			})
			.catch((error) => {
				console.error(`Error getting data: ${error}`);
			})
		},
		image_class_name(side) {
			return `image-${side}`;
		},
		get_srcset(id) {
			let widths = [350, 430, 500, 650, 800, 1100];
			let srcset_strings = [];
			widths.forEach((width) => {
				let random_number = Math.random();
				let src = `/images/${id}/${id}_${width}?refresh=${random_number} ${width}w`;
				srcset_strings.push(src);
			})
			return srcset_strings.join(',');
		},
		get_sizes() {

		},
		img_id(id) {
			return `img_${id}`;
		}
	},
	mounted() {
		this.get_slide_data();
	}
}
/*
const add_slide_button = document.getElementById('add_slide_button');
const close_modal_button = document.getElementById('closeModalBtn');
const add_slide_modal = document.getElementById('add_slide_modal');

async function post(url = '', data = {}) {
	const response = await fetch(url, {
		method: 'POST', 
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	return response.json();
}

function add_slide() {
	let file_inputs = document.querySelectorAll('input[type="file"]');
	file_inputs.forEach((file_input) => {
		const form_data = new FormData();
		form_data.append('file', file_input.files[0]);
		form_data.append('side', file_input.name);
		form_data.append('slide_color', document.querySelector("#add_slide_color").value);
		
		fetch('https://cote.nyc/panel/create_slide', { 
			method: 'POST',
			body: form_data
		})
		.then((response) => response.json())
		.then((data) => {
			get_slide_data();
		})
	})
}

function get_srcset(id) {
	let widths = [350, 430, 500, 650, 800, 1100];
	let srcset_strings = [];
	widths.forEach((width) => {
		let random_number = Math.random();
		let src = `/images/${id}/${id}_${width}?refresh=${random_number} ${width}w`;
		srcset_strings.push(src);
	})
	return srcset_strings;
}

function get_sizes() {
	let widths = [350, 430, 500, 650, 800, 1100];
	let sizes = [];
	widths.forEach((width) => {
		let str = `(max-width: ${width}px) ${width - 40}px`;
		sizes.push(str);
	})
	return sizes;
}

function update_color(slide_no, element) {
	post('https://cote.nyc/panel/update_color', { slide_no: slide_no, value: element.value })
	.then((data) => {
		if (data.success) {
			element.style.backgroundColor = data.color;
		}	
	})
}

function replace_img(id) {
	let file_input = document.querySelector(`#id_${id}`);
	let form_data = new FormData();
	form_data.append('file', file_input.files[0]);
	form_data.append('id', id);
	fetch('https://cote.nyc/panel/replace_image', {
		method: 'POST',
		body: form_data
	})
	.then((response) => response.json())
	.then((data) => {
		get_slide_data();
	})
}

function get_slide_data() {
	let slide_container = document.querySelector("#slide_container");
	fetch('https://cote.nyc/panel/get_slide_data')
	.then((response) => response.json())
	.then((data) => {
		slide_container.innerHTML = '';
		let slide_div = document.createElement('div');
		slide_div.classList.add('slide-div');
		data.data.forEach((slide) => {
			let p = document.createElement('p');
			p.textContent = `Slide ${slide.slide_no}`;

			let slide_images = document.createElement('div');
			slide_images.classList.add('image-div');

			slide.images.forEach((image) => {
				let indiv_img_div = document.createElement('div');
				let img = document.createElement('img');
				let replace_img_div = document.createElement('div');

				let file_input = document.createElement('input');
				let replace_btn = document.createElement('button');
				file_input.type = 'file';
				file_input.id = `id_${image.id}`;
				replace_btn.textContent = 'Upload';
				replace_btn.addEventListener('click', (e) => { replace_img(image.id) });
				replace_img_div.appendChild(file_input);
				replace_img_div.appendChild(replace_btn);

				img.setAttribute('srcset', get_srcset(image.id).join(', '));
				img.setAttribute('sizes', get_sizes().join(', '));
				img.id = `img_${image.id}`;

				indiv_img_div.classList.add(`image-${image.side}`);
				indiv_img_div.appendChild(img);
				indiv_img_div.appendChild(replace_img_div);
				slide_images.appendChild(indiv_img_div);
			})

			let slide_color_input = document.createElement('input');
			slide_color_input.type = 'text';
			slide_color_input.value = slide.slide_color;
			slide_color_input.style.backgroundColor = slide.slide_color;
			slide_color_input.addEventListener('change', (e) => { update_color(slide.slide_no, slide_color_input) });

			slide_div.appendChild(p);
			slide_div.appendChild(slide_images);
			slide_div.appendChild(slide_color_input);
		})
		slide_container.appendChild(slide_div);
	})
}

function get_data() {
	fetch('https://cote.nyc/panel/get_slide_data')
	.then((response) => response.json())
	.then((data) => {
		console.log(data);
	})
}

add_slide_button.addEventListener('click', function () {
	add_slide_modal.style.display = 'block';
});

close_modal_button.addEventListener('click', function () {
	add_slide_modal.style.display = 'none';
});

window.onload = () => {
	get_slide_data();
}
*/
</script>

<style scoped>

@media only screen and (max-width: 400px) {
	.image-div {
		flex-direction: column !important;
	}
}
html, body {
	height: 100%;
}
body {
	margin: 0;
	font-family: 'Arial';
}

.header {
	display: flex;
	padding: 10px 10px;
	background-color: #bcbdc2;
}
.header .header-main {
	width: 40%;
	display: flex;
	justify-content: flex-start;
	align-content: center;
}
.header .header-main p {
	font-size: 20px;
	font-weight: bold;
}
.header .header-minor button {
	color: black;
	background-color: white;
	border-radius: 5px;
	border: none;
	padding: 0px 5px;
	font-family: 'Yantramanav-Regular';
	font-size: 20px;
}
.header .header-minor {
	gap: 10px;
	width: 60%;
	display: flex;
	justify-content: flex-end;
	font-size: 20px;
}
.header p {
	margin: 0px;
}
.header a {
	text-decoration: none;
	color: black;
	cursor: pointer;
}
.container {
	margin: 0px 10px;
}
.modal {
  /*display: none;*/
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 10px;
  z-index: 1;
}

.modal-content {
  width: 300px;
  text-align: center;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
}
.slide-div {
	margin: 10px 0;
}
.slide-div p {
	margin: 10px 0 0 0;
}
.image-div {
	display: flex;
	flex-direction: row;
	gap: 10px;
}
.image-div img {
	width: 150px;
}
.image-div .image-left {
	order: -1;
}
</style>
