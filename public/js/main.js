const API_BASE = 'https://comisi-nbackend.onrender.com/api/comisiones';

async function fetchJSON(url, opts) {
  const res = await fetch(url, opts);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

async function cargarTablas() {
  const [ventas, reglas] = await Promise.all([
    fetchJSON(`${API_BASE}/ventas`),
    fetchJSON(`${API_BASE}/reglas`)
  ]);
  document.getElementById('ventas-body').innerHTML = ventas.map(v => `
    <tr>
      <td>${v.fecha.slice(0,10)}</td>
      <td>${v.vendedor}</td>
      <td>${v.monto.toFixed(2)}</td>
    </tr>
  `).join('');
  document.getElementById('reglas-body').innerHTML = reglas.map(r => `
    <tr>
      <td>${(r.porcentaje*100).toFixed(0)}%</td>
      <td>${r.cantidad.toFixed(2)}</td>
    </tr>
  `).join('');
}

async function listarComisiones(evt) {
  evt.preventDefault();
  const inicio = document.getElementById('inicio').value;
  const fin    = document.getElementById('fin').value;
  if (!inicio || !fin) return alert('Selecciona ambas fechas.');
  const coms = await fetchJSON(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ inicio, fin })
  });
  document.getElementById('comisiones-body').innerHTML = coms.map(c => `
    <tr>
      <td>${c.vendedor}</td>
      <td>$${c.comision.toFixed(2)}</td>
    </tr>
  `).join('');
  document.getElementById('resultados').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
  cargarTablas();
  document.getElementById('filtro-form').addEventListener('submit', listarComisiones);
});
