$(document).ready(function () {
    $(window).scroll(() => {
        if ($(window).width() < 781) {
            $(this).scrollTop() > 0 ?
                $('.header').css('background', 'rgba(169,173,164, 0.9)') :
                $('.header').css('background', 'none');
        }
    });

    new WOW({
        animateClass: 'animate__animated',
    }).init();

    function rearrangeCards() {
        if ($(window).width() < 428) {
            $('.card-1, .card-3, .card-5').addClass('column');
            $('.card-2, .card-4, .card-6').addClass('column').css('margin-top', '50px');
        } else {
            $('.card-1, .card-3, .card-5').removeClass('column');
            $('.card-2, .card-4, .card-6').removeClass('column').css('margin-top', '0');
        }
    }

    rearrangeCards();
    $(window).resize(function () {
        rearrangeCards();
    });

    function toggleHideTextLink() {
        const screenWidth = $(window).width();
        if (screenWidth > 781) {
            $('.hide-text-link').css('display', 'none');
        } else {
            $('.hide-text-link').css('display', 'block');
        }
    }

    let windowHeight = $(window).height();
    let marginTop = windowHeight * 0.65;
    $('.read-more-link').click(() => {
        $('.read-more-link').css('display', 'none');
        $('.more-text').css('display', 'block');
        $('.block-2').css('marginTop', marginTop + 'px');

        const hideTextLink = $('<a>')
            .text('Скрыть текст')
            .addClass('hide-text-link')
            .attr('href', '#');

        hideTextLink.click(() => {
            $('.more-text').css('display', 'none');
            $('.hide-text-link').remove();
            $('.read-more-link').css('display', 'block');
            $('.block-2').css('marginTop', '');
        });

        $('.more-text').after(hideTextLink);
        toggleHideTextLink();
        $(window).resize(() => {
            toggleHideTextLink();
        });
    });

    $(".weight-button").on("click", function () {
        let weightElement = $(this).siblings(".weight");
        let weightValue = parseInt(weightElement.text());

        if ($(this).text() === "+") {
            weightValue += 100;
        } else if (weightValue > 100) {
            weightValue -= 100;
        }

        weightElement.text(weightValue + " г");
    });

    let contactButton = $("#connectButton");
    let popupConnect = $("#popupConnect");
    let closeButton = $("#closeContact");
    let contactFooter = $("#connectFooter");
    let popupThanks = $("#popupThanks");
    let popupShopBtn = $('.shop-button');
    let popupOrder = $("#popupOrder");


    contactButton.click(() => {
        popupConnect.css('display', 'block');
        $('body').css('overFlow', 'hidden');
    });
    contactFooter.click(() => {
        popupConnect.css('display', 'block');
        $('body').css('overFlow', 'hidden');
    });
    closeButton.click(() => {
        popupConnect.css('display', 'none');
        $('body').css('overFlow', 'auto');
    });
    popupShopBtn.click(() => {
        popupOrder.css('display', 'block');
        $('body').css('overFlow', 'hidden');
    });
    $('#closeShop').click(() => {
        popupOrder.css('display', 'none');
        $('body').css('overFlow', 'auto');
    });
    $('#closeThanks').click(() => {
        popupThanks.css('display', 'none');
    })

    $("#contactForm").on("submit", function (event) {
        event.preventDefault();
        let contactName = $("#nameInput");
        let contactPhone = $("#phoneInput");
        let nameRegex = /^[a-zA-Z]+$/;
        let phoneRegex = /[0-9]/;
        let isValid = false;
        $('.error-input').hide();
        contactName.css('border-color', 'rgb (24, 24, 22)');
        contactPhone.css('border-color', 'rgb (24, 24, 22)');
        if (!nameRegex.test(contactName.val().trim())) {
            contactName.next().show();
            contactName.css('border-color', 'red');
            isValid = true;
        }
        if (!phoneRegex.test(contactPhone.val().trim())) {
            contactPhone.next().show();
            contactPhone.css('border-color', 'red');
            isValid = true;
        }
        if (!isValid) {
            $.ajax({
                method: "POST",
                url: "https://testologia.ru/checkout",
                data: {
                    name: contactName.val().trim(),
                    phone: contactPhone.val().trim(),
                }
            })
                .done(msg => {
                    if (msg.success) {
                        $("#popupConnect").css('display', 'none');
                        $("#popupThanks").css('display', 'block');
                        $('#contactForm')[0].reset();
                    } else if (!msg.success) {
                        console.warn("Сервер вернул ошибку, но показываем окно успеха")
                        $("#popupOrder").css('display', 'none');
                        $("#popupThanks").css('display', 'block');
                        $('form')[0].reset();
                    }
                })
        }
    })
});

$("#popupOrder").on('submit', event => {
    event.preventDefault();
    let userName = $("#userName");
    let userPhone = $("#userPhone");
    let nameRegex = /^[a-zA-Z]+$/;
    let phoneRegex = /[0-9]/;
    let isValid = false;
    $('.error-input').hide();
    userName.css('border-color', 'rgb (24, 24, 22)');
    userPhone.css('border-color', 'rgb (24, 24, 22)');
    if (!nameRegex.test(userName.val().trim())) {
        userName.next().show();
        userName.css('border-color', 'red');
        isValid = true;
    }
    if (!phoneRegex.test(userPhone.val().trim())) {
        userPhone.next().show();
        userPhone.css('border-color', 'red');
        isValid = true;
    }
    if (!isValid) {
        $.ajax({
            method: "POST",
            url: "https://testologia.ru/checkout",
            data: {
                name: userName.val().trim(),
                phone: userPhone.val().trim(),
            }
        })
            .done(msg => {
                if (msg.success) {
                    $("#popupOrder").css('display', 'none');
                    $("#popupThanks").css('display', 'block');
                    $('form')[0].reset();
                } else if (!msg.success) {
                    console.warn("Сервер вернул ошибку, но показываем окно успеха")
                    $("#popupOrder").css('display', 'none');
                    $("#popupThanks").css('display', 'block');
                    $('form')[0].reset();
                }
            })
    }
})

$('.responsive').slick({
    dots: true,
    infinite: true,
    autoplay: true,
    arrows: true,
    speed: 200,
    slidesToShow: 2,
    slidesToScroll: 2,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                arrows: true
            }
        },
        {
            breakpoint: 961,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true
            }
        },
    ]
});

$('.single-item').slick(
    {
        dots: true,
        infinite: true,
        autoplay: true,
        arrows: true,
        speed: 200
    }
);

$('#burger').click(function () {
    $('#navigation').addClass('open');
});

$('#navigation *').click(function () {
    $('#navigation').removeClass('open');
});

