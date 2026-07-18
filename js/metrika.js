/**
 * Яндекс.Метрика + цели
 *
 * Перед подключением замените YANDEX_METRIKA_ID ниже на номер вашего счётчика
 * из личного кабинета Метрики: https://metrika.yandex.ru/
 */
(function () {
    "use strict";

    var COUNTER_ID = window.yandexMetrikaId || "YANDEX_METRIKA_ID";

    if (!COUNTER_ID || COUNTER_ID === "YANDEX_METRIKA_ID") {
        return;
    }

    // Load Metrika tag
    (function (m, e, t, r, i, k, a) {
        m[i] =
            m[i] ||
            function () {
                (m[i].a = m[i].a || []).push(arguments);
            };
        m[i].l = 1 * new Date();
        k = e.createElement(t);
        a = e.getElementsByTagName(t)[0];
        k.async = 1;
        k.src = r;
        a.parentNode.insertBefore(k, a);
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    ym(COUNTER_ID, "init", {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
        ecommerce: "dataLayer",
    });

    // --- Goals ---

    function reachGoal(name) {
        if (typeof ym !== "undefined") {
            ym(COUNTER_ID, "reachGoal", name);
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        // Goal: click on any CTA button/link (Buy / Order / Checkout)
        document.addEventListener("click", function (event) {
            var target = event.target.closest('a, button, [role="button"]');
            if (!target) return;

            var text = (target.textContent || "").trim().toLowerCase();
            var href = (target.getAttribute("href") || "").toLowerCase();

            if (
                text.indexOf("купить") !== -1 ||
                text.indexOf("заказать") !== -1 ||
                text.indexOf("оформить") !== -1 ||
                href.indexOf("checkout.html") !== -1
            ) {
                reachGoal("buy_click");
            }
        });

        // Goal: submit order form on index page
        var orderForm = document.getElementById("orderForm");
        if (orderForm) {
            orderForm.addEventListener("submit", function () {
                // Check honeypot first (mirror the form logic)
                var honeypot = document.getElementById("website-idx");
                if (honeypot && honeypot.value) {
                    return;
                }
                reachGoal("order_submit");
            });
        }

        // Goal: submit order on checkout page
        var btnToPayment = document.getElementById("btnToPayment");
        if (btnToPayment) {
            btnToPayment.addEventListener("click", function () {
                reachGoal("order_submit");
            });
        }
    });
})();
