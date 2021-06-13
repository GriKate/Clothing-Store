Vue.component('cart', {
    data() {
        return {
            cartUrl: '/cart',
            cartProducts: [],
            totalAmount: 0,
            productsQuantity: 0,
        }
    },
    methods: {
        addToCart(product) {
            let find = this.cartProducts.find((el) => product.id_product === el.id_product);
            console.log(find);
            // if (find) {
                // товар есть в корзине
                // если цвет и размер такой же - увеличиваем количество
                if (find && product.color === find.color && product.size === find.size) {
                    this.$parent.putJson(`/cart/${product.id_product}`, {quantity: 1})
                        .then(data => {
                            console.log(data);
                            if (data.result) {
                                find.quantity++;
                                this.countSum();
                            } else {
                                console.log(error);
                            }
                        })
                        .catch(error => console.log(error))
                    // не получится обратиться к компоненту cart-page, тк его пока нет на странице catalog.html
                    // console.log(this.$parent.$refs.cart-page.cartUrl);
                // } else {
                // если в корзине есть товар с таким id, но цвет или размер отличается - добавляем новый товар

                // }
            } else {
                // добавляем в корзину новый товар
                let productToCart = Object.assign({quantity: 1}, product);
                this.$parent.postJson(this.cartUrl, productToCart)
                    .then(data => {
                        if (data.result) {
                            console.log(data.result);
                            this.cartProducts.push(productToCart);
                            this.quantityChange();
                            // увеличить сумму
                            this.countSum();
                        } else {
                            console.log(error);
                        }
                    })
                    .catch(error => console.log(error))
            }
        },
        removeFromCart(item) {
            // по @remove мы отправляем объект товара для удаления
            // находим в массиве cartProducts: [] товар, id которого равен id объекта товара для удаления
            let product = this.cartProducts.find((el) => item.id_product === el.id_product);
            if (product.quantity > 1) {
                this.$parent.putJson(`/cart/${product.id_product}`, {quantity: -1})
                    .then(data => {
                        if (data.result) {
                            product.quantity--;
                            this.countSum();
                            // удаляем товар из компонента cartPage
                            let cartPageProduct = this.$parent.$refs.cartPage.cartProducts.find((el) => product.id_product === el.id_product);
                            cartPageProduct.quantity--;
                            this.$parent.$refs.cartPage.totalAmount = this.totalAmount;
                        } else {
                            console.log(error);
                        }
                    })
                    .catch(error => console.log(error))
            } else {
                // отправляем на сервер id объекта товара для удаления
                // 1
                this.$parent.deleteJson(`/cart/${product.id_product}`)
                    // 7
                    .then(data => {
                        if (data.result) {
                            // если на сервере товар удалился из корзины, удаляем его на фронте
                            // из массива cartProducts: [] компонента cart
                            this.cartProducts.splice(this.cartProducts.indexOf(product), 1);
                            // this.$parent.$refs.cart.cartProducts.splice(
                            //     this.$parent.$refs.cart.cartProducts.indexOf(product), 1
                            // );
                            this.countSum();
                            this.productsQuantity = this.cartProducts.length;
                            // удаляем товар из компонента cartPage
                            let cartPageProduct = this.$parent.$refs.cartPage.cartProducts.find((el) => product.id_product === el.id_product);
                            this.$parent.$refs.cartPage.cartProducts.splice(this.$parent.$refs.cartPage.cartProducts.indexOf(cartPageProduct), 1);
                            this.$parent.$refs.cartPage.totalAmount = this.totalAmount;
                            this.$parent.$refs.cartPage.quantity = this.quantity;
                        } else {
                            console.log(error);
                        }
                    })
                    .catch(error => console.log(error))
            }
        },
        countSum() {
            this.totalAmount = 0;
            for (let el of this.cartProducts) {
                let prodTotal = el.price * el.quantity;
                this.totalAmount += prodTotal;
            }
        },
        quantityChange() {
            this.productsQuantity = this.cartProducts.length;
        }
    },
    mounted() {
        // в момент загрузки страницы /mycart
        // делаем GET запрос по URL '/cart' и получаем ответ - объект корзины без Vue-обёрток геттеров и сеттеров
        // т.к. в JSON получаем объект, в котором только data.contents - массив обьектов товаров корзины
        this.$parent.getJson(this.cartUrl)
            .then(data => {
                for (let el of data.contents) {
                    // каждый товар корзины пушим в массив cartProducts: [] компонента CartPage
                    this.cartProducts.push(el);

                    // в mounted нельзя получить данные другого компонента, здесь рано!!!
                    // this.$parent.$refs.cart.cartProducts.push(el);
                }
                this.totalAmount = data.totalAmount;
                this.productsQuantity = data.productsQuantity;
            })
    },
    template: `<div class="header__right_cart-box">
<!--                    <a href="basket.html" class="cart">-->
                    <a href="cart.html" class="cart">
                        <cart-quantity :quantity-in-cart="productsQuantity"></cart-quantity>
                        <img src="img/cart.svg" alt="" class="cart__img">
                    </a>
                    <div class="menu-drop cart-drop">
                        <div class="menu-drop__box">
                            <p class="cart_empty" v-if="cartProducts.length < 1">Cart is empty</p>
                            <cartProd
                                v-for="item of cartProducts"
                                :key="item.id_product"
                                :cart-item="item">
                            </cartProd>
                            <div class="cart-bottom" v-if="cartProducts.length > 0">
                                <total :sum="totalAmount"></total>
                                <a href="checkout.html" class="menu-drop__checkout-button">Checkout</a>
                                <a href="cart.html" class="menu-drop__cart-button">go to cart</a>
                            </div>
                        </div>
                    </div>
                </div>`
});

Vue.component('cartProd', {
    props: ['cartItem'],
    computed: {
        imgName() {
            return 'img/' + this.cartItem.id_product + '_' + '1.jpg';
        }
    },
    template: `<div class="menu-drop__product">
                    <div class="menu-drop__product-container">
                        <a href="product.html"><img :src="imgName" alt="" class="menu-drop__product-img"></a>
                        <div class="menu-drop__product-box">
                            <a href="product.html" class="menu-drop__product-text">{{cartItem.product_name}}</a>
                            <p class="menu-drop__product-rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star-half-alt"></i>
                            </p>
                            <p class="menu-drop__product-price">{{cartItem.quantity}}  x   {{cartItem.price}}</p>
                        </div>
                    </div>
                    <a href="#" @click.prevent="$root.$refs.cart.removeFromCart(cartItem)" class="action__button"><i class="fas fa-times-circle"></i></a>
                </div>`
});

Vue.component('total', {
    props: ['sum'],
    template: `<div class="cart__total">
                    <p class="cart__total-text">TOTAL</p>
                    <p class="cart__total-sum">$ {{sum}}</p>
               </div>`
});

Vue.component('cartQuantity', {
    props: ['quantityInCart'],
    template: `<div v-if="quantityInCart > 0" class="cart__quantity">
                   <p class="cart__quantity-text">{{quantityInCart}}</p>
               </div>`
});