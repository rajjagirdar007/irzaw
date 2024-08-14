import { createRouter, createWebHistory } from 'vue-router'
import homeView from '../views/home.vue'
import loginView from '../views/loginView.vue'
import projectsPanel from '../views/projects/panel.vue'
import projectsPanel2 from '../views/projects/panel2.vue'
import updateProjectsPanel from '../views/projects/updated_projects.vue'
import marketingView from '../views/projects/marketing_panel.vue'
import addProjects from '../views/projects/addproj.vue'
import editProjects from '../views/projects/editproj.vue'
import tagMode from '../views/projects/tag_mode.vue'
import tagModeNew from '../views/projects/tag_mode_new.vue'
import peoplePanel from '../views/people/people.vue'
import editPeople from '../views/people/edit_people.vue'
import addPeople from '../views/people/add_people.vue'
import editLeader from '../views/people/edit_leader.vue'
import addLeader from '../views/people/add_leader.vue'
import viewTags from '../views/tags/view_tags.vue'
import editTag from '../views/tags/edit_tag.vue'
import expertiseView from '../views/expertise/expertise.vue'
import expertiseEdit from '../views/expertise/edit_expertise.vue'
import landing_panel from '../views/landing/landing_panel.vue'

const routes = [
  {
	path: '/home',
	name: 'home',
	component: loginView
  },
  {
	path: '/',
	name: 'login',
	component: homeView
  },
  {
	path: '/projects',
	name: 'projects',
	component: projectsPanel
  },
  {
        path: '/projects2',
        name: 'projects2',
        component: projectsPanel2
  },
  {
        path: '/updateprojects',
        name: 'projects_updated',
        component: updateProjectsPanel
  },
  {
	path: '/marketing_view/projects/panel',
	name: 'marketing_view',
	component: marketingView
  },
  {
	path: '/projects/add',
	name: 'add_projects',
	component: addProjects
  },
  {
	path: '/projects/edit/:select',
	name: 'edit_projects',
	component: editProjects
  },
  {
	path: '/projects/tag_mode_new',
	name: 'tag_mode',
	component: tagMode
  },
  {
        path: '/projects/tag_mode',
        name: 'tag_mode_new',
        component: tagModeNew
  },
  {
        path: '/people',
        name: 'people',
        component: peoplePanel
  },
  {
        path: '/people/add_leader',
        name: 'add_leader',
        component: addLeader
  },
  {
	path: '/people/edit_leader/:select',
        name: 'edit_leader',
        component: editLeader
  },	
  {
        path: '/people/add_people',
        name: 'add_people',
        component: addPeople
  },
  {
	  path: '/people/edit_people/:select',
        name: 'edit_people',
        component: editPeople
  },	
  {
	path: '/tags/view',
	name: 'view_tags',
	component: viewTags  
  },
  {
	path: '/tags/edit/:id',
	name: 'edit_tag',
	component: editTag
  },
  {
	path: '/expertise',
	name: 'expertise',
	component: expertiseView
  },
  {
	  path: '/expertise_details/:id/:tag_id',
	name: 'editExpertise',
	component: expertiseEdit
  },
/*
  {
	path: '/landing_panel',
	name: 'landing_panel',
	component: landing_panel
  }
*/
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
