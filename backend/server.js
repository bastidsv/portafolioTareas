fetch("https://portafoliotareas.onrender.com/agenda")
  .then(response => response.json())
  .then(agenda => {
    const lista = document.getElementById("listaAgenda");

    agenda.forEach(persona => {
      const item = document.createElement("li");

      item.innerHTML = `
        <strong>${persona.dia}</strong><br>
        Nombre: ${persona.nombre}<br>
        Ubicación: ${persona.ubicacion}<br>
        Contacto: ${persona.contacto}
      `;

      lista.appendChild(item);
    });
  })
  .catch(error => {
    console.error("Error al cargar la agenda:", error);
  });