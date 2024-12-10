document.addEventListener("DOMContentLoaded", () => {
    const contenedorNoticias = document.getElementById("contenedor-noticias");

    // Cargar noticias desde el archivo JSON
    fetch("noticias.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al cargar las noticias");
            }
            return response.json();
        })
        .then(data => {
            contenedorNoticias.innerHTML = ""; // Limpiar contenido de carga
            data.forEach(noticia => {
                const noticiaDiv = document.createElement("div");
                noticiaDiv.classList.add("noticia");
                noticiaDiv.innerHTML = `
                    <h3>${noticia.titulo}</h3>
                    <p>${noticia.contenido}</p>
                `;
                contenedorNoticias.appendChild(noticiaDiv);
            });
        })
        .catch(error => {
            contenedorNoticias.innerHTML = "<p>Error al cargar las noticias.</p>";
            console.error(error);
        });
});
/*************************************** FORMULARIO ************************************/ 
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formPresupuesto");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevenir el envío del formulario si hay errores

        // Validar campos
        const isValid = validarFormulario();

        if (isValid) {
            alert("Formulario enviado correctamente");
            form.reset(); // Reiniciar formulario
        }
    });

    function validarFormulario() {
        let valido = true;

        // Validar nombre
        const nombre = document.getElementById("nombre").value.trim();
        const errorNombre = document.getElementById("errorNombre");
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,15}$/.test(nombre)) {
            errorNombre.textContent = "El nombre solo puede contener letras (máx. 15 caracteres).";
            valido = false;
        } else {
            errorNombre.textContent = "";
        }

        // Validar apellidos
        const apellidos = document.getElementById("apellidos").value.trim();
        const errorApellidos = document.getElementById("errorApellidos");
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,40}$/.test(apellidos)) {
            errorApellidos.textContent = "Los apellidos solo pueden contener letras (máx. 40 caracteres).";
            valido = false;
        } else {
            errorApellidos.textContent = "";
        }

        // Validar teléfono
        const telefono = document.getElementById("telefono").value.trim();
        const errorTelefono = document.getElementById("errorTelefono");
        if (!/^\d{9}$/.test(telefono)) {
            errorTelefono.textContent = "El teléfono debe tener exactamente 9 dígitos.";
            valido = false;
        } else {
            errorTelefono.textContent = "";
        }

        // Validar email
        const email = document.getElementById("email").value.trim();
        const errorEmail = document.getElementById("errorEmail");
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            errorEmail.textContent = "El correo electrónico no tiene un formato válido.";
            valido = false;
        } else {
            errorEmail.textContent = "";
        }

        return valido;
    }
});
/*************************************** PRESUPUESTO ************************************/
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formPresupuesto");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevenir el envío del formulario si hay errores

        // Validar campos
        const isValid = validarFormulario();

        if (isValid) {
            alert("Formulario enviado correctamente");
            form.reset(); // Reiniciar formulario
        }
    });

    function validarFormulario() {
        let valido = true;

        // Validar nombre
        const nombre = document.getElementById("nombre").value.trim();
        const errorNombre = document.getElementById("errorNombre");
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,15}$/.test(nombre)) {
            errorNombre.textContent = "El nombre solo puede contener letras (máx. 15 caracteres).";
            valido = false;
        } else {
            errorNombre.textContent = "";
        }

        // Validar apellidos
        const apellidos = document.getElementById("apellidos").value.trim();
        const errorApellidos = document.getElementById("errorApellidos");
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,40}$/.test(apellidos)) {
            errorApellidos.textContent = "Los apellidos solo pueden contener letras (máx. 40 caracteres).";
            valido = false;
        } else {
            errorApellidos.textContent = "";
        }

        // Validar teléfono
        const telefono = document.getElementById("telefono").value.trim();
        const errorTelefono = document.getElementById("errorTelefono");
        if (!/^\d{9}$/.test(telefono)) {
            errorTelefono.textContent = "El teléfono debe tener exactamente 9 dígitos.";
            valido = false;
        } else {
            errorTelefono.textContent = "";
        }

        // Validar email
        const email = document.getElementById("email").value.trim();
        const errorEmail = document.getElementById("errorEmail");
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            errorEmail.textContent = "El correo electrónico no tiene un formato válido.";
            valido = false;
        } else {
            errorEmail.textContent = "";
        }

        return valido;
    }
});
/*************************************** CALCULO PRESUPUESTO ************************************/
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formPresupuesto");
    const producto = document.getElementById("producto");
    const plazo = document.getElementById("plazo");
    const extras = document.querySelectorAll('input[name="extras"]');
    const totalElement = document.getElementById("total");
    const condiciones = document.getElementById("condiciones");
    const enviarButton = document.getElementById("enviar");

    // Función para calcular el presupuesto
    function calcularPresupuesto() {
        let total = 0;

        // Obtener precio del producto
        const precioProducto = parseFloat(producto.value);
        if (!isNaN(precioProducto)) {
            total += precioProducto;
        }

        // Calcular costo de extras
        extras.forEach(extra => {
            if (extra.checked) {
                total += parseFloat(extra.value);
            }
        });

        // Aplicar descuento por plazo
        const plazoSeleccionado = parseInt(plazo.value);
        if (plazoSeleccionado > 6) {
            total *= 0.9; // Descuento del 10%
        }

        // Mostrar el total
        totalElement.textContent = `${total.toFixed(2)}€`;
    }

    // Función para habilitar o deshabilitar el botón de envío
    function validarFormulario() {
        // Habilitar el botón de envío si se han aceptado las condiciones
        enviarButton.disabled = !condiciones.checked || !form.checkValidity();
    }

    // Calcular presupuesto cuando cambien los valores
    form.addEventListener("change", () => {
        calcularPresupuesto();
        validarFormulario();
    });

    // Validar antes de enviar el formulario
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevenir el envío del formulario si hay errores

        // Validar campos de contacto antes de enviar
        const isValid = validarFormulario();

        if (isValid) {
            alert("Presupuesto enviado correctamente");
            form.reset();
            totalElement.textContent = "0€";
        }
    });

    // Calcular presupuesto inicial
    calcularPresupuesto();
});
/*************************************** MAPA DINAMICO ************************************/
document.addEventListener("DOMContentLoaded", function() {
    // Coordenadas de la empresa (modifica estas coordenadas a tu ubicación real)
    const empresaLat = 40.416775;  // Ejemplo: Madrid
    const empresaLng = -3.703790; // Ejemplo: Madrid

    const map = L.map('map').setView([empresaLat, empresaLng], 13); // Establecer vista inicial del mapa

    // Agregar la capa base de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Marcador para la empresa
    const markerEmpresa = L.marker([empresaLat, empresaLng]).addTo(map)
        .bindPopup('<b>Mi Empresa S.A.</b><br>Calle Ficticia, 123, Madrid')
        .openPopup();

    // Función para manejar la geolocalización del usuario
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const usuarioLat = position.coords.latitude;
            const usuarioLng = position.coords.longitude;
            const usuarioUbicacion = L.latLng(usuarioLat, usuarioLng);

            // Marcador para la ubicación del usuario
            const markerUsuario = L.marker(usuarioUbicacion).addTo(map)
                .bindPopup('<b>Tu ubicación</b>')
                .openPopup();

            // Calcular la ruta desde el usuario hasta la empresa
            L.Routing.control({
                waypoints: [
                    usuarioUbicacion,
                    [empresaLat, empresaLng] // Coordenadas de la empresa
                ],
                routeWhileDragging: true
            }).addTo(map);
        }, function() {
            alert("No se pudo obtener la ubicación. Se mostrará solo el mapa de la empresa.");
            // Si no se puede obtener la ubicación del usuario, solo mostrar el mapa de la empresa
        });
    } else {
        alert("La geolocalización no es soportada por este navegador.");
    }
});

