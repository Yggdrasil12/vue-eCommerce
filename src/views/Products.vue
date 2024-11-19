<template>
  <div class="products-table-container">
    <h2 class="text-center text-light mb-4">Lista de Productos</h2>
    <table class="table table-dark table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Precio</th>
          <th scope="col">Descripción</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="product.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ product.name }}</td>
          <td>${{ product.price.toFixed(2) }}</td>
          <td>{{ product.description }}</td>
          <td>
            <button class="btn btn-outline-light" @click="viewDetails(product.id)">
              Ver Detalles
            </button>
          </td>
        </tr>
        <!-- Si no hay productos, mostramos un mensaje en lugar de filas vacías -->
        <tr v-if="products.length === 0">
          <td colspan="5" class="text-center text-light">No hay productos disponibles.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ProductTable',
  data() {
    return {
      products: [], // Productos que se llenarán desde la API
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    // Llamada a la API para obtener los productos
    async fetchProducts() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/get/products');
        console.log(response);

        const data = await response.json();
        this.products = data;
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    },
    // Función para manejar el clic en el botón "Ver Detalles"
    viewDetails(productId) {
      this.$router.push({ name: 'product-details', params: { id: productId } });
    }
  }
};
</script>

<style scoped>
/* Contenedor principal */
.products-table-container {
  padding: 40px;
  background: linear-gradient(135deg, #6a0dad, #000); /* Fondo morado */
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  min-height: 100vh; /* Asegura que el contenedor ocupe toda la altura de la pantalla */
}

/* Estilo de los encabezados de la tabla */
table {
  width: 100%;
  border-collapse: collapse;
  background-color: #222; /* Fondo oscuro para la tabla */
}

th {
  color: #fff;
  font-weight: bold;
}

td {
  color: #ddd;
}

table .btn-outline-light {
  color: #fff;
  border-color: #fff;
  transition: background-color 0.3s ease;
}

table .btn-outline-light:hover {
  background-color: #8a2be2;
}

/* Estilo para las filas de la tabla */
table .table-dark tbody tr:hover {
  background-color: #444;
}

table td,
table th {
  padding: 12px 15px;
  text-align: center;
}

/* Estilo de la fila que aparece cuando no hay productos */
table tbody tr td {
  background-color: #222; /* Fondo oscuro en la fila de "No hay productos" */
}

</style>

