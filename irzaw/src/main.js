import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import FoundationCss from 'foundation-sites/dist/css/foundation.min.css'
import FoundationJs from 'foundation-sites'

// Create the root Vue app instance
const app = createApp(App);

// Use Vue Router
app.use(router);

// Use Vuex for state management (if applicable)
app.use(store);

// Use foundations
app.use(FoundationCss);
app.use(FoundationJs);

// Mount the root Vue instance to the element with id 'app'
app.mount('#app');

