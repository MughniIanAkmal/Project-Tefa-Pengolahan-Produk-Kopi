// load code after startup
document.addEventListener('DOMContentLoaded', function () {

  // Smooth scrolling pojok kanan atas
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });

        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
        });
        this.classList.add('active');
      }
    });
  });

  // active nav link berdasarkan scroll
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });
      if (!currentSection) {
    currentSection = 'top';
      }
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  // Initial check
  updateActiveNavLink();

  // Listen to scroll events
  window.addEventListener('scroll', updateActiveNavLink);

  // About section navigation tabs
  const aboutNavItems = document.querySelectorAll('.about-nav-item');
  const contentBlocks = {
    'visi-misi': document.getElementById('visi-misi-content'),
    'sejarah': document.getElementById('sejarah-content'),
    'keunggulan': document.getElementById('keunggulan-content'),
    'struktur': document.getElementById('struktur-content'),
  };

  aboutNavItems.forEach(item => {
    item.addEventListener('click', function () {
      const target = this.getAttribute('data-target');

      // Remove active class from all items
      aboutNavItems.forEach(navItem => {
        navItem.classList.remove('active');
      });

      // Add active class to clicked item
      this.classList.add('active');

      // Hide all content blocks
      Object.keys(contentBlocks).forEach(key => {
        contentBlocks[key].style.display = 'none';
      });

      // Show selected content block
      contentBlocks[target].style.display = 'block';
    });
  });

  // Animation on scroll
  const animateElements = document.querySelectorAll('.animate-fade-in-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  animateElements.forEach(element => {
    element.style.animationPlayState = 'paused';
    observer.observe(element);
  });

  // Add hover effect to cards
  const cards = document.querySelectorAll('.gallery-card, .service-card, .product-box');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-5px)';
      if (this.classList.contains('product-box')) {
        this.style.transform = 'translateY(-10px)';
      }
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
    });
  });

  // Product selection functionality
  const productBoxes = document.querySelectorAll('.product-box');
  const productImage = document.getElementById('product-image');
  const productTitle = document.getElementById('product-section-title');
  const productDescription = document.getElementById('product-description');
  const productComposition = document.getElementById('product-composition');
  const productPackaging = document.getElementById('product-packaging');
  const productPrice = document.getElementById('product-price');

  const products = {
    arabika: {
      title: 'ARABIKA',
      image: 'image/gambar-arabika.jpeg',
      description: 'Kopi Arabika memiliki rasa yang lebih lembut dan manis dengan aroma yang harum. Dikenal sebagai kopi premium dengan tingkat keasaman yang lebih tinggi.',
      composition: '100% biji kopi Arabika pilihan dengan kadar air maksimal 12,5%',
      packaging: 'Ukuran kemasan kopi bubuk Arabika ini bervariasi dari 50 gram, 100 gram, hingga 250 gram.',
      price: 'Harga mulai Rp. 20.000 - Rp. 85.000.'
    },
    liberika: {
      title: 'LIBERIKA',
      image: 'image/gambar-liberika.jpeg',
      description: 'Kopi liberika adalah jenis kopi unik dari Afrika Barat yang dikenal karena ukuran bijinya yang besar dan rasa buah-buahan yang khas.',
      composition: '100% biji kopi Liberika pilihan dengan kadar air maksimal 12,5%',
      packaging: 'Ukuran kemasan kopi bubuk Liberika ini bervariasi dari 50 gram, 100 gram, hingga 250 gram.',
      price: 'Harga mulai Rp. 15.000 - Rp. 70.000.'
    },
    robusta: {
      title: 'ROBUSTA',
      image: 'image/gambar-robusta.jpeg',
      description: 'Kopi Robusta memiliki rasa yang lebih kuat dan pahit dengan kandungan kafein yang lebih tinggi. Cocok untuk pencinta kopi yang kuat dan berani.',
      composition: '100% biji kopi Robusta pilihan dengan kadar air maksimal 12,5%',
      packaging: 'Ukuran kemasan kopi bubuk Robusta ini bervariasi dari 50 gram, 100 gram, hingga 250 gram.',
      price: 'Harga mulai Rp. 18.000 - Rp. 75.000.'
    }
  };

  productBoxes.forEach(box => {
    box.addEventListener('click', function () {
      const productType = this.getAttribute('data-product');
      let title, imgSrc;
      const productData = products[productType];

      productImage.src = productData.image;
      productDescription.textContent = productData.description;
      productComposition.textContent = productData.composition;
      productPackaging.textContent = productData.packaging;
      productPrice.textContent = productData.price;
      productTitle.textContent = productData.title;

      productBoxes.forEach(b => b.classList.remove('selected'));
      this.classList.add('selected');

      document.querySelector('.liberika-section').scrollIntoView({ behavior: 'smooth' });
    });
  });

});
