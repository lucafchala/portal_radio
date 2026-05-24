document.addEventListener("DOMContentLoaded", () => {
    const WORKER_URL = "https://api-key-aprs-pu5oef.lfchala4.workers.dev/";

    fetch(WORKER_URL)
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        })
        .then(data => {
            if (data.result === "ok" && data.found > 0) {
                renderAPRSData(data.entries[0]);
            } else {
                document.getElementById("aprs-loading").innerText =
                    "Nenhum dado encontrado para PU5OEF no momento.";
            }
        })
        .catch(err => {
            console.error("Erro APRS:", err);
            document.getElementById("aprs-loading").innerText =
                "Erro ao buscar telemetria. Tente novamente mais tarde.";
        });
});

function renderAPRSData(entry) {
    document.getElementById("aprs-loading").style.display = "none";
    document.getElementById("aprs-data").style.display   = "grid";
    document.getElementById("aprs-led").classList.add("active");

    const ts   = new Date(entry.lasttime * 1000);
    const diff = Math.round((Date.now() / 1000 - entry.lasttime) / 60);
    const tsStr = ts.toLocaleString("pt-BR");

    const lat = parseFloat(entry.lat);
    const lng = parseFloat(entry.lng);

    document.getElementById("aprs-time").innerText =
        `${tsStr} (${diff} min atrás)`;
    document.getElementById("aprs-coords").innerText =
        `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    document.getElementById("aprs-speed").innerText =
        entry.speed != null ? `${entry.speed} km/h` : "parado";
    document.getElementById("aprs-alt").innerText =
        entry.altitude != null ? `${Math.round(entry.altitude)} m` : "—";
    document.getElementById("aprs-path").innerText =
        entry.path    || "Direto";
    document.getElementById("aprs-comment").innerText =
        entry.comment || "Sem comentário";

    // ── Mapa Leaflet ──
    const mapEl = document.getElementById("aprs-map");
    mapEl.style.display = "block";

    const map = L.map("aprs-map", {
        center: [lat, lng],
        zoom: 13,
        zoomControl: true,
        attributionControl: true
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
        maxZoom: 19
    }).addTo(map);

    const icon = L.divIcon({
        className: "",
        html: `<div style="
            width:14px; height:14px;
            background:#7dff9c;
            border:2px solid #0a0d0b;
            border-radius:50%;
            box-shadow:0 0 12px #7dff9c;
        "></div>`,
        iconSize:    [14, 14],
        iconAnchor:  [7, 7],
        popupAnchor: [0, -10]
    });

    L.marker([lat, lng], { icon })
        .addTo(map)
        .bindPopup(`
            <strong style="color:#7dff9c;font-size:13px;">PU5OEF-1</strong><br>
            ${lat.toFixed(5)}, ${lng.toFixed(5)}<br>
            Velocidade: ${entry.speed != null ? entry.speed + " km/h" : "parado"}<br>
            Altitude: ${entry.altitude != null ? Math.round(entry.altitude) + " m" : "—"}<br>
            ${tsStr}<br><br>
            <a href="https://aprs.fi/info/a/PU5OEF-1" target="_blank">Ver no aprs.fi ↗</a>
        `)
        .openPopup();
}
