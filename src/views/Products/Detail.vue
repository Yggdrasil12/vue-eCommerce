<template>
  <div class="view-product-container">
    <h2 class="text-center text-light mb-4">Detalles del Producto</h2>

    <div class="product-details">
      <div class="product-info">
        <div v-if="!isEditing">
          <h3 class="text-light">Nombre: {{ product.name }}</h3>

          <div class="info-row">
            <span class="text-light fw-bold">Descripción:</span>
            <span class="text-light">{{ product.description }}</span>
          </div>

          <div class="info-row">
            <span class="text-light fw-bold">Cantidad:</span>
            <strong class="text-success">{{ product.quantity }}</strong>
          </div>
        </div>

        <div v-else>
          <div class="mb-3">
            <label class="form-label text-light">Nombre del Producto</label>
            <input v-model="editableProduct.name" type="text" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label text-light">Descripción</label>
            <textarea
              v-model="editableProduct.description"
              class="form-control"
              rows="3"
            ></textarea>
          </div>
          <div class="mb-3">
            <label class="form-label text-light">Cantidad</label>
            <input
              v-model.number="editableProduct.quantity"
              type="number"
              min="0"
              class="form-control"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="actions">
      <button v-if="!isEditing" class="btn btn-outline-warning w-100 mt-3" @click="startEditing">
        Editar Producto
      </button>

      <div v-else class="d-flex flex-column gap-2 mt-3">
        <button class="btn btn-success w-100" @click="saveChanges">Guardar Cambios</button>
        <button class="btn btn-secondary w-100" @click="cancelEditing">Cancelar</button>
      </div>

      <button class="btn btn-purple w-100 mt-3" @click="goBack">Regresar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewProductDetails',
  data() {
    return {
      product: {
        id: null,
        name: '',
        quantity: 0,
        description: '',
      },
      isEditing: false,
      editableProduct: {},
    }
  },
  mounted() {
    this.loadProduct()
  },
  methods: {
    async loadProduct() {
      const productId = this.$route.params.id
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/products/${productId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })

        const data = await response.json()
        this.product = data
      } catch (error) {
        console.error('Error al cargar el producto:', error)
      }
    },
    startEditing() {
      this.isEditing = true
      this.editableProduct = { ...this.product }
    },
    cancelEditing() {
      this.isEditing = false
    },
    async saveChanges() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/products/${this.product.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(this.editableProduct),
        })

        if (!response.ok) {
          throw new Error('Error al actualizar el producto')
        }

        const updatedProduct = await response.json()
        this.product = updatedProduct
        this.isEditing = false
        alert('Producto actualizado correctamente.')

        // Redirigir a la ruta /products después de guardar los cambios
        this.$router.push('/products')
      } catch (error) {
        console.error('Error al guardar los cambios:', error)
        alert('Hubo un error al actualizar el producto.')
      }
    },
    goBack() {
      this.$router.push('/products')
    },
  },
}
</script>

<style scoped>
.view-product-container {
  padding: 40px;
  background: #000; /* Fondo negro */
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  max-width: 800px;
  margin: 50px auto;
  font-family: 'Arial', sans-serif;
}

h2 {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 700;
  font-size: 1.8rem;
}

.product-details {
  display: flex;
  gap: 30px;
  margin-top: 20px;
}

.product-image img {
  max-width: 100%;
  height: auto;
}

.product-info {
  color: #fff;
}

.product-info h3 {
  font-size: 1.6rem;
  font-weight: bold;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
  flex-wrap: wrap;
}

.actions {
  margin-top: 30px;
}

.btn-purple {
  background-color: #6a0dad; /* Morado */
  border: none;
  color: white;
  font-size: 1.2rem;
  transition: background-color 0.3s ease;
}

.btn-purple:hover {
  background-color: #550a97; /* Morado más oscuro al pasar el cursor */
}

@media (max-width: 768px) {
  .view-product-container {
    padding: 30px;
    max-width: 100%;
  }

  h2 {
    font-size: 1.5rem;
  }

  .product-details {
    flex-direction: column;
    align-items: center;
  }

  .product-info h3 {
    font-size: 1.4rem;
  }

  .info-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .btn-purple {
    font-size: 1rem;
  }
}
</style>
