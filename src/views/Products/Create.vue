<template>
  <div
    class="add-product-container p-4"
    style="background: linear-gradient(135deg, #6a0dad, #000); min-height: 100vh"
  >
    <h2 class="text-light mb-4">Agregar Nuevo Producto</h2>

    <form @submit.prevent="submitNewProduct" class="text-light">
      <div class="mb-3">
        <label for="productName" class="form-label">Nombre</label>
        <input id="productName" v-model="product.name" type="text" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="productQuantity" class="form-label">Cantidad</label>
        <input
          id="productQuantity"
          v-model.number="product.quantity"
          type="number"
          min="0"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label for="productDescription" class="form-label">Descripción</label>
        <textarea
          id="productDescription"
          v-model="product.description"
          class="form-control"
          rows="3"
          required
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary me-2">Guardar</button>
      <button type="button" class="btn btn-secondary" @click="goBack">Cancelar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AddProduct',
  data() {
    return {
      product: {
        name: '',
        quantity: 0,
        description: '',
      },
    }
  },
  methods: {
    async submitNewProduct() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.product), // enviar el objeto product como JSON
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Error al crear el producto')
        }

        const data = await response.json()

        alert(`Producto "${data.product.name}" creado correctamente!`)

        // Redirigir a la lista de productos
        this.$router.push('/')
      } catch (error) {
        console.error('Error al crear el producto:', error.message)
        alert('Error al crear el producto: ' + error.message)
      }
    },
    goBack() {
      this.$router.back()
    },
  },
}
</script>

<style scoped>
input.form-control,
textarea.form-control {
  background-color: rgba(255, 255, 255, 0.1); /* Fondo oscuro/transparente */
  color: #eee; /* Texto claro */
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  transition: border-color 0.3s ease;
}

input.form-control:focus,
textarea.form-control:focus {
  background-color: rgba(255, 255, 255, 0.15);
  color: #fff;
  border-color: #9b59b6; /* Morado claro en focus */
  outline: none; /* Quita el outline por defecto */
  box-shadow: 0 0 8px rgba(155, 89, 182, 0.7);
}
</style>
