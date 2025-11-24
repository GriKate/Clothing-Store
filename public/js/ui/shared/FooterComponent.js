Vue.component('footer-component', {
    data() {
        return {}
    },
    methods: {},
    template: `<footer class="footer">
        <div class="footer__info">
            <div class="footer__info-container">
                <div class="footer__info-right">
                    <div class="header__logo">
                        <a href="index.html" class="logo">
                            <img src="../img/logo.png" alt="logo" class="logo__img">
                            <div class="logo__text">BRAN<span class="pink">D</span></div>
                        </a>
                    </div>
                    <div class="about__brand">
                        <p class="about__brand-text">Objectively transition extensive data rather than cross functional solutions. Monotonectally syndicate multidisciplinary materials before go forward benefits. Intrinsicly syndicate an expanded array of processes and cross-unit partnerships.</p>
                        <p class="about__brand-text">Efficiently plagiarize 24/365 action items and focused infomediaries. Distinctively seize superior initiatives for wireless technologies. Dynamically optimize.</p>
                    </div>
                </div>

                <menuFooter></menuFooter>

            </div>
        </div>
        <div class="footer__copywright">
            <div class="copywright__container">
                <p class="copywright__text">© 2019 Brand All Rights Reserved.</p>
                <div class="social">
                    <ul class="social__list">
                        <li class="social__item">
                            <button class="social__link" aria-label="facebook"><i class="fab fa-facebook-f"></i></button>
                        </li>
                        <li class="social__item">
                            <button class="social__link" aria-label="twitter"><i class="fab fa-twitter"></i></button>
                        </li>
                        <li class="social__item">
                            <button class="social__link" aria-label="linkedin"><i class="fab fa-linkedin-in"></i></button>
                        </li>
                        <li class="social__item">
                            <button class="social__link" aria-label="pinterest"><i class="fab fa-pinterest-p"></i></button>
                        </li>
                        <li class="social__item">
                            <button class="social__link" aria-label="google-plus"><i class="fab fa-google-plus-g"></i></button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>`
});

Vue.component('menuFooter', {
    data() {
        return {}
    },
    template: `<nav class="footer__info-left">
                <div class="footer__menu">
                    <span class="footer__menu-head">COMPANY</span>
                    <div class="company__menu">
                        <ul class="company__menu-list">
                            <li class="info__menu-item">
                                <a href="index.html" class="info__menu-link">Home</a>
                            </li>
                            <li class="info__menu-item">
                                <a href="index.html" class="info__menu-link">Shop</a>
                            </li>
                            <li class="info__menu-item">
                                <a href="index.html" class="info__menu-link">About</a>
                            </li>
                            <li class="info__menu-item">
                                <a href="index.html" class="info__menu-link">How It Works</a>
                            </li>
                            <li class="info__menu-item">
                                <a href="index.html" class="info__menu-link">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="footer__menu">
                    <span class="footer__menu-head">INFORMATION</span>
                    <div class="company__menu">
                        <ul class="info__menu-list">
                            <li class="info__menu-item">
                                <a href="index.html" class="info__menu-link">Terms & Condition</a>
                            </li>
                            <li class="info__menu-item">
                                <a href="index.html" class="info__menu-link">Privacy Policy</a>
                            </li>
                            <li class="info__menu-item">
                                <a href="index.html" class="info__menu-link">How to Buy</a>
                            </li>
                            <li class="info__menu-item">
                                <a href="index.html" class="info__menu-link">How to Sell</a>
                            </li>
                            <li class="info__menu-item">
                                <a href="index.html" class="info__menu-link">Promotion</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="footer__menu">
                    <span class="footer__menu-head">SHOP CATEGORY</span>
                    <div class="company__menu">
                        <ul class="shop__menu-list">
                            <li class="info__menu-item">
                                <a href="catalog.html" class="info__menu-link">Men</a>
                            </li>
                            <li class="info__menu-item">
                                <a href="catalog.html" class="info__menu-link">Women</a>
                            </li>
                            <li class="info__menu-item">
                                <a href="catalog.html" class="info__menu-link">Child</a>
                            </li>
                            <li class="info__menu-item">
                                <a href="catalog.html" class="info__menu-link">Apparel</a>
                            </li>
                            <li class="info__menu-item">
                                <a href="catalog.html" class="info__menu-link">Browse All</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>`
});