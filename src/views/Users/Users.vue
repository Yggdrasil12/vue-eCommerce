<template>
  <div class="users-table-container">
    <h2 class="text-center text-white mb-4">Lista de Usuarios</h2>

    <table class="table custom-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Rol</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.id">
          <td>{{ index + 1 }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
        </tr>
        <tr v-if="users.length === 0">
          <td colspan="4" class="text-center text-white">No hay usuarios disponibles.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'UserTable',
  data() {
    return {
      users: [],
    }
  },
  mounted() {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/users')
        const data = await response.json()
        this.users = data
      } catch (error) {
        console.error('Error al obtener los usuarios:', error)
      }
    },
  },
}
</script>

<style scoped>
.users-table-container {
  padding: 40px;
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
  min-height: 100vh;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  border-radius: 12px;
}

.custom-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.custom-table th,
.custom-table td {
  padding: 14px 20px;
  text-align: center;
  color: #333;
  border-bottom: 1px solid #e0e0e0;
}

.custom-table th {
  background-color: #007bff;
  color: #fff;
  font-weight: 600;
}

.custom-table tbody tr:hover {
  background-color: #f0f8ff;
  transition: background-color 0.3s ease;
}

.custom-table tbody tr:last-child td {
  border-bottom: none;
}
</style>
