// === ELEMENTOS DEL DOM ===
const elements = {
  boxEnd: document.getElementById("button--end"),
  boxCartel: document.getElementById("box--cartel"),
  panorama: document.getElementById("panorama"),
  buttonAcceso: document.getElementById("button-acceso"),
  consejo: document.getElementById("consejo__span"),
  acceso: document.getElementById("acceso"),
  accesoCont: document.getElementById("acceso_cont"),
  loading: document.getElementById('loading'),
  progressBar: document.getElementById('progressBar'),
  progressText: document.getElementById('progressText'),
  
  // Carrusel
  track: document.getElementById('carouselTrack'),
  indicators: document.getElementById('indicators'),
  counter: document.getElementById('counter'),
  prevBtn: document.getElementById('prevBtn'),
  nextBtn: document.getElementById('nextBtn')
};

// === CONSTANTES ===
const TIPS = [
  "Puedes desplazarte arrastrando con el dedo o el mouse",
  "Haz zoom acercando o alejando con dos dedos o con la rueda del mouse",
  "Toca los íconos brillantes (orbes) para descubrir información",
  "Pulsa en las flechas de salida para cambiar de habitación",
  "En pantallas táctiles, prueba girar el dispositivo para una experiencia más inmersiva",
  "Algunos objetos contienen enlaces a videos o contenido extra",
  "Toca el ícono de información para leer más detalles de la escena"
];

// === CLASE PRINCIPAL ===
class ViewerConstructor {
  constructor(modelos, cuartos) {
    this.cuartos = cuartos;
    this.modelos = modelos;
    this.carga = 0;
    this.currentCarouselIndex = 0;
    this.carouselLength = 0;
    
    this.viewer = pannellum.viewer('panorama', this.crearConfigViewer());
    
    this.inicializarEventos();
    this.actualizarImagenes();
  }

  crearConfigViewer() {
    const scenes = {};
    
    this.cuartos.forEach((cuarto, index) => {
      const hotSpots = [
        ...cuarto.modelos.map(modelo => ({
          ...modelo,
          createTooltipFunc: this.crearHotspot.bind(this)
        })),
        ...cuarto.salidas
      ];

      scenes[index] = {
        title: "",
        hfov: 110,
        pitch: 0,
        yaw: 0,
        type: "equirectangular",
        panorama: cuarto.url,
        hotSpots
      };
    });

    return {
      default: {
        firstScene: this.cuartos[0].id,
        sceneFadeDuration: 1000,
        autoLoad: true,
        showControls: false
      },
      scenes
    };
  }

  // === LOADING ===
  mostrarLoading() {
    elements.loading.classList.remove("hidden");
    this.carga = 0;
    this.actualizarProgreso();
    
    const randomTip = () => TIPS[Math.floor(Math.random() * TIPS.length)];
    elements.consejo.textContent = randomTip();
    
    const intervalConsejo = setInterval(() => {
      elements.consejo.textContent = randomTip();
    }, 3000);
    
    const intervalProgreso = setInterval(() => {
      this.carga += Math.random() * 7;
      if (this.carga > 95) this.carga = 95;
      
      this.actualizarProgreso();
      
      if (this.viewer.isLoaded()) {
        clearInterval(intervalProgreso);
        clearInterval(intervalConsejo);
        this.ocultarLoading();
      }
    }, 400);
  }

  actualizarProgreso() {
    const progreso = Math.round(this.carga);
    elements.progressBar.style.width = `${progreso}%`;
    elements.progressText.textContent = `${progreso}%`;
  }

  ocultarLoading() {
    elements.progressBar.style.width = "100%";
    elements.progressText.textContent = "100%";
    elements.panorama.classList.add("cargado");
    elements.acceso.classList.add("app__aceso--mostrar");
    
    setTimeout(() => {
      elements.loading.classList.add("hidden");
    }, 300);
  }

  // === VIEWER ===
  enfocarViewer(args) {
    elements.acceso.classList.remove("app__aceso--mostrar");
    this.viewer.lookAt(args.pitch, args.yaw, 20, 2500);
    
    elements.boxEnd.classList.add('button--end--active');
    elements.boxCartel.classList.add('box--active');
    elements.boxCartel.querySelector(".box__header__h3").innerText = args.titulo;
    
    this.crearCarrusel(args.url);
  }

  normalizarViewer() {
    document.querySelectorAll(".custom-hotspot--desactive")
      .forEach(el => el.classList.remove("custom-hotspot--desactive"));
    
    elements.acceso.classList.add("app__aceso--mostrar");
    elements.boxEnd.classList.remove("button--end--active");
    elements.boxCartel.classList.remove("box--active");
    
    const pitch = this.viewer.getPitch();
    const yaw = this.viewer.getYaw();
    this.viewer.lookAt(pitch, yaw, 120, 2500);
    
    elements.track.innerHTML = "";
  }

  // === CARRUSEL ===
  crearCarrusel(videos) {
    this.carouselLength = videos.length;
    this.currentCarouselIndex = 0;
    
    elements.track.innerHTML = "";
    elements.indicators.innerHTML = "";
    
    videos.forEach((video, index) => {
      // Crear item de video
      const div = document.createElement("div");
      div.className = "video-item";
      
      const titulo = document.createElement("h3");
      titulo.textContent = video.titulo;
      
      const iframe = document.createElement("iframe");
      iframe.src = video.link;
      iframe.allowFullscreen = true;
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      
      div.append(titulo, iframe);
      elements.track.appendChild(div);
      
      // Crear indicador
      const indicator = document.createElement("div");
      indicator.className = `indicator${index === 0 ? ' active' : ''}`;
      indicator.addEventListener("click", () => this.irASlide(index));
      elements.indicators.appendChild(indicator);
    });
    
    this.actualizarCarrusel();
  }

