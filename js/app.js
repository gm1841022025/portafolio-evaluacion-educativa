/**
 * PORTAFOLIO DIGITAL DE EVALUACIÓN EDUCATIVA
 * Nuevo diseño moderno: Portal Académico Universitario
 * Autor: Jose Esau Galdamez Melgar
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Barra de progreso de lectura y estilo dinámico del navbar
  const scrollFill = document.getElementById('scrollFill');
  const navbar = document.getElementById('navbar');

  const onScroll = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      if (scrollFill) scrollFill.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }

    if (navbar) {
      if (window.scrollY > 20) {
        navbar.style.boxShadow = '0 4px 20px -2px rgba(15, 23, 42, 0.08)';
        navbar.style.borderBottomColor = '#CBD5E1';
      } else {
        navbar.style.boxShadow = 'none';
        navbar.style.borderBottomColor = 'var(--border-subtle)';
      }
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 2. Control de menú móvil
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('abierto');
      if (isOpen) {
        mobileMenu.classList.remove('abierto');
        document.body.style.overflow = '';
      } else {
        mobileMenu.classList.add('abierto');
        document.body.style.overflow = 'hidden';
      }
    });

    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu || e.target.classList.contains('mobile-menu__link')) {
        mobileMenu.classList.remove('abierto');
        document.body.style.overflow = '';
      }
    });
  }

  // 3. Scrollspy activo para los enlaces de navegación
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.navbar__link, .mobile-menu__link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('activo');
          } else {
            link.classList.remove('activo');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -65% 0px'
  });

  sections.forEach(sec => observer.observe(sec));

  // 4. Sistema de pestañas (Tabs) dentro de las evidencias
  const tabContainers = document.querySelectorAll('.modern-tabs');
  tabContainers.forEach(container => {
    const triggers = container.querySelectorAll('.tab-trigger');
    const views = container.querySelectorAll('.tab-view');

    triggers.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab');

        triggers.forEach(t => t.classList.remove('active'));
        btn.classList.add('active');

        views.forEach(v => {
          if (v.id === targetId) {
            v.classList.add('active');
          } else {
            v.classList.remove('active');
          }
        });
      });
    });
  });

  // 5. Visor Modal de Documentos Originales
  const docModal = document.getElementById('docModal');
  const docModalTitle = document.getElementById('docModalTitle');
  const docModalBadge = document.getElementById('docModalBadge');
  const docModalBody = document.getElementById('docModalBody');
  const docModalDownload = document.getElementById('docModalDownload');
  const docModalClose = document.getElementById('docModalClose');
  const openDocButtons = document.querySelectorAll('[data-open-doc]');

  if (docModal && docModalBody && docModalClose) {
    openDocButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const docId = btn.getAttribute('data-open-doc');
        const sourceElement = document.getElementById(docId);

        if (sourceElement) {
          const title = btn.getAttribute('data-doc-title') || 'Documento Original';
          const badge = btn.getAttribute('data-doc-badge') || 'DOCX';
          const downloadUrl = btn.getAttribute('data-doc-download') || '#';

          docModalTitle.textContent = title;
          docModalBadge.textContent = badge;
          docModalBody.innerHTML = sourceElement.innerHTML;
          if (docModalDownload) {
            docModalDownload.href = downloadUrl;
            docModalDownload.setAttribute('download', '');
          }

          docModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeDocModal = () => {
      docModal.classList.remove('active');
      document.body.style.overflow = '';
      docModalBody.innerHTML = '';
    };

    docModalClose.addEventListener('click', closeDocModal);
    docModal.addEventListener('click', (e) => {
      if (e.target === docModal) closeDocModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && docModal.classList.contains('active')) {
        closeDocModal();
      }
    });
  }

  // 6. Visor Lightbox para imágenes
  const imgLightbox = document.getElementById('imgLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const screenFrames = document.querySelectorAll('.screen-card__frame');

  if (imgLightbox && lightboxImg && lightboxClose) {
    screenFrames.forEach(frame => {
      frame.addEventListener('click', () => {
        const img = frame.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt || 'Captura ampliada';
          imgLightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightbox = () => {
      imgLightbox.classList.remove('active');
      document.body.style.overflow = '';
      lightboxImg.src = '';
    };

    lightboxClose.addEventListener('click', closeLightbox);
    imgLightbox.addEventListener('click', (e) => {
      if (e.target === imgLightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && imgLightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // 7. Botones de Imprimir
  const printButtons = document.querySelectorAll('.js-print-trigger');
  printButtons.forEach(btn => {
    btn.addEventListener('click', () => window.print());
  });
});
