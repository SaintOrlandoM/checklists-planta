// Crear checklist tipo app
if (document.getElementById("lista")) {
  const tipo = localStorage.getItem("tipo");
  const checklist = CHECKLISTS[tipo];

  document.getElementById("titulo").textContent = checklist.nombre;

  const contenedor = document.getElementById("lista");

  checklist.items.forEach((item, i) => {
    const bloque = document.createElement("div");
    bloque.className = "item";

    bloque.innerHTML = `
      <div class="texto">${item}</div>
      <div class="opciones">
        <label><input type="radio" name="item${i}" value="OK"> OK</label>
        <label><input type="radio" name="item${i}" value="NO OK"> NO OK</label>
        <label><input type="radio" name="item${i}" value="N/A"> N/A</label>
      </div>
    `;

    contenedor.appendChild(bloque);
  });
}

// Guardar resultados
function guardar() {
  const tipo = localStorage.getItem("tipo");
  const checklist = CHECKLISTS[tipo];
  const resultados = [];

  checklist.items.forEach((item, i) => {
    const sel = document.querySelector(`input[name="item${i}"]:checked`);
    resultados.push({
      item,
      valor: sel ? sel.value : ""
    });
  });

  const registro = {
    fecha: new Date().toISOString(),
    responsable: localStorage.getItem("responsable"),
    turno: localStorage.getItem("turno"),
    checklist: tipo,
    resultados
  };

  const hist = JSON.parse(localStorage.getItem("historial") || "[]");
  hist.push(registro);
  localStorage.setItem("historial", JSON.stringify(hist));

  alert("Checklist guardado");
  window.location.href = "index.html";
}
