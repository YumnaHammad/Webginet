(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 90) {
            $('.nav-bar').addClass('sticky-top shadow');
        } else {
            $('.nav-bar').removeClass('sticky-top shadow');
        }
    });
    

    // Mobile Menu Functionality
    document.addEventListener("DOMContentLoaded", function () {
        const menu = document.getElementById("mobileMenu");
        const openBtn = document.getElementById("openMenuBtn");
        const closeBtn = document.getElementById("closeMenuBtn");

        if (openBtn && closeBtn && menu) {
            openBtn.onclick = () => {
                menu.classList.add("open");
                document.body.style.overflow = "hidden";
            };

            closeBtn.onclick = () => {
                menu.classList.remove("open");
                closeAllSubmenus();
                document.body.style.overflow = "";
            };
        }

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") {
                menu.classList.remove("open");
                closeAllSubmenus();
                document.body.style.overflow = "";
            }
        });
    });

    // Global submenu functions
    window.openSubMenu = function(id) {
        document.getElementById(id)?.classList.add("open");
    }

    window.closeSubMenu = function(id) {
        document.getElementById(id)?.classList.remove("open");
    }

    window.closeAllSubmenus = function() {
        document.querySelectorAll(".submenu-panel.open").forEach(panel => {
            panel.classList.remove("open");
        });
    }

    // Responsive image handling
    function handleResponsiveImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.classList.contains('img-fluid')) {
                img.classList.add('img-fluid');
            }
        });
    }

    // Responsive table handling
    function handleResponsiveTables() {
        const tables = document.querySelectorAll('table');
        tables.forEach(table => {
            if (!table.parentElement.classList.contains('table-responsive')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'table-responsive';
                table.parentNode.insertBefore(wrapper, table);
                wrapper.appendChild(table);
            }
        });
    }

    // Responsive form handling
    function handleResponsiveForms() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                if (input.type !== 'hidden' && !input.classList.contains('form-control')) {
                    input.classList.add('form-control');
                }
            });
        });
    }

    // Initialize responsive features
    $(document).ready(function() {
        handleResponsiveImages();
        handleResponsiveTables();
        handleResponsiveForms();
    });

    // Handle window resize
    $(window).on('resize', function() {
        handleResponsiveImages();
        handleResponsiveTables();
        handleResponsiveForms();
    });
    
    // Dropdown on mouse hover
    // const $dropdown = $(".dropdown");
    // const $dropdownToggle = $(".dropdown-toggle");
    // const $dropdownMenu = $(".dropdown-menu");
    // const showClass = "show";
    
    // $(window).on("load resize", function() {
    //     if (this.matchMedia("(min-width: 992px)").matches) {
    //         $dropdown.hover(
    //         function() {
    //             const $this = $(this);
    //             $this.addClass(showClass);
    //             $this.find($dropdownToggle).attr("aria-expanded", "true");
    //             $this.find($dropdownMenu).addClass(showClass);
    //         },
    //         function() {
    //             const $this = $(this);
    //             $this.removeClass(showClass);
    //             $this.find($dropdownToggle).attr("aria-expanded", "false");
    //             $this.find($dropdownMenu).removeClass(showClass);
    //         }
    //         );
    //     } else {
    //         $dropdown.off("mouseenter mouseleave");
    //     }
    // });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Date and time picker
    $('.date').datetimepicker({
        format: 'L'
    });
    $('.time').datetimepicker({
        format: 'LT'
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0: {
                items: 1,
                nav: false,
                dots: true
            },
            768: {
                items: 1,
                nav: true,
                dots: false
            }
        }
    });


   // Service carousel
    $(".service-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 25,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1,
                margin: 15
            },
            576:{
                items:2,
                margin: 20
            },
            768:{
                items:3,
                margin: 25
            },
            992:{
                items:2,
                margin: 25
            },
            1200:{
                items:4,
                margin: 25
            }
        }
    });




    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1,
                nav: false,
                dots: true
            },
            768:{
                items:2,
                nav: true,
                dots: false
            },
            992:{
                items:3,
                nav: true,
                dots: false
            }
        }
    });
    
})(jQuery);


      class MyNavbar extends HTMLElement {
        connectedCallback() {
          fetch("navbar.html")
            .then((res) => res.text())
            .then((html) => {
              this.innerHTML = html;
              this.initializeNavbar();
              this.initializeMobileMenu();
            });
        }
        
        initializeNavbar() {
          // Wait for DOM and Bootstrap to be ready
          setTimeout(() => {
            const navbarToggler = this.querySelector('.navbar-toggler');
            const navbarCollapse = this.querySelector('.navbar-collapse');
            
            if (navbarToggler && navbarCollapse) {
              // Handle toggle button state changes
              navbarCollapse.addEventListener('show.bs.collapse', () => {
                navbarToggler.setAttribute('aria-expanded', 'true');
              });
              
              navbarCollapse.addEventListener('hide.bs.collapse', () => {
                navbarToggler.setAttribute('aria-expanded', 'false');
              });
              
              // Handle toggle button click to close when open
              navbarToggler.addEventListener('click', (e) => {
                const isExpanded = navbarToggler.getAttribute('aria-expanded') === 'true';
                const isNavbarOpen = navbarCollapse.classList.contains('show');
                
                if (isExpanded && isNavbarOpen) {
                  // If navbar is open, close it
                  e.preventDefault();
                  e.stopPropagation();
                  
                  // Use Bootstrap's collapse method to close
                  if (typeof bootstrap !== 'undefined') {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) {
                      bsCollapse.hide();
                    } else {
                      // Fallback if Bootstrap instance doesn't exist
                      navbarCollapse.classList.remove('show');
                      navbarToggler.setAttribute('aria-expanded', 'false');
                    }
                  } else {
                    // Fallback if Bootstrap is not loaded
                    navbarCollapse.classList.remove('show');
                    navbarToggler.setAttribute('aria-expanded', 'false');
                  }
                }
                // If navbar is closed, let Bootstrap handle the opening
              });
              
              // Handle click outside to close
              document.addEventListener('click', (e) => {
                if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
                  if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                      toggle: false
                    });
                    bsCollapse.hide();
                  }
                }
              });
            }
          }, 100);
        }

        initializeMobileMenu() {
          const menu = this.querySelector("#mobileMenu");
          const openBtn = this.querySelector("#openMenuBtn");
          const closeBtn = this.querySelector("#closeMenuBtn");

          if (openBtn && closeBtn && menu) {
            openBtn.onclick = () => {
              menu.classList.add("open");
              document.body.style.overflow = "hidden";
            };

            closeBtn.onclick = () => {
              menu.classList.remove("open");
              this.closeAllSubmenus();
              document.body.style.overflow = "";
            };
          }

          document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") {
              menu.classList.remove("open");
              this.closeAllSubmenus();
              document.body.style.overflow = "";
            }
          });
        }

        // ✅ Make submenu functions accessible within the class
        openSubMenu(id) {
          this.querySelector(`#${id}`)?.classList.add("open");
        }

        closeSubMenu(id) {
          this.querySelector(`#${id}`)?.classList.remove("open");
        }

        closeAllSubmenus() {
          this.querySelectorAll(".submenu-panel.open").forEach(panel => {
            panel.classList.remove("open");
          });
        }
      }
      customElements.define("my-navbar", MyNavbar);
  
      class myfooter extends HTMLElement {
        connectedCallback() {
          fetch("footer.html")
            .then((res) => res.text())
            .then((html) => {
              this.innerHTML = html;
            });
        }
      }
      customElements.define("my-footer", myfooter);

