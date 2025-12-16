// Crear estrellas en el fondo
function createStars() {
  const container = document.getElementById("starsContainer")
  const starCount = 200

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div")
    star.className = "star"
    star.style.left = Math.random() * 100 + "%"
    star.style.top = Math.random() * 100 + "%"
    star.style.setProperty("--duration", Math.random() * 3 + 2 + "s")
    star.style.setProperty("--opacity", Math.random() * 0.7 + 0.3)
    star.style.animationDelay = Math.random() * 3 + "s"
    container.appendChild(star)
  }

  // Añadir estrellas fugaces ocasionales
  setInterval(() => {
    const shootingStar = document.createElement("div")
    shootingStar.className = "shooting-star"
    shootingStar.style.left = Math.random() * 100 + "%"
    shootingStar.style.top = Math.random() * 50 + "%"
    container.appendChild(shootingStar)

    setTimeout(() => shootingStar.remove(), 3000)
  }, 8000)
}

// Animación de scroll reveal
function revealSections() {
  const sections = document.querySelectorAll(".section-petal")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    },
  )

  sections.forEach((section) => observer.observe(section))
}

// Navegación por constelación
function setupNavigation() {
  const navStars = document.querySelectorAll(".nav-star")
  const sections = document.querySelectorAll(".section-petal")

  navStars.forEach((star, index) => {
    star.style.animationDelay = index * 0.1 + "s"

    star.addEventListener("click", () => {
      const sectionIndex = Number.parseInt(star.getAttribute("data-section"))

      if (sectionIndex === 0) {
        window.scrollTo({ top: 0, behavior: "smooth" })
      } else {
        sections[sectionIndex - 1].scrollIntoView({ behavior: "smooth", block: "center" })
      }
    })
  })

  // Actualizar navegación activa al hacer scroll
  window.addEventListener("scroll", () => {
    let current = 0

    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect()
      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        current = index + 1
      }
    })

    navStars.forEach((star, index) => {
      star.classList.remove("active")
      if (index === current) {
        star.classList.add("active")
      }
    })
  })
}

// Partículas doradas al hacer hover
function createGoldenParticles() {
  const sections = document.querySelectorAll(".section-petal")

  sections.forEach((section) => {
    section.addEventListener("mouseenter", (e) => {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          const particle = document.createElement("div")
          particle.className = "golden-particle"
          particle.style.left = Math.random() * 100 + "%"
          particle.style.top = Math.random() * 100 + "%"
          section.appendChild(particle)

          setTimeout(() => particle.remove(), 4000)
        }, i * 100)
      }
    })
  })
}

// Inicializar todo
document.addEventListener("DOMContentLoaded", () => {
  createStars()
  revealSections()
  setupNavigation()
  createGoldenParticles()
})

// Efecto de parallax suave
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const stars = document.querySelectorAll(".star")

  stars.forEach((star, index) => {
    const speed = ((index % 3) + 1) * 0.05
    star.style.transform = `translateY(${scrolled * speed}px)`
  })
})
