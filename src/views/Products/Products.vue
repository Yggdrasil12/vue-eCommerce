<template>
  <div class="products-table-container">
    <h2 class="text-center text-light mb-4">Lista de Productos</h2>

    <!-- Buscador -->
    <div class="mb-4">
      <input
        type="text"
        class="form-control custom-search"
        placeholder="Buscar por nombre..."
        v-model="searchTerm"
      />
    </div>

    <!-- Botón para agregar productos -->
    <div class="d-flex justify-content-end mb-3">
      <button class="btn btn-success" @click="$router.push('/product/create')">
        <i class="bi bi-plus-circle"></i> Agregar Producto
      </button>
    </div>

    <!-- Alerta de stock bajo -->
    <div v-if="lowStockAlert" class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>Advertencia!</strong> Algunos productos tienen stock bajo (4 o menos unidades).
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        @click="lowStockAlert = false"
      ></button>
    </div>

    <table class="table table-dark table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Cantidad</th>
          <th>Descripción</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in filteredProducts" :key="product.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ product.name }}</td>
          <td>
            <span :class="{ 'text-danger': product.quantity <= 4 }">
              {{ product.quantity }}
            </span>
          </td>
          <td>{{ product.description }}</td>
          <td>{{ product.state }}</td>
          <td>
            <button class="btn btn-outline-light mx-2" @click="viewDetails(product)">
              <i class="bi bi-eye"></i>
            </button>
            <router-link :to="`/product/detail/${product.id}`" class="btn btn-outline-warning mx-2">
              <i class="bi bi-pencil"></i>
            </router-link>
            <button class="btn btn-outline-danger mx-2" @click="deleteProduct(product)">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
        <tr v-if="filteredProducts.length === 0">
          <td colspan="5" class="text-center text-light">No hay productos coincidentes.</td>
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
      lowStockAlert: false,
      searchTerm: '',
    }
  },
  mounted() {
    this.fetchProducts()
  },
  computed: {
    filteredProducts() {
      const term = this.searchTerm.trim().toLowerCase()
      if (!term) return this.products
      return this.products.filter((product) => product.name.toLowerCase().includes(term))
    },
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/products')
        const data = await response.json()
        this.products = data

        this.lowStockAlert = this.products.some((product) => product.quantity <= 4)
      } catch (error) {
        console.error('Error al obtener los productos:', error)
      }
    },
    viewDetails(product) {
      this.selectedProduct = product
      const modal = new bootstrap.Modal(document.getElementById('viewDetailsModal'))
      modal.show()
    },
    async deleteProduct(product) {
      try {
        const confirmed = confirm(`¿Estás seguro de que deseas eliminar "${product.name}"?`)
        if (!confirmed) return

        const response = await fetch(`http://127.0.0.1:8000/api/products/${product.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('No se pudo eliminar el producto.')
        }

        this.products = this.products.filter((p) => p.id !== product.id)

        this.lowStockAlert = this.products.some((product) => product.quantity <= 4)

        alert('Producto eliminado correctamente.')
      } catch (error) {
        console.error('Error al eliminar el producto:', error)
        alert('Hubo un error al eliminar el producto.')
      }
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

.custom-search {
  background-color: #1c1c1c;
  color: #fff;
  border: 1px solid #8a2be2;
  border-radius: 8px;
  padding: 10px 15px;
  box-shadow: 0 0 8px rgba(138, 43, 226, 0.3);
}

.custom-search::placeholder {
  color: #ccc;
}

.custom-search:focus {
  outline: none;
  border-color: #c084fc;
  box-shadow: 0 0 12px rgba(192, 132, 252, 0.5);
}

.d-flex.justify-content-end {
  /* margen extra opcional para separar botón */
  margin-bottom: 1rem;
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
