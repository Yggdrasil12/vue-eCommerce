<template>
  <div class="edit-product-container">
    <h2 class="text-center text-light mb-4">Editar Producto</h2>
    <form @submit.prevent="updateProduct">
      <div class="mb-3">
        <label for="productName" class="form-label text-light">Nombre del Producto</label>
        <input
          type="text"
          id="productName"
          v-model="product.name"
          class="form-control"
          placeholder="Ingrese el nombre del producto"
          required
        />
      </div>
      <div class="mb-3">
        <label for="productPrice" class="form-label text-light">Precio</label>
        <input
          type="number"
          id="productPrice"
          v-model="product.price"
          class="form-control"
          placeholder="Ingrese el precio del producto"
          step="0.01"
          required
        />
      </div>
      <div class="mb-3">
        <label for="productDescription" class="form-label text-light">Descripción</label>
        <textarea
          id="productDescription"
          v-model="product.description"
          class="form-control"
          placeholder="Ingrese la descripción del producto"
          rows="3"
          required
        ></textarea>
      </div>
      <button type="submit" class="btn btn-success w-100">Guardar Cambios</button>
      <button type="button" class="btn btn-outline-light w-100 mt-2" @click="goBack">
        Cancelar
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'EditProductForm',
  data() {
    return {
      product: {
        id: null,
        name: '',
        price: 0,
        description: '',
      },
    }
  },
  mounted() {
    this.loadProduct()
  },
  methods: {
    // Carga los datos del producto desde la API o las props
    async loadProduct() {
      const productId = this.$route.params.id // Obtiene el ID de los parámetros de la ruta
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/products/${productId}/edit`)
        const data = await response.json()
        this.product = data
      } catch (error) {
        console.error('Error al cargar el producto:', error)
      }
    },
    // Envía la actualización del producto a la API
    async updateProduct() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/products/${this.product.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.product),
        })
        if (response.ok) {
          alert('Producto actualizado con éxito.')
          this.$router.push('/products') // Redirige de vuelta a la lista de productos
        } else {
          throw new Error('No se pudo actualizar el producto.')
        }
      } catch (error) {
        console.error('Error al actualizar el producto:', error)
        alert('Ocurrió un error al intentar actualizar el producto.')
      }
    },
    // Regresa a la lista de productos sin guardar
    goBack() {
      this.$router.push('/products')
    },
  },
}
</script>

<style scoped>
.edit-product-container {
  padding: 40px;
  background: linear-gradient(135deg, #6a0dad, #000); /* Fondo morado */
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  max-width: 600px;
  margin: 40px auto;
}

form .form-label {
  font-weight: bold;
}

form .btn-success {
  background-color: #28a745;
  border: none;
  transition: background-color 0.3s ease;
}

form .btn-success:hover {
  background-color: #218838;
}

form .btn-outline-light {
  border: 1px solid #fff;
  color: #fff;
}

form .btn-outline-light:hover {
  background-color: #444;
}
</style>
