let campoSeleccionado = "";
let precioPorHora = 0;

const canchasDesignadas = [
    { nombre: "Responsable Cancha 1", cancha: "Cancha 1", lat: -17.7850, lng: -63.1800 },
    { nombre: "Responsable Cancha 2", cancha: "Cancha 2", lat: -17.7860, lng: -63.1810 },
    { nombre: "Responsable Cancha 3", cancha: "Cancha 3", lat: -17.7870, lng: -63.1820 },
    { nombre: "Responsable Cancha 4", cancha: "Cancha 4", lat: -17.7880, lng: -63.1830 }
];

// Inicializar el mapa
const mapid = L.map('mapid').setView([-17.7833, -63.1833], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mapid);

// Añadir marcadores
canchasDesignadas.forEach(designado => {
    L.marker([designado.lat, designado.lng])
        .addTo(mapid)
        .bindPopup(`<a href="#">${designado.nombre} - ${designado.cancha}</a>`);
});

function abrirFormulario(campo) {
    campoSeleccionado = campo;

    // Definir precio por hora
    if (campo === "Cancha 1") {
        precioPorHora = 200;
    } else if (campo === "Cancha 2") {
        precioPorHora = 170;
    } else {
        precioPorHora = 150;
    }

    document.getElementById('tituloCampo').innerText = `Reserva para ${campo}`;
    document.getElementById('formulario').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';

    // Foco automático y scroll em celular
    setTimeout(() => {
        document.getElementById('cliente').focus();
        document.getElementById('formulario').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
}

function fecharFormulario() {
    document.getElementById('formulario').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function calcularValor() {
    const duracion = document.getElementById('duracao').value;
    if (duracion && !isNaN(duracion)) {
        const valorTotal = duracion * precioPorHora;
        document.getElementById('valorTotal').value = valorTotal;
    } else {
        document.getElementById('valorTotal').value = "";
    }
}

function enviarReserva() {
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;
    const duracion = document.getElementById('duracao').value;
    const cliente = document.getElementById('cliente').value;
    const valor = document.getElementById('valorTotal').value;

    if (!data || !hora || !duracion || !cliente || !valor) {
        alert('¡Rellena todos los campos!');
        return;
    }

    const numeroWhatsApp = "59167728519";
    const mensaje = `Reserva de Cancha: ${campoSeleccionado}\nFecha: ${data}\nHora: ${hora}\nDuración: ${duracion} horas\nCliente: ${cliente}\nValor Total: ${valor} Bs\n\n¡Gracias por tu reserva!`;
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsApp, '_blank');

    fecharFormulario();
}

// Prevenir envio ao apertar Enter (ex: em celular)
document.getElementById('formulario').addEventListener('submit', function(e) {
    e.preventDefault();
});
