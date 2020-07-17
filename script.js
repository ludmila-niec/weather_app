let contenedor = document.querySelector(".container");
let bodyFecha = document.querySelector(".fecha");
let bodyLugar = document.querySelector(".lugar");
let bodyProvincia = document.querySelector(".provincia");
let bodyTemperatura = document.querySelector(".temperatura");
let bodyDescripcion = document.querySelector(".descripcion");
let btnVer = document.querySelector("#ver-mas");
let bodyDetalles = document.querySelector(".detalles");
let bodyHumedad = document.querySelector(".humedad");
let bodyVisibilidad = document.querySelector(".visibilidad");
let bodyViento = document.querySelector(".viento");
let BtnCiudad = document.querySelector(".siguienteCiudad");
let icon = document.querySelector("#icon");

async function weather() {
    let respuesta = await fetch(" https://ws.smn.gob.ar/map_items/weather");
    let data = await respuesta.json();
    return data;
}

weather().then((respuesta) => {
    console.log(respuesta);
    setInterval(() => {
        let lugarRandom = Math.floor(Math.random() * 217) + 1;
        let fecha = respuesta[lugarRandom].forecast.date_time;
        let lugar = respuesta[lugarRandom].name;
        let provincia = respuesta[lugarRandom].province;
        let temperaturaActual = respuesta[lugarRandom].weather.temp;
        let descripcion = respuesta[lugarRandom].weather.description;
        let humedad = respuesta[lugarRandom].weather.humidity;
        let visibilidad = respuesta[lugarRandom].weather.visibility;
        let direccionViento = respuesta[lugarRandom].weather.wing_deg;
        let velocidadViento = respuesta[lugarRandom].weather.wind_speed;

        bodyFecha.innerHTML = fecha;
        bodyLugar.innerHTML = lugar;
        bodyProvincia.innerHTML = provincia;
        bodyTemperatura.innerHTML = `<h1 class="temperatura">${temperaturaActual}<span class="regular">°C</span></h1>`;
        bodyDescripcion.innerHTML = descripcion;
        bodyHumedad.innerHTML = "Humedad: " + humedad + "%";
        bodyVisibilidad.innerHTML = "Visibilidad: " + visibilidad + "Km";
        bodyViento.innerHTML =
            "Viento: " + direccionViento + " " + velocidadViento + "Km";

        if (descripcion.includes("Cubierto")) {
            icon.innerHTML = `<i class="fas fa-cloud icon"></i>`;
            contenedor.classList.remove("despejado", "nublado");
            contenedor.classList.add("cubierto");
        } else if (descripcion.includes("ublado")) {
            icon.innerHTML = `<i class="fas fa-cloud-sun icon"></i>`;
            contenedor.classList.remove("despejado", "cubierto");
            contenedor.classList.add("nublado");
        } else if (descripcion.includes("Despejado")) {
            icon.innerHTML = `<i class="fas fa-sun icon"></i>`;
            contenedor.classList.remove("nublado", "cubierto");
            contenedor.classList.add("despejado");
        }
    }, 2000);
});
