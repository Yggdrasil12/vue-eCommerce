<template>
  <div class="cart-container">
    <h2 class="text-center text-light mb-4">Tu Carrito de Compras</h2>

    <!-- Si el carrito está vacío, muestra un mensaje -->
    <div v-if="cartItems.length === 0" class="alert alert-warning text-center" role="alert">
      ¡Tu carrito está vacío! Agrega productos para comenzar a comprar.
    </div>

    <!-- Tabla de productos en el carrito -->
    <table v-else class="table table-dark table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Precio</th>
          <th scope="col">Total</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cartItems" :key="item.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ item.name }}</td>
          <td>
            <input type="number" v-model="item.quantity" min="1" class="form-control" @change="updateCart(item)">
          </td>
          <td>${{ item.price.toFixed(2) }}</td>
          <td>${{ (item.price * item.quantity).toFixed(2) }}</td>
          <td>
            <button class="btn btn-outline-danger" @click="removeFromCart(item)">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Total del carrito -->
    <div v-if="cartItems.length > 0" class="text-light text-end mb-4">
      <h4>Total: ${{ totalAmount.toFixed(2) }}</h4>
      <button class="btn btn-primary" @click="checkout">Proceder al Pago</button>
      <button class="btn btn-outline-danger" @click="clearCart">Vaciar Carrito</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  data() {
    return {
      cartItems: [], // Array para almacenar los productos del carrito
    };
  },
  computed: {
    totalAmount() {
      // Calcula el total del carrito sumando los productos y sus cantidades
      return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },
  methods: {
    // Función para actualizar la cantidad de un producto en el carrito
    updateCart(item) {
      // Aquí podrías agregar lógica adicional para guardar la cantidad en una base de datos o localStorage
    },

    // Función para eliminar un producto del carrito
    removeFromCart(item) {
      const index = this.cartItems.indexOf(item);
      if (index > -1) {
        this.cartItems.splice(index, 1);
      }
    },

    // Función para vaciar el carrito
    clearCart() {
      this.cartItems = [];
    },

    // Función para proceder al pago (aquí solo simula la acción)
    checkout() {
      alert('Procediendo al pago...');
      // Aquí agregarías la lógica para realizar el pago (por ejemplo, redirigir a una página de pago)
    },
  },

  // Simulación de agregar productos al carrito
  mounted() {
    // Ejemplo de productos que se pueden agregar al carrito
    this.cartItems = [
      { id: 1, name: 'Producto 1', price: 20.0, quantity: 1 },
      { id: 2, name: 'Producto 2', price: 15.5, quantity: 2 },
    ];
  },
};
</script>

<style scoped>
.cart-container {
  padding: 40px;
  background: linear-gradient(135deg, #6a0dad, #000); /* Fondo morado */
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  min-height: 100vh;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #222; /* Fondo oscuro para la tabla */
}

th, td {
  color: #fff;
}

h4 {
  color: #fff;
  font-weight: bold;
}

table .btn-outline-light,
table .btn-outline-danger {
  color: #fff;
  border-color: #fff;
}

table .btn-outline-light:hover,
table .btn-outline-danger:hover {
  background-color: #8a2be2;
}

button {
  margin-right: 10px;
}

.alert-warning {
  background-color: #8a2be2;
  color: #fff;
}

</style>
