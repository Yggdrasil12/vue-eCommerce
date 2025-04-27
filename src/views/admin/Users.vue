<template>
  <div class="users-container">
    <div class="users-box">
      <h2 class="text-center text-light">Lista de Usuarios</h2>

      <!-- Botón de Agregar Usuario -->
      <div class="text-right mb-3">
        <button @click="addUser" class="btn btn-success btn-sm">
          <i class="bi bi-person-plus"></i> Agregar Usuario
        </button>
      </div>

      <!-- Tabla de usuarios -->
      <table class="table table-striped table-dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>{{ user.state === 1 ? 'Activo' : 'Inactivo' }}</td>
            <td>
              <button @click="editUser(user)" class="btn btn-primary btn-sm">
                <i class="bi bi-pencil-square"></i>
                <!-- Icono de editar -->
              </button>
              <button @click="viewUser(user)" class="btn btn-info btn-sm">
                <i class="bi bi-eye"></i>
                <!-- Icono de ver -->
              </button>
              <button @click="deleteUser(user.id)" class="btn btn-danger btn-sm">
                <i class="bi bi-trash"></i>
                <!-- Icono de eliminar -->
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UsersList',
  data() {
    return {
      users: [], // Lista de usuarios
    }
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/users')

        if (!response.ok) {
          throw new Error('No se pudieron obtener los usuarios')
        }

        const data = await response.json()
        this.users = data // Asegúrate de que el servidor esté enviando un array de usuarios
      } catch (error) {
        console.error(error)
        alert(error.message)
      }
    },

    addUser() {
      // Redirigir al formulario de agregar usuario (ajusta la ruta según sea necesario)
      this.$router.push({ name: 'addUser' })
    },

    editUser(user) {
      // Redirigir al formulario de edición (ajusta la ruta según sea necesario)
      this.$router.push({ name: 'editUser', params: { userId: user.id } })
    },

    viewUser(user) {
      // Redirigir a la página de detalles del usuario
      this.$router.push({ name: 'viewUser', params: { userId: user.id } })
    },

    async deleteUser(userId) {
      if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          })

          if (!response.ok) {
            throw new Error('Error al eliminar el usuario')
          }

          // Eliminar el usuario de la lista local
          this.users = this.users.filter((user) => user.id !== userId)
          alert('Usuario eliminado exitosamente')
        } catch (error) {
          console.error(error)
          alert(error.message)
        }
      }
    },
  },
  mounted() {
    this.fetchUsers() // Obtener los usuarios cuando se monta la vista
  },
}
</script>

<style scoped>
/* Fondo de la página */
.users-container {
  height: 100vh;
  background: linear-gradient(135deg, #6a0dad, #000);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Arial', sans-serif;
}

/* Caja de lista de usuarios */
.users-box {
  background-color: rgba(0, 0, 0, 0.7);
  padding: 40px;
  border-radius: 10px;
  width: 100%;
  max-width: 900px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

h2 {
  color: #fff;
  font-weight: bold;
  margin-bottom: 30px;
}

/* Estilo para el botón de agregar usuario */
.text-right {
  text-align: right;
}

.table {
  width: 100%;
  color: #fff;
}

.table th,
.table td {
  text-align: center;
  padding: 12px;
  border: 1px solid #444;
}

.table th {
  background-color: #444;
}

.table tbody tr:nth-child(odd) {
  background-color: #333;
}

.table tbody tr:nth-child(even) {
  background-color: #222;
}

.table-hover tbody tr:hover {
  background-color: #555;
}

button {
  margin: 5px;
  border-radius: 50px;
  padding: 6px 12px;
  transition: background-color 0.3s ease;
}

button:hover {
  opacity: 0.8;
}

.btn-sm {
  font-size: 14px;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-info {
  background-color: #17a2b8;
  color: white;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-sm:hover {
  opacity: 0.7;
}
</style>
