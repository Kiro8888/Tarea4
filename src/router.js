import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import BookIndex from "./components/BookIndex.vue";
import BookDetails from "./components/BookDetails.vue";

const routes = [
  { path: "/", component: Home },
	
  { path: "/book", component: BookIndex },
  { path: "/book/show/:id", 
    component: BookDetails, props: {show:true} },
  { path: "/book/edit/:id", 
    component: BookDetails, props: {edit:true} },
  { path: "/book/create", 
    component: BookDetails, props: {create:true} },
  { path: "/book/delete/:id", 
    component: BookDetails, props: {delete:true} },
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;