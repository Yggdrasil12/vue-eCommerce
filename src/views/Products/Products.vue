<template>
  <div class="products-table-container">
    <h2 class="text-center text-light mb-4">Lista de Productos</h2>
    <table class="table table-dark table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Cantidad</th>
          <!-- Cambiado -->
          <th scope="col">Descripción</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="product.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ product.name }}</td>
          <td>{{ product.quantity }}</td>
          <!-- Cambiado -->
          <td>{{ product.description }}</td>
          <td>
            <!-- Botones con íconos -->
            <button class="btn btn-outline-light mx-2" @click="viewDetails(product)">
              <i class="bi bi-eye"></i>
            </button>
            <router-link :to="`/product/detail/${product.id}`" class="btn btn-outline-warning mx-2">
              <i class="bi bi-pencil"></i>
            </router-link>
          </td>
        </tr>
        <tr v-if="products.length === 0">
          <td colspan="5" class="text-center text-light">No hay productos disponibles.</td>
        </tr>
      </tbody>
    </table>

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
            <p><strong>Cantidad:</strong> {{ selectedProduct?.quantity }}</p>
            <!-- Cambiado -->
            <p><strong>Descripción:</strong> {{ selectedProduct?.description }}</p>
          </div>
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
      products: [],
      selectedProduct: null,
    }
  },
  mounted() {
    this.fetchProducts()
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/products')
        const data = await response.json()
        this.products = data
      } catch (error) {
        console.error('Error al obtener los productos:', error)
      }
    },
    viewDetails(product) {
      this.selectedProduct = product
      const modal = new bootstrap.Modal(document.getElementById('viewDetailsModal'))
      modal.show()
    },
    editProduct(product) {
      this.$router.push({ name: 'edit-product', params: { id: product.id } })
    },
  },
}
</script>

<style scoped>
.products-table-container {
  padding: 40px;
  background: linear-gradient(135deg, #6a0dad, #000);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  min-height: 100vh;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #222;
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

table .table-dark tbody tr:hover {
  background-color: #444;
}

table td,
table th {
  padding: 12px 15px;
  text-align: center;
}

table tbody tr td {
  background-color: #222;
}
</style>
