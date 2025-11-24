Vue.component('menuHeader', {
    data() {
        return {}
    },
    template: `<nav class="menu">
                <div class="menu__container">
                    <ul class="menu__list">
                        <li class="menu__item">
                            <a href="index.html" class="menu__link menu__link_active">Home</a>
                            <menuHeaderDrop :last-class="false" />
                        </li>
                        <li class="menu__item">
                            <a href="catalog.html" class="menu__link">Men</a>
                            <menuHeaderDrop :last-class="false" />
                        </li>
                        <li class="menu__item">
                            <a href="catalog.html" class="menu__link">Women</a>
                            <menuHeaderDrop :last-class="false" />
                        </li>
                        <li class="menu__item">
                            <a href="catalog.html" class="menu__link">Kids</a>
                            <menuHeaderDrop :last-class="false" />
                        </li>
                        <li class="menu__item">
                            <a href="catalog.html" class="menu__link">Accessories</a>
                            <menuHeaderDrop :last-class="true" />
                        </li>
                        <li class="menu__item">
                            <a href="catalog.html" class="menu__link">Featured</a>
                            <menuHeaderDrop :last-class="true" />
                        </li>
                        <li class="menu__item">
                            <a href="catalog.html" class="menu__link">Hot deals</a>
                            <menuHeaderDrop :last-class="true" />
                        </li>
                    </ul>
                </div>
            </nav>`
})


Vue.component('menuHeaderDrop', {
    props: ['lastClass'],
    data() {
        return {}
    },
    template: `<div class="menu-drop" :class="{ drop__last: lastClass }">
                    <div class="menu-drop__box">
                        <span class="menu-drop__head">Women</span>
                        <ul class="menu-drop__list">
                            <li class="menu-drop__item"><a href="catalog.html" class="menu-drop__link">Dresses</a></li>
                            <li class="menu-drop__item"><a href="catalog.html" class="menu-drop__link">Tops</a></li>
                            <li class="menu-drop__item"><a href="catalog.html" class="menu-drop__link">Sweaters/Knits</a></li>
                            <li class="menu-drop__item"><a href="catalog.html" class="menu-drop__link">Jackets/Coats</a></li>
                            <li class="menu-drop__item"><a href="catalog.html" class="menu-drop__link">Blazers</a></li>
                            <li class="menu-drop__item"><a href="catalog.html" class="menu-drop__link">Denim</a></li>
                            <li class="menu-drop__item"><a href="catalog.html" class="menu-drop__link">Leggings/Pants</a></li>
                            <li class="menu-drop__item"><a href="catalog.html" class="menu-drop__link">Skirts/Shorts</a></li>
                            <li class="menu-drop__item"><a href="catalog.html" class="menu-drop__link">Accessories</a></li>
                        </ul>
                    </div>
                    <div class="menu-drop__box">
                        <span class="menu-drop__head">Women</span>
                        <ul class="menu-drop__list">
                            <li class="menu-drop__item"><a href="catalog.html" class="menu-drop__link">Dresses</a></li>
                            <li class="menu-drop__item"><a href="catalog.html" class="menu-drop__link">Tops</a></li>
                            <li class="menu-drop__item"><a href="catalog.html" class="menu-drop__link">Sweaters/Knits</a></li>
                            <li class="menu-drop__item"><a href="catalog.html" class="menu-drop__link">Jackets/Coats</a></li>
                        </ul>
                        <span class="menu-drop__head">Women</span>
                        <ul class="menu-drop__list">
                            <li class="menu-drop__item"><a href="catalog.html" class="menu-drop__link">Dresses</a></li>
                            <li class="menu-drop__item"><a href="catalog.html" class="menu-drop__link">Tops</a></li>
                            <li class="menu-drop__item"><a href="catalog.html" class="menu-drop__link">Sweaters/Knits</a></li>
                        </ul>
                    </div>
                    <div class="menu-drop__box">
                        <span class="menu-drop__head">Women</span>
                        <ul class="menu-drop__list">
                            <li class="menu-drop__item"><a href="catalog.html" class="menu-drop__link">Dresses</a></li>
                            <li class="menu-drop__item"><a href="catalog.html" class="menu-drop__link">Tops</a></li>
                            <li class="menu-drop__item"><a href="catalog.html" class="menu-drop__link">Sweaters/Knits</a></li>
                            <li class="menu-drop__item"><a href="catalog.html" class="menu-drop__link">Jackets/Coats</a></li>
                        </ul>
                        <div class="menu-drop__sale">
                            <img src="img/menu_sale.jpg" alt="super sale" class="menu-drop__sale-img">
                            <span class="menu-drop__sale-text">SUPER<br>SALE!</span>
                        </div>
                    </div>
                </div>`
})