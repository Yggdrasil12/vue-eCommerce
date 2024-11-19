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
            <!-- Botones con íconos -->
            <router-link class="btn btn-outline-light mx-2" :to="`/details/${product.id}`">
              <i class="bi bi-eye"></i>
            </router-link>
            <router-link class="btn btn-outline-warning mx-2" :to="`/edit/${product.id}`">
              <i class="bi bi-pencil"></i>
            </router-link>
            <button class="btn btn-outline-success mx-2" @click="addToCart(product)">
              <i class="bi bi-cart-plus"></i>
              <!-- Ícono de carrito -->
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

  <!-- Modal para ver detalles -->
  <div
    class="modal fade"
    id="viewDetailsModal"
    tabindex="-1"
    aria-labelledby="viewDetailsModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="viewDetailsModalLabel">Detalles del Producto</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p><strong>Nombre:</strong> {{ selectedProduct?.name }}</p>
          <p><strong>Precio:</strong> ${{ selectedProduct?.price.toFixed(2) }}</p>
          <p><strong>Descripción:</strong> {{ selectedProduct?.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductTable',
  data() {
    return {
      products: [], // Productos que se llenarán desde la API
    }
  },
  mounted() {
    this.fetchProducts()
  },
  methods: {
    // Llamada a la API para obtener los productos
    async fetchProducts() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/products')
        const data = await response.json()
        this.products = data
      } catch (error) {
        console.error('Error al obtener los productos:', error)
      }
    },
    // Función para manejar el clic en el botón "Ver Detalles"
    viewDetails(productId) {
      this.$router.push({ name: 'product-details', params: { id: productId } })
    },
    // Función para manejar el clic en el botón "Editar"
    editProduct(productId) {
      this.$router.push({ name: 'edit-product', params: { id: productId } })
    },
    // Función para agregar al carrito
    addToCart(product) {
      this.$emit('add-to-cart', product)
      alert(`Producto ${product.name} agregado al carrito`)
    },
  },
}
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

table .btn-outline-light,
table .btn-outline-warning,
table .btn-outline-success {
  color: #fff;
  border-color: #fff;
  transition: background-color 0.3s ease;
}

table .btn-outline-light:hover {
  background-color: #8a2be2;
}

table .btn-outline-warning:hover {
  background-color: #ffcc00;
}

table .btn-outline-success:hover {
  background-color: #28a745;
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
