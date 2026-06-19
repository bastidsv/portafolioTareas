fetch("https://portafoliotareas.onrender.com/tareas")
  .then(response => response.json())
  .then(tareas => {
    const lista = document.getElementById("listaTareas");

    tareas.forEach(tarea => {
      const item = document.createElement("li");
      const enlace = document.createElement("a");

      enlace.textContent = tarea.titulo;
      enlace.href = tarea.url;
      enlace.target = "_blank";

      item.appendChild(enlace);
      lista.appendChild(item);
    });
  })
  .catch(error => {
    console.error("Error al cargar las tareas:", error);
  });