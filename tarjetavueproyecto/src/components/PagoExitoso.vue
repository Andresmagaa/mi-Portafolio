<template>
    <div class="pago-exitoso">
        <h2>Compra realizada con éxito</h2>
        <p>Gracias por tu compra.</p>
        <!-- <p>Has adquirido: <strong>{{ objeto.nombre }}</strong></p>
        <p>Monto total: <strong>${{ objeto.total }}</strong></p> -->
        <button @click="irAlInicio">Volver al inicio</button>
    </div>
  </template>
  
  <script>
  export default {
      name: 'PagoExitoso',
      props: [],
      methods: {
          irAlInicio() {
              this.$emit('volver-inicio');
          }
      }
  }
  </script>
  
  <style scoped>
  .pago-exitoso {
      text-align: center;
      padding: 20px;
      background-color: #f4f4f4; /* Gris claro */
      border-radius: 8px;
      max-width: 600px;
      margin: auto;
      box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1); /* Sombra suave */
  }
  
  h2 {
      color: #333333; /* Gris oscuro para el título */
      font-size: 24px;
  }
  
  p {
      color: #666666; /* Gris medio para el texto */
      font-size: 16px;
  }
  
  button {
      background-color: #007BFF; /* Azul claro para el botón */
      color: white;
      border: none;
      padding: 12px 25px;
      cursor: pointer;
      margin-top: 15px;
      border-radius: 5px;
      font-size: 16px;
  }
  
  button:hover {
      background-color: #0056b3; /* Azul más oscuro al hacer hover */
  }
  </style>
  