  actualizarCarrusel() {
    elements.track.style.transform = `translateX(-${this.currentCarouselIndex * 100}%)`;
    elements.counter.textContent = `${this.currentCarouselIndex + 1} / ${this.carouselLength}`;
    
    document.querySelectorAll('.indicator').forEach((ind, i) => {
      ind.classList.toggle('active', i === this.currentCarouselIndex);
    });
  }

  irASlide(index) {
    this.currentCarouselIndex = index;
    this.actualizarCarrusel();
  }

  siguienteSlide() {
    this.currentCarouselIndex = (this.currentCarouselIndex + 1) % this.carouselLength;
    this.actualizarCarrusel();
  }

  anteriorSlide() {
    this.currentCarouselIndex = (this.currentCarouselIndex - 1 + this.carouselLength) % this.carouselLength;
    this.actualizarCarrusel();
  }

  // === ESCENAS ===
  actualizarImagenes() {
    const escenaActual = this.viewer.getScene();
    elements.accesoCont.innerHTML = "";
    
    this.cuartos
      .filter(cuarto => cuarto.id !== escenaActual)
      .forEach(cuarto => {
        const html = `
          <div class="app__aceso__img" data-scena="${cuarto.id}">
            <img src="img/cuartos/${cuarto.id}.png" alt="">
            <span class="text">${cuarto.nombre}</span>
          </div>
        `;
        elements.accesoCont.insertAdjacentHTML('beforeend', html);
      });
    
    document.querySelectorAll(".app__aceso__img").forEach(imagen => {
      imagen.addEventListener("click", () => {
        this.viewer.loadScene(imagen.dataset.scena);
      });
    });
  }

  // === HOTSPOT ===
  crearHotspot(hotSpotDiv, args) {
    const pulse = document.createElement("div");
    pulse.classList.add('pulse');
    
    hotSpotDiv.classList.add('custom-tooltip');
    hotSpotDiv.appendChild(pulse);
    
    hotSpotDiv.addEventListener("click", () => {
      hotSpotDiv.classList.add('custom-hotspot--desactive');
      this.enfocarViewer(args);
    });
  }

  // === EVENTOS ===
  inicializarEventos() {
    // Click en viewer
    this.viewer.on("mousedown", (event) => {
      const coords = this.viewer.mouseEventToCoords(event);
      console.log(`Click -> Pitch: ${coords[0]}, Yaw: ${coords[1]}`);
    });
    
    // Cambio de escena
    this.viewer.on("scenechange", (sceneId) => {
      console.log("Cambiando a escena:", sceneId);
      this.mostrarLoading();
      this.actualizarImagenes();
    });
    
    // Botón cerrar
    elements.boxEnd.addEventListener("click", () => this.normalizarViewer());
    
    // Carrusel
    elements.prevBtn.addEventListener('click', () => this.anteriorSlide());
    elements.nextBtn.addEventListener('click', () => this.siguienteSlide());
  }
}

// === INICIALIZACIÓN ===
let vistaPrinc;

function main() {
  vistaPrinc = new ViewerConstructor(modelos, cuartos);
  
  elements.buttonAcceso.addEventListener("click", () => {
    elements.acceso.classList.toggle("app__aceso--default");
  });
}

main();

/*
				La onda es simple hoy me entere que voy a ser tio ahr que tenia que ver 
				(10:31pm - 16/04/2022)
				ahr bueno lo que hago es a hay un error donde el maximo es mas chico que 
				el minimo log y tal ves en un futuro lat

				y para que se arregle eso en la comparacion tengo que cambiar un && por ||
				por eso hago la comparacion, en el primer caso es cuando hay por poner el || porque else no se marca nada
				bueno Lu del futuro ojala entiendas lo que acabe de escribir porque hasta mi se me complica
				decirte esto

				en fin ya que estoy escribiendo te dejo algo anotado
				emmmmm... tengo ganas de verte... verterte en un mar de misterios e incognitas donde la unica salida
				son tus labios bv

				gracias...
				Desde hace un tiempo largo solo vengo perdiendo gente y si bien conozco nueva como que muy ñe
				me falta tener personas interesantes... aunque las que tengo son muy buenas, bueno che me estoy yendo de tema
				Lu del futuro decime si conociste a alguien copado y que tal te fue, a y si para la nueva actualizacion
				aprendes a besar no viene mal

				eso vamos a hacerlo un meme despues. FIN



                10/8/25
				Ola lu del pasado, temo decirte que retomamos el proyecto, y esta ves apostamos en el. Dejaste de programar mucho tiempo (eso fue triste)
				Pero quien soy yo para juzgarme, pasaron y viviste muchas cosas, fuiste tio devuelta por tu mejor amigo, y ahora vas a volver a serlo
			    pero por tu mejor amiga, en fin... ahora entrenas y lo de aprender a besar capaz te lo sigo debiendo jaja, como dato de color, fue dificil
			    pero si entendi lo que hiciste, capaz en un plano carteciano de x e y se explica mejor.


			    todo es curioso, obvio perdimos gente pero si, te rodeas de personas geniales, eso no se duda, te sorprenderia saber a quienes conocimos por el camino
			    mucha gente nos ayudo y ayuda muchisimo, espero que la proxima ves que escribas aca es porque la pegamos con este proyecto, nada de mediocridades
			    no vuelvas hasta decir que la pegamos,sino no te quiero ver.

			    en fin,nos vemos luego, cuidate. FIN (sigueremos conociendo personas interesante sin perder a las que tenemos)
*/