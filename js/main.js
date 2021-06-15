(function ($) {
    "use strict";
    // Scroll handling
    $(window).on('scroll', function () {
        if ($(".navbar").offset().top > 50) {
            $(".navbar").addClass("navbar-scroll");
        } else {
            $(".navbar ").removeClass("navbar-scroll");
        }
    });

    // Collapse handling
    $('.navbar-toggler').on('click', function () {
        $('.navbar-collapse').collapse('show');
    });

    // Scroll to top handling
    $(window).on("scroll", function () {
        if ($(window).scrollTop() > 250) {
            $('.back-top').fadeIn(300);
        } else {
            $('.back-top').fadeOut(300);
        }
    });

    $('.back-top').on('click', function (event) {
        event.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 300);
        return false;
    });

    // API and fake pagination management

    let currentPage = 1;
    callApiAtPage(currentPage);

    const page = $('.page');
    page.click(function () {
        const pageValue = parseInt($(this).data('page'));

        if(currentPage !== pageValue) {
            callApiAtPage(pageValue);
            currentPage = pageValue;

            $('.page').removeClass('active');
            $(this).addClass('active');
        }
    })


    function callApiAtPage(page) {
        const URL = "https://newsapi.org/v2/top-headlines?country=us&sortBy=popularity&apiKey=f9d5eff2ef4c4575808e4546ecfd3519&page=" + page;

        // API Handling
        $.get(URL, function(data, container) {
            $('.card-columns').html(buildUI(data.articles));
        });
    }

    function buildUI(articles, container) {
        let stringBuilder = '';

        articles.forEach(article => {
            stringBuilder += `
                <div class="card">
                    <div class="post-card">
                        <div class="post-card-image">
                            <a href="#"><img src="${article.urlToImage}" alt=""></a>
                        </div>
                        <div class="post-card-content">
                            <a href="#" class="categorie">${article.source.name}</a>
                            <h5><a href="${article.url}">${article.title}</a></h5>
                            <p>${article.description}</p>
                            <div class="post-card-info">
                                <ul class="list-inline">
                                    <li><a href="#"><img src="img/author.png" alt=""></a></li>
                                    <li><a href="#">${article.source.name}</a></li>
                                    <li class="dot"></li>
                                    <li>${moment(article.publishedAt).format('DD/MM/YYYY HH:mm')}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        })

        return stringBuilder;
    }
})(jQuery);

