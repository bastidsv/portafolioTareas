function cargarAgenda(dia) {
  fetch(`https://portafoliotareas.onrender.com/agenda/${dia}`)
    .then(response => response.json())
    .then(agenda => {
      const lista = document.getElementById("listaAgenda");
      const tituloDia = document.getElementById("tituloDia");

      lista.innerHTML = "";
      tituloDia.textContent = `Clientes de ${dia}`;

      if (agenda.length === 0) {
        lista.innerHTML = "<li>No hay clientes registrados para este día.</li>";
        return;
      }

      agenda.forEach(persona => {
        const item = document.createElement("li");

        item.innerHTML = `
          <strong>${persona.nombre}</strong><br>
          Ubicación: ${persona.ubicacion}<br>
          Contacto: ${persona.contacto}
        `;

        lista.appendChild(item);
      });
    })
    .catch(error => {
      console.error("Error al cargar la agenda:", error);
    });
}

cargarAgenda("Lunes");