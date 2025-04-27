<template>
  <div class="edit-product-container">
    <h2 class="text-center text-light mb-5">Editar Producto</h2>
    <form @submit.prevent="updateProduct">
      <div class="mb-4">
        <label for="productName" class="form-label text-light">Nombre del Producto</label>
        <input
          type="text"
          id="productName"
          v-model="product.name"
          class="form-control form-control-lg"
          placeholder="Ingrese el nombre del producto"
          required
        />
      </div>
      <div class="mb-4">
        <label for="productPrice" class="form-label text-light">Precio</label>
        <input
          type="number"
          id="productPrice"
          v-model="product.price"
          class="form-control form-control-lg"
          placeholder="Ingrese el precio del producto"
          step="0.01"
          required
        />
      </div>
      <div class="mb-4">
        <label for="productDescription" class="form-label text-light">Descripción</label>
        <textarea
          id="productDescription"
          v-model="product.description"
          class="form-control form-control-lg"
          placeholder="Ingrese la descripción del producto"
          rows="5"
          required
        ></textarea>
      </div>
      <div class="d-flex justify-content-between">
        <button type="submit" class="btn btn-success w-48">Guardar Cambios</button>
        <button type="button" class="btn btn-outline-light w-48" @click="goBack">Cancelar</button>
      </div>
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
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  max-width: 650px;
  margin: 50px auto;
  font-family: 'Arial', sans-serif;
}

h2 {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 700;
  font-size: 1.8rem;
}

.form-label {
  font-weight: 600;
}

.form-control {
  border-radius: 10px;
  padding: 1rem;
  font-size: 1.1rem;
}

.form-control-lg {
  height: 50px;
}

textarea.form-control-lg {
  resize: vertical;
}

.form-control:focus {
  box-shadow: 0 0 8px rgba(105, 0, 255, 0.8);
  border-color: #6a0dad;
}

.btn-success {
  background-color: #28a745;
  border: none;
  font-size: 1.2rem;
  transition: all 0.3s ease-in-out;
}

.btn-success:hover {
  background-color: #218838;
}

.btn-outline-light {
  border: 2px solid #fff;
  color: #fff;
  font-size: 1.2rem;
  transition: all 0.3s ease-in-out;
}

.btn-outline-light:hover {
  background-color: #444;
}

.d-flex {
  gap: 10px;
}

.w-48 {
  width: 48%;
}

@media (max-width: 768px) {
  .edit-product-container {
    padding: 30px;
    max-width: 100%;
  }

  h2 {
    font-size: 1.5rem;
  }

  .btn-success,
  .btn-outline-light {
    font-size: 1rem;
  }
}
</style>
