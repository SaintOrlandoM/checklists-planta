// Cargar selector
if (document.getElementById("tipo")) {
  for (let key in CHECKLISTS) {
    let opt = document.createElement("option");
    opt.value = key;
    opt.textContent = CHECKLISTS[key].nombre;
    tipo.appendChild(opt);
  }
}

// Ir al checklist
function continuar() {
  localStorage.setItem("responsable", responsable.value);
  localStorage.setItem("turno", turno.value);
  localStorage.setItem("tipo", tipo.value);
  location.href = "checklist.html";
}

// Crear checklist dinámico
if (document.getElementById("formulario")) {
  const tipoSel = localStorage.getItem("tipo");
  const config = CHECKLISTS[tipoSel];

  titulo.textContent = config.nombre;

  config.campos.forEach(c => {
    let label = document.createElement("label");
    label.textContent = c;

    let chk = document.createElement("input");
    chk.type = "checkbox";
    chk.id = c;

    formulario.appendChild(label);
    formulario.appendChild(chk);
    formulario.appendChild(document.createElement("br"));
  });
}

// Guardar
function guardar() {
  const datos = {};
  document.querySelectorAll("input[type=checkbox]").forEach(i => {
    datos[i.id] = i.checked;
  });

  const registro = {
    fecha: new Date().toISOString(),
    responsable: localStorage.getItem("responsable"),
    turno: localStorage.getItem("turno"),
    checklist: localStorage.getItem("tipo"),
    datos: datos
  };

  let hist = JSON.parse(localStorage.getItem("historial") || "[]");
  hist.push(registro);
  localStorage.setItem("historial", JSON.stringify(hist));

  alert("Checklist guardado");
  location.href = "index.html";
}

// Mostrar historial
if (document.getElementById("historial")) {
  historial.textContent = JSON.stringify(
    JSON.parse(localStorage.getItem("historial") || "[]"),
    null,
    2
  );
}

// Exportar CSV (Excel)
function exportar() {
  const data = JSON.parse(localStorage.getItem("historial") || "[]");
  if (!data.length) {
    alert("Sin datos");
    return;
  }

  let csv = "fecha,responsable,turno,checklist,item,valor\n";

  data.forEach(r => {
    for (let k in r.datos) {
      csv += `${r.fecha},${r.responsable},${r.turno},${r.checklist},${k},${r.datos[k]}\n`;
    }
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "checklists_planta.csv";
  a.click();
}