<template>
    <div class="row">
      <div style="margin-top: 5%">
        <h2>{{ title }}</h2>
        <table>
          <thead>
            <tr>
              <th>Publisher</th>
              <th>Country</th>
              <th>Founded</th>
              <th>Genre</th>
              <!-- <th>Books</th> -->
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="publisher in publishers" :key="publisher.id">
              <td>{{ publisher.publisher }}</td>
              <td>{{ publisher.country }}</td>
              <td>{{ publisher.founded }}</td>
              <td>{{ publisher.genere }}</td>
              <!-- <td>
                <ul>
                  <li v-for="book in publisher.books" :key="book.book_id">
                    {{ book.title }}
                  </li>
                </ul>
              </td> -->
              <td>
                <router-link class="button" :to="'/publisher/show/' + publisher._id">Show</router-link>
                &nbsp;
                <router-link class="button" :to="'/publisher/edit/' + publisher._id">Edit</router-link>
                &nbsp;
                <a class="button" v-on:click="deletePublisher(publisher._id)">Erase</a>
              </td>
            </tr>
          </tbody>
        </table>
        <router-link class="button button-primary" to="/publisher/create">New Publisher</router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "PublisherIndex",
    data() {
      return {
        title: 'Publisher List',
        publishers: []  // Aquí se almacenarán los editores obtenidos del servidor
      };
    },
    mounted() {
      this.allPublishers();
    },
    methods: {
      // Obtener la lista de todos los editores
      allPublishers() {
        fetch(this.url + '/.netlify/functions/publisherFindAll', {
          headers: { 'Accept': 'application/json' }
        })
          .then((response) => response.json())
          .then((items) => {
            this.publishers = items;  // Asignar los datos de editores a la propiedad 'publishers'
          });
      },
      // Eliminar un editor por ID
      deletePublisher(id) {
        fetch(this.url + '/.netlify/functions/publisherDelete/' + id, {
          headers: { 'Content-Type': 'application/json' },
          method: 'DELETE'
        }).then(() => {
          this.allPublishers();  // Actualizar la lista de editores después de eliminar uno
        });
      }
    }
  };
  </script>
  