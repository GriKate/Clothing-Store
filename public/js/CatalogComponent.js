Vue.component('catalog', {
    props: ['num'], //проброшен из <catalog num="9"> <catalog num="4">
    data() {
        return {
            urlCatalog: '/goods',
            products: [],
            filtered: [],
            random: [],
            currentSlice: [],
            productImgPath: 'img/',
        }
    },
    methods: {
        sliceCatalog(pageNum) {
            this.$parent.$refs.catalogPages.currentPage = pageNum;
            let start = this.num * (pageNum - 1);
            let end = parseInt(start + this.num);
            this.currentSlice = this.filtered.slice(start, end);
            // console.log(this.$parent.$refs.catalog.filtered.slice(0, 3));
        },
        getRandom() {
            // console.log(Math.random() * 4); //2.5335683665684456687
            // console.log(Math.floor(Math.random() * 4)); // 3

            // алгоритм Фишера-Йетса
            let products = this.products;
            let j, temp;
            for(let i = products.length - 1; i > 0; i--){
                j = Math.floor(Math.random()*(i + 1));
                temp = products[j];
                products[j] = products[i];
                products[i] = temp;
            }
            this.random = products.slice(0, this.num);
        },
        filterName(value) {
            // console.log(this.searchLine);
            let regexp = new RegExp(value, 'i');
            this.filtered = this.filtered.filter(el => regexp.test(el.product_name));
            this.$parent.$refs.catalogPages.countPages(this.filtered.length);
            this.$parent.$refs.catalogPages.currentPage = 1;
            this.sliceCatalog(this.$parent.$refs.catalogPages.currentPage);
            // console.log(this.filtered);
        },
        filterPrice(min, max) {
            this.filtered = [];
            for (let el of this.products) {
                if (el.price >= min && el.price <= max) {
                    this.filtered.push(el);
                }
            }

            if (this.$parent.$refs.search.searchLine) {
                console.log(this.$parent.$refs.search.searchLine);
                this.filterName(this.$parent.$refs.search.searchLine);
                return;
            }
            this.$parent.$refs.catalogPages.countPages(this.filtered.length);
            this.$parent.$refs.catalogPages.currentPage = 1;
            this.sliceCatalog(this.$parent.$refs.catalogPages.currentPage);
            // console.log(this.filtered);
        },

        // // передаём объект товара компоненту Product
        // showProduct(item) {
        //     this.$parent.$refs.prod.setProduct(item);
        //     // this.$parent.getJson(`/product`)
        //     //     .then(data => {
        //     //         console.log(data);
        //     //     })
        // },
    },
    mounted() {
        // в момент загрузки страницы /catalog
        // делаем запрос по URL '/products' и получаем ответ - массив объектов товаров с Vue-обёртками геттеров и сеттеров
        // т.к. в JSON получаем массив объектов товаров

        // в mounted нельзя получить данные другого компонента, здесь рано!!!
        // console.log(this.$parent.$refs.cart.productsQuantity);
        this.$parent.getJson(this.urlCatalog)
            .then(data => {
                // console.log(data);
                for (let el of data) {
                    // каждый объект с товаром пушим в массив products: [] компонента CatalogComponent
                    this.products.push(el);
                    this.filtered.push(el);
                }
                this.getRandom();
                this.$parent.$refs.catalogPages.countPages(this.filtered.length);
                this.sliceCatalog(1);
                // this.$parent.$refs.page.set(1);
                // this.$parent.$refs.catalogPages.setPageActive();
            })
    },
    template: `
<!--<div>-->
<!--    <section class="catalogue" v-show="show">-->
<!--        <div class="catalogue__container">-->
<!--            <nav class="catalogue-menu">-->
<!--                <div class="catalogue-menu__section">-->
<!--                    <a href="#menu1" class="catalogue-menu__head">Category<i class="fas fa-caret-down catalogue-menu__triangle catalogue-menu__triangle_active"></i></a>-->
<!--                    <ul id="menu1" class="catalogue-menu__list catalogue-menu__list_active">-->
<!--                        <li class="catalogue-menu__item"><a href="catalog.html" class="catalogue-menu__link">Accessories</a></li>-->
<!--                        <li class="catalogue-menu__item"><a href="catalog.html" class="catalogue-menu__link">Bags</a></li>-->
<!--                        <li class="catalogue-menu__item"><a href="catalog.html" class="catalogue-menu__link">Denim</a></li>-->
<!--                        <li class="catalogue-menu__item"><a href="catalog.html" class="catalogue-menu__link">Hoodies & Sweatshirts</a></li>-->
<!--                        <li class="catalogue-menu__item"><a href="catalog.html" class="catalogue-menu__link">Jackets & Coats</a></li>-->
<!--                        <li class="catalogue-menu__item"><a href="catalog.html" class="catalogue-menu__link">Pants</a></li>-->
<!--                        <li class="catalogue-menu__item"><a href="catalog.html" class="catalogue-menu__link">Polos</a></li>-->
<!--                        <li class="catalogue-menu__item"><a href="catalog.html" class="catalogue-menu__link">Bags</a></li>-->
<!--                        <li class="catalogue-menu__item"><a href="catalog.html" class="catalogue-menu__link">Shoes</a></li>-->
<!--                        <li class="catalogue-menu__item"><a href="catalog.html" class="catalogue-menu__link">Shorts</a></li>-->
<!--                        <li class="catalogue-menu__item"><a href="catalog.html" class="catalogue-menu__link">Sweaters & Knits</a></li>-->
<!--                        <li class="catalogue-menu__item"><a href="catalog.html" class="catalogue-menu__link">T-Shirts</a></li>-->
<!--                        <li class="catalogue-menu__item"><a href="catalog.html" class="catalogue-menu__link">Tanks</a></li>-->
<!--                    </ul>-->
<!--                </div>-->
<!--                <div class="catalogue-menu__section">-->
<!--                    <a href="#menu2" class="catalogue-menu__head">brand<i class="fas fa-caret-down catalogue-menu__triangle"></i></a>-->
<!--                    <ul id="menu2" class="catalogue-menu__list">-->
<!--                        <li class="catalogue-menu__item"><a href="catalog.html" class="catalogue-menu__link">Accessories</a></li>-->
<!--                        <li class="catalogue-menu__item"><a href="catalog.html" class="catalogue-menu__link">Bags</a></li>-->
<!--                        <li class="catalogue-menu__item"><a href="catalog.html" class="catalogue-menu__link">Denim</a></li>-->
<!--                        <li class="catalogue-menu__item"><a href="catalog.html" class="catalogue-menu__link">Hoodies & Sweatshirts</a></li>-->
<!--                        <li class="catalogue-menu__item"><a href="catalog.html" class="catalogue-menu__link">Jackets & Coats</a></li>-->
<!--                        <li class="catalogue-menu__item"><a href="catalog.html" class="catalogue-menu__link">Pants</a></li>-->
<!--                        <li class="catalogue-menu__item"><a href="catalog.html" class="catalogue-menu__link">Polos</a></li>-->
<!--                        <li class="catalogue-menu__item"><a href="catalog.html" class="catalogue-menu__link">Bags</a></li>-->
<!--                        <li class="catalogue-menu__item"><a href="catalog.html" class="catalogue-menu__link">Shoes</a></li>-->
<!--                        <li class="catalogue-menu__item"><a href="catalog.html" class="catalogue-menu__link">Shorts</a></li>-->
<!--                        <li class="catalogue-menu__item"><a href="catalog.html" class="catalogue-menu__link">Sweaters & Knits</a></li>-->
<!--                        <li class="catalogue-menu__item"><a href="catalog.html" class="catalogue-menu__link">T-Shirts</a></li>-->
<!--                        <li class="catalogue-menu__item"><a href="catalog.html" class="catalogue-menu__link">Tanks</a></li>-->
<!--                    </ul>-->
<!--                </div>-->
<!--                <div class="catalogue-menu__section">-->
<!--                    <a href="#menu3" class="catalogue-menu__head">dESIGNER<i class="fas fa-caret-down catalogue-menu__triangle"></i></a>-->
<!--                    <ul id="menu3" class="catalogue-menu__list">-->
<!--                        <li class="catalogue-menu__item"><a href="catalog.html" class="catalogue-menu__link">Accessories</a></li>-->
<!--                        <li class="catalogue-menu__item"><a href="catalog.html" class="catalogue-menu__link">Bags</a></li>-->
<!--                        <li class="catalogue-menu__item"><a href="catalog.html" class="catalogue-menu__link">Denim</a></li>-->
<!--                        <li class="catalogue-menu__item"><a href="catalog.html" class="catalogue-menu__link">Hoodies & Sweatshirts</a></li>-->
<!--                        <li class="catalogue-menu__item"><a href="catalog.html" class="catalogue-menu__link">Jackets & Coats</a></li>-->
<!--                        <li class="catalogue-menu__item"><a href="catalog.html" class="catalogue-menu__link">Pants</a></li>-->
<!--                        <li class="catalogue-menu__item"><a href="catalog.html" class="catalogue-menu__link">Polos</a></li>-->
<!--                        <li class="catalogue-menu__item"><a href="catalog.html" class="catalogue-menu__link">Bags</a></li>-->
<!--                        <li class="catalogue-menu__item"><a href="catalog.html" class="catalogue-menu__link">Shoes</a></li>-->
<!--                        <li class="catalogue-menu__item"><a href="catalog.html" class="catalogue-menu__link">Shorts</a></li>-->
<!--                        <li class="catalogue-menu__item"><a href="catalog.html" class="catalogue-menu__link">Sweaters & Knits</a></li>-->
<!--                        <li class="catalogue-menu__item"><a href="catalog.html" class="catalogue-menu__link">T-Shirts</a></li>-->
<!--                        <li class="catalogue-menu__item"><a href="catalog.html" class="catalogue-menu__link">Tanks</a></li>-->
<!--                    </ul>-->
<!--                </div>-->
<!--            </nav>-->
<!--            -->
<!--            <div class="products">-->
<!--                <div class="choice">-->
<!--                    <div class="choice__section">-->
<!--                        <h3 class="choice__head">Trending now</h3>-->
<!--                        <div class="choice__box">-->
<!--                            <ul class="choice__trends">-->
<!--                                <li class="trends__name"><a href="#" class="trends__link">Bohemian</a></li>-->
<!--                                <li class="trends__name"><a href="#" class="trends__link">Floral</a></li>-->
<!--                                <li class="trends__name"><a href="#" class="trends__link">Lace</a></li>-->
<!--                                <li class="trends__name"><a href="#" class="trends__link">Floral</a></li>-->
<!--                                <li class="trends__name"><a href="#" class="trends__link">Lace</a></li>-->
<!--                                <li class="trends__name"><a href="#" class="trends__link">Bohemian</a></li>-->
<!--                            </ul>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="choice__section">-->
<!--                        <h3 class="choice__head">Size</h3>-->
<!--                        <div class="choice__box">-->
<!--                            <ul class="choice__size">-->
<!--                                <li class="size__value">-->
<!--                                    <input type="checkbox" class="size__input" id="size1">-->
<!--                                    <label for="size1" class="size__label">XXS</label>-->
<!--                                    <input type="checkbox" class="size__input" id="size5">-->
<!--                                    <label for="size5" class="size__label">L</label>-->
<!--                                </li>-->
<!--                                <li class="size__value">-->
<!--                                    <input type="checkbox" class="size__input" id="size2">-->
<!--                                    <label for="size2" class="size__label">XS</label>-->
<!--                                    <input type="checkbox" class="size__input" id="size6">-->
<!--                                    <label for="size6" class="size__label">XL</label>-->
<!--                                </li>-->
<!--                                <li class="size__value">-->
<!--                                    <input type="checkbox" class="size__input" id="size3">-->
<!--                                    <label for="size3" class="size__label">S</label>-->
<!--                                    <input type="checkbox" class="size__input" id="size7">-->
<!--                                    <label for="size7" class="size__label">XXL</label>-->
<!--                                </li>-->
<!--                                <li class="size__value">-->
<!--                                    <input type="checkbox" class="size__input" id="size4">-->
<!--                                    <label for="size4" class="size__label">M</label>-->
<!--                                </li>-->
<!--                            </ul>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="choice__section">-->
<!--                        <h3 class="choice__head">pRICE</h3>-->
<!--                        <div class="choice__box">-->
<!--                            <div class="choice__price_line"></div>-->
<!--                            <div class="choice__price">-->
<!--                                <p class="choice__price_value">$52</p>-->
<!--                                <p class="choice__price_value">$400</p>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="sort">-->
<!--                    <div class="sort__box">-->
<!--                        <div class="sort__value">Sort By</div>-->
<!--                        <div class="sort__value">Name<i class="fas fa-caret-down triangle-grey triangle-grey_sort-triangle"></i></div>-->
<!--                    </div>-->
<!--                    <div class="sort__box">-->
<!--                        <div class="sort__value">Show</div>-->
<!--                        <div class="sort__value">09<i class="fas fa-caret-down triangle-grey triangle-grey_sort-triangle"></i></div>-->
<!--                    </div>-->
<!--                </div>-->

<!--                <catalog ref="catalog" num="9" v-if="show"></catalog>-->
                <div>
                    <ul class="products__list" v-if="num === '9'">
                        <catalog-product 
                            v-for="item of currentSlice" 
                            :key="item.id_product" 
                            :product-item="item"
                            :img="productImgPath"
                        > 
<!--                        v-for="item of filtered.slice(0, num)"-->
    <!--                    @show="showProduct"-->
                        </catalog-product>
                    </ul>
                    
                    <ul class="products__list" v-else-if="num === '8'">
                        <catalog-product 
                            v-for="item of random" 
                            :key="item.id_product" 
                            :product-item="item"
                            :img="productImgPath"
                        >
    <!--                    @show="showProduct"-->
                        </catalog-product>
                    </ul>
                    
                    <ul class="products__list" v-else-if="num === '4'">
                        <catalog-product 
                            v-for="item of random" 
                            :key="item.id_product" 
                            :product-item="item"
                            :img="productImgPath"
                        >
    <!--                    @show="showProduct"-->
                        </catalog-product>
                    </ul>                  
                </div>
                

<!--                <div class="pages">-->
<!--                    <ul class="pages__list">-->
<!--                        <li class="pages__item"><a href="catalog.html" class="pages__link"><i class="fas fa-chevron-left pages__control"></i></a></li>-->
<!--                        <li class="pages__item"><a href="catalog.html" class="pages__link pages__active">1</a></li>-->
<!--                        <li class="pages__item"><a href="catalog.html" class="pages__link">2</a></li>-->
<!--                        <li class="pages__item"><a href="catalog.html" class="pages__link">3</a></li>-->
<!--                        <li class="pages__item"><a href="catalog.html" class="pages__link">4</a></li>-->
<!--                        <li class="pages__item"><a href="catalog.html" class="pages__link">5</a></li>-->
<!--                        <li class="pages__item"><a href="catalog.html" class="pages__link">6</a></li>-->
<!--                        <li class="pages__item"><span class="pages__dots">.....</span></li>-->
<!--                        <li class="pages__item"><a href="catalog.html" class="pages__link">20</a></li>-->
<!--                        <li class="pages__item"><a href="catalog.html" class="pages__link"><i class="fas fa-chevron-right pages__control pages__active"></i></a></li>-->
<!--                    </ul>-->
<!--                    <a href="catalog.html" class="pages__all-products">View All</a>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--    </section>-->
<!--    <section class="advantage" v-show="show">-->
<!--        <div class="advantage__container clearfix">-->
<!--            <ul class="advantage__list">-->
<!--                <li class="advantage__item">-->
<!--                    <img src="img/track.svg" alt="" class="advantage__pic">-->
<!--                    <article class="advantage__description">-->
<!--                        <h2 class="advantage__head">Free Delivery</h2>-->
<!--                        <p class="advantage__text">Worldwide delivery on all. Authorit tively morph next-generation innov tion with extensive models.</p>-->
<!--                    </article>-->
<!--                </li>-->
<!--                <li class="advantage__item">-->
<!--                    <div class="advantage__icon">-->
<!--                        <img src="img/sales.svg" alt="" class="advantage__pic">-->
<!--                    </div>-->
<!--                    <article class="advantage__description">-->
<!--                        <h2 class="advantage__head">Sales & discounts</h2>-->
<!--                        <p class="advantage__text">Worldwide delivery on all. Authorit tively morph next-generation innov tion with extensive models.</p>-->
<!--                    </article>-->
<!--                </li>-->
<!--                <li class="advantage__item">-->
<!--                    <div class="advantage__icon">-->
<!--                        <img src="img/crown.svg" alt="" class="advantage__pic">-->
<!--                    </div>-->
<!--                    <article class="advantage__description">-->
<!--                        <h2 class="advantage__head">Quality assurance</h2>-->
<!--                        <p class="advantage__text">Worldwide delivery on all. Authorit tively morph next-generation innov tion with extensive models.</p>-->
<!--                    </article>-->
<!--                </li>-->
<!--            </ul>-->
<!--        </div>-->
<!--    </section>-->
<!--    <product ref="product" v-if="!show"></product>-->
<!--</div>-->`
});


