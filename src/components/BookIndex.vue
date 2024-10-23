<!-- BookIndex.vue -->
<template>
  <div class="row">
   <div style="margin-top: 5%">
     <h2>{{title}}</h2>
     <table><thead>
       <tr>
         <th>Title</th>
        <th>Autor</th>
        <th>Publisher</th>
        <th>Edition</th>
        <th class="text-center">Actions</th>
	   </tr>
       </thead><tbody>
       <tr v-for='book in books'>
       <td>{{book.title}}</td>
       <td>{{book.author}}</td>
       <td>{{book.publisher}}</td>
       <td>{{book.edition}}</td>
       <td>
       <router-link class="button"
         :to="'/book/show/'+book._id">Show</router-link>
       &nbsp;
       <router-link class="button"
         :to="'/book/edit/'+book._id">Edit</router-link>
       &nbsp;
       <a class="button"
         v-on:click="deleteBook(book._id)">Erase</a>
       </td>
       </tr></tbody>
     </table>
     <router-link class="button button-primary" 
       to="/book/create">New</router-link>
   </div>
  </div>
</template>

<script>
	
export default {
  name: "Book Index",
  data() {
    return {
      title: 'Book List',
      books: []
    };
  },
  mounted() {
    this.allBooks()
  },
  methods: {
    allBooks() {
      fetch(this.url+'/.netlify/functions/bookFindAll',
        { headers: {'Accept': 'application/json'}})
        .then((response) => response.json())
        .then((items) => {
          this.books = items;
        })
     },
     deleteBook(id) {
       fetch(this.url+'/.netlify/functions/bookDelete/'+id,
         { headers: {'Content-Type': 'application/json'},
           method: 'DELETE'})
          .then((items) => {
            this.allBooks();
          }
        )
     }
  }
};
</script>