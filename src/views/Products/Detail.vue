<template>
  <div class="view-product-container">
    <h2 class="text-center text-light mb-4">Detalles del Producto</h2>
    <div class="product-details">
      <div class="product-image">
        <img
          :src="product.image_url"
          alt="Imagen del producto"
          class="img-fluid rounded shadow-lg"
        />
      </div>
      <div class="product-info">
        <h3 class="text-light">{{ product.name }}</h3>
        <p class="text-light">Descripción:</p>
        <p class="text-light">{{ product.description }}</p>
        <div class="product-price">
          <span class="text-light">Precio:</span>
          <strong class="text-success"> ${{ product.price | currency }}</strong>
        </div>
      </div>
    </div>
    <div class="actions">
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
        price: 0,
        description: '',
        imageUrl: '', // Asumimos que hay una imagen del producto
      },
    }
  },
  mounted() {
    this.loadProduct()
  },
  methods: {
    async loadProduct() {
      const productId = this.$route.params.id // Obtiene el ID del producto desde los parámetros de la ruta
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/products/${productId}`)
        const data = await response.json()
        this.product = data
      } catch (error) {
        console.error('Error al cargar el producto:', error)
      }
    },
    goBack() {
      this.$router.push('/products')
    },
  },
  filters: {
    currency(value) {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
      }).format(value)
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

.product-info p {
  font-size: 1.1rem;
  line-height: 1.5;
}

.product-price {
  font-size: 1.3rem;
  margin-top: 20px;
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

  .product-info p {
    font-size: 1rem;
  }

  .product-price {
    font-size: 1.2rem;
  }

  .btn-purple {
    font-size: 1rem;
  }
}
</style>
