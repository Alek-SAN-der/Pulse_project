$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1000,
        // adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 1000,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevron-left-solid.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/chevron-right-solid.png"></button>',
        responsive: [
            {
              breakpoint: 768,
              settings: {
                arrows: false,
                dots: true
              }
            }
          ]
      });

      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

      // $('.catalog-item__link').each(function(i) {
      //   $(this).on('click', function(e){
      //     e.preventDefault();
      //     $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
      //     $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      //   })
      // })

    function toogleSlide(item) {
      $(item).each(function(i) {
        $(this).on('click', function(e) {
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
      })
    };

    toogleSlide('.catalog-item__link');
    toogleSlide('.catalog-item__back');

    // появление окна консультации
    $('[data-modal="consultation"]').on('click', function() {
      $('.overlay, #consultation').fadeIn('slow');
    });
    // закрытие всех окон и подложки при нажатии на крестик
    $('.modal__close').on('click', function() {
      $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });
    // //просто появление окна купить
    // $('.button_mini').on('click', function(){
    //   $('.overlay, #order').fadeIn('slow');
    // });
    
    // появление окна купить с подстановкой названия товара
    $('.button_mini').each(function(i) {
      $(this).on('click', function() {
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn('slow');
      });
    });

    //Валидация форм
    function valideForms(form){
      $(form).validate({
        rules: {
          name: {
            required: true,
            minlength: 2
          },
          phone:"required",
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: {
              required: "Пожалуйста, введите свое имя",
              minlength: jQuery.validator.format("Введите {0} символа!")
            },
          phone: "Пожалуйста, введите свой номер телефона",       
          email: {
            required: "Пожалуйста, введите свою почту",
            email: "Неправильно введен адрес почты"
          }
        }
      });
    };

    valideForms('#consultation form');
    valideForms('#consultation-form');
    valideForms('#order form');
    
    // валидация ввода номера телефона через плагин
    $('input[name=phone]').mask("+372 999 99999"||"+372 9999 9999");

    // отправка форм
    $('form').submit(function(e) {
      e.preventDefault(); //не перезагружает страницу после отправки формы

      if(!$(this).valid()) {   //если форма не проходит валидацию, отправка формы останавливается
        return;
      }

      $.ajax({     //настройка отправки формы
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
      }).done(function(){    //настройка действий после отправки формы
        $(this).find("input").val("");   //после отправки формы значения инпутов формы станут пустыми
        $('#consultation, #order').fadeOut(); //убираем окно заказа
        $('.overlay, #thanks').fadeIn('slow'); //показываем подложку и окно благодарности
        $('form').trigger('reset');   //очистка и сброс всех форм
      });
      return false;
    });
  });