Vue.component('catalog-product', {
    props: ['productItem', 'img'], //проброшен из <catalog-product :product-item="item" :img="productImgPath">
    data() {
        return {
            currentImg: 1,
            productImgs: 3,
        }
    },
    methods: {
        switchPhoto(id) {
            if (this.currentImg < this.productImgs) {
                this.currentImg++;
            } else {
                this.currentImg = 1;
            }
            let path = this.img + id + '_' + this.currentImg + '.jpg';

            // let img = document.querySelector('.products__link-img');
            // находит самый первый '.products__link-img' и меняет картинки ему
            // a нужно заменить картинку конкретному товару

            let catalog = document.querySelector('.products__list');

            catalog.addEventListener('click', e => {
                if (e.target.className === 'product__hover_switch') {
                    e.preventDefault();
                    let img = e.target.parentNode.querySelector('.products__link-img');
                    img.style.backgroundImage = 'url(' + path + ')';
                }
            })
        }
    },
    // methods: {
    //     // передаём объект товара компоненту Product
    //     showProduct(item) {
    //         console.log(item);
    //         // eventBus.$emit("setproduct", item);
    //         this.$bus.$emit("set", item);
    //         // eventBus.$on("setproduct", (id) => {
    //         //     console.log('yyyyy');
    //         // });
    //         this.$parent.show = false;
    //         // this.$emit.$refs.product.setProduct(item);
    //         // console.log(this.$parent.$refs.product.product);
    //         // this.$parent.getJson(`/product`)
    //         //     .then(data => {
    //         //         console.log(data);
    //         //     })
    //     },
    // },
    computed: {
        imgName() {
            let img = this.img + this.productItem.id_product + '_' + this.currentImg + '.jpg'; // img/124.jpg
            return 'url(' + img + ')';
        }
    },
    template: `<li class="products__item">
                    <a href="product.html" class="products__link-img" :style="{backgroundImage: imgName}">
<!--                        <img class="products__img" :src="imgName">-->
                    </a>
<!--                    <a href="#" @click.prevent="$emit('show', productItem)" class="products__link-img""><img class="products__img" :src="imgName"></a>-->
<!--                    <a href="#" @click.prevent="showProduct(productItem.id_product)" class="products__link-img""><img class="products__img" :src="imgName"></a>-->
<!--                    <a href="#" @click.prevent="eventBus.$emit("showProduct", productItem.id_product)" class="products__link-img""><img class="products__img" :src="imgName"></a>-->
                    
                    <div class="products__name">
                        <a href="product.html" class="products__link-name">{{productItem.product_name}}</a>
                        <p class="products__link-price">$ {{productItem.price}}</p>
                    </div>
                    <a href="#" class="product__hover_cart" @click.prevent="$root.$refs.cart.addToCart(productItem)">
                        <img src="img/cart_white.svg" alt="" class="product__hover_cart-img">Add to cart
                    </a>
                    <a href="#" class="product__hover_switch" @click.prevent="switchPhoto(productItem.id_product)">
<!--                        <img src="img/recycle.svg" alt="" class="product__hover_button-img">-->
                    </a>
                    <a href="#" class="product__hover_like">
                        <img src="img/heart.svg" alt="" class="product__hover_button-img">
                    </a>
                </li>`
});



// Vue.component('product', {
//     data() {
//         return {
//             urlProduct: '/entity',
//             product: {},
//             colors: [],
//             id: '',
//         }
//     },
//     methods: {
//         setProduct(product) {
//             this.product = product;
//         },
//         setColor(event) {
//             // в <select> можно было использовать v-model="product.color" для мгновенного задания значения,
//             // вместо вызова метода, но тогда не отображалось бы <option disabled selected>Color...
//             // т.к. v-model="product.color" сразу же задает значение "" для color, и в <option> отображается пустота
//             this.product.color = event.target.value;
//             console.log(this.product.color);
//         },
//         setSize(event) {
//             this.product.size = event.target.value;
//             console.log(this.product.size);
//         }
//     },
//     // created () {
//     //     eventBus.$on("setproduct", (id) => {
//     //         console.log('yyyyy');
//     //         // this.$root.getJson(`/entity/${id}`)
//     //         //     .then(data => {
//     //         //         this.product = data;
//     //         //         console.log(this.product);
//     //         //     });
//     //     });
//     // },
//     mounted() {
//         this.$bus.$on("set", (id) => {
//             // console.log('yyyyy');
//             this.id = id;
//             console.log(this.id);
//                 //         // this.$root.getJson(`/entity/${id}`)
//                 //         //     .then(data => {
//                 //         //         this.product = data;
//                 //         //         console.log(this.product);
//                 //         //     });
//         });
//         this.$root.getJson(`/colors`)
//             .then(data => {
//                 this.colors = data.colors;
//                 // console.log(this.colors);
//             });
//     },
//     template: `<section class="product">
//                     <div class="product__carousel">
//                         <div class="carousel__container">
//                             <div class="product__img"></div>
//                         </div>
//                         <a href="#" class="carousel__controls carousel__controls_left">
//                             <i class="fas fa-chevron-left carousel__arrow"></i>
//                         </a>
//                         <a href="#" class="carousel__controls carousel__controls_right">
//                             <i class="fas fa-chevron-right carousel__arrow"></i>
//                         </a>
//                     </div>
//                     <div class="product__description">
//                         <div class="product__container">
//                             <div class="product__box">
//                                 <div class="product__head">
//                                     <h3 class="collection__name">{{product.collection}}</h3>
//                                     <div class="pink__line"></div>
//                                     <h3 class="product__name">{{product.product_name}}</h3>
//                                 </div>
//                                 <div class="product__features">
//                                     <p class="product__text">Compellingly actualize fully researched processes before proactive outsourcing. Progressively syndicate collaborative architectures before cutting-edge services. Completely visualize parallel core competencies rather than exceptional portals. </p>
//                                     <div class="product__other">
//                                         <p class="material">FABRIC: <span class="dark__grey">{{product.fabric}}</span></p>
//                                         <p class="designer">DESIGNER: <span class="dark__grey">{{product.designer}}</span></p>
//                                     </div>
//                                     <p class="price">$ {{product.price}}</p>
//                                 </div>
//                                 <div class="choose__block">
//                                     <div class="choose__drop">
//                                         <p class="choose__text">CHOOSE COLOR</p>
//                                         <form action="#" class="color__form">
// <!-- в <select> можно было использовать v-model="product.color" для мгновенного задания значения, вместо вызова метода, но тогда не отображалось бы -->
// <!--<option disabled selected>Color... т.к. v-model="product.color" сразу же задает значение "" для color, и в <option> отображается пустота -->
//                                             <select name="" id="1" required @change="setColor($event)" class="choose__list">
//                                                 <option disabled selected>Color...</option>
//                                                 <color
//                                                 v-for="color of colors"
//                                                 :color="color"
//                                                 ></color>
//                                             </select>
//                                         </form>
//                                     </div>
//                                     <div class="choose__drop">
//                                         <p class="choose__text">CHOOSE SIZE</p>
//                                         <form action="#" class="size__form">
//                                             <select name="" id="" required @change="setSize($event)" class="size__list">
//                                                 <option disabled selected>Size...</option>
//                                                 <option :value="'XS'" class="size__item">XS</option>
//                                                 <option :value="'S'" class="size__item">S</option>
//                                                 <option :value="'M'" class="size__item">M</option>
//                                                 <option :value="'L'" class="size__item">L</option>
//                                                 <option :value="'XL'" class="size__item">XL</option>
//                                                 <option :value="'XXL'" class="size__item">XXL</option>
//                                             </select>
// <!--                                            <div class="choose__list-arrow"><i class="fas fa-chevron-down"></i></div>-->
//                                         </form>
//                                     </div>
//                                     <div class="choose__drop">
//                                         <p class="choose__text">QUANTITY</p>
//                                         <form action="#" class="quantity__form">
//                                             <input type="number" min="1" required value="1" placeholder="1" v-model="product.quantity" class="quantity__input">
//                                         </form>
//                                     </div>
//                                 </div>
//                                 <div class="cart__add">
//                                     <form action="#" class="cart__add-form">
//                                         <a href="#" class="cart__button" @click.prevent="$parent.$refs.cart.addToCart(product)"><div class="pink__cart"></div>Add to cart</a>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>`
// });
//
// Vue.component('color', {
//     props: ['color'],
//     template: `<option :value="color" class="color__item">{{color}}</option>`
// });