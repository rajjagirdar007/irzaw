<template>
  <div>
    <ul>
      <li v-for="item in nestedArray" :key="item.id">
        <label>
          <input type="checkbox" v-model="item.checked" @change="add(item)">
          {{ item.name }} <span v-show="item.subfilters.length" class="small">({{item.subfilters.length}})</span>
        </label>
        <ul v-show="item.checked && item.subfilters.length">
          <li v-for="subfilter in item.subfilters" :key="subfilter.id">
            <label>
              <input type="checkbox" v-model="subfilter.checked" @change="add(subfilter)">
              {{ subfilter.name }} <span v-show="subfilter.subfilters.length" class="small">({{subfilter.subfilters.length}})</span>
            </label>

        <ul v-show="subfilter.checked && subfilter.subfilters.length">
          <li v-for="subfilter1 in subfilter.subfilters" :key="subfilter1.id">
            <label>
              <input type="checkbox" v-model="subfilter1.checked" @change="add(subfilter1)">
              {{ subfilter1.name }}
            </label>
          </li>
        </ul>		

          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    nestedArray: {
      type: Array,
      required: true
    },
    selected: {
      type: Array,
      required: false
    }
  },
data() {

	return{

		list:[]
	}
},
  methods: {
    setSelectedState() {
      this.nestedArray.forEach(item => {
        if (this.selected.includes(item.name)) {
          item.checked = true;
		console.log('true');
        }
        item.subfilters.forEach(subfilter => {
          if (this.selected.includes(subfilter.name)) {
            subfilter.checked = true;
            item.checked = true;
		console.log('double true');
          }
	subfilter.subfilters.forEach(subfilter1 => {
		if (this.selected.includes(subfilter1.name)){

			subfilter1.checked = true;
			item.check = true;
			console.log('triple true');

		}


	});
        });
      });
    },
	add(item){
	if (item.checked){
		this.selected.push(item.name);

	} else{
		const index = this.selected.indexOf(item.name);
		    if (index !== -1) {
     			 this.selected.splice(index, 1);
    			}
	}
	console.log(this.selected)
	}
  },
  created() {
	//for(i=0; i < this.seperate.length; i++){
	//	this.list.push(this.seperate[i]);
	//}
  	    setTimeout(() => {
      		this.setSelectedState();
    		}, 500);
		console.log('created');
	}
};
</script>

<style scoped>
.small{
	font-size: x-small;
}
ul{
	margin-left: 1.5rem;
	display: block;
	text-align: left;
	
}
li{
	list-style-type: none;
}
input[type=checkbox]{
	all: revert !important;
}
</style>
