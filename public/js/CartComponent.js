Vue.component('cart-component', {
    data() {
        return {
            cartUrl: '/getCart',
            cartProducts: [],
            totalAmount: 0,
            productsQuantity: 0,
        }
    },
    methods: {
        addToCart(product) {
            let find = this.cartProducts.find((el) => product.id_product === el.id_product);

            // if it is the product is in cart with same color and size
            if (find && product.color === find.color && product.size === find.size) {
                let currentQuantity = this.setQuantity(find.quantity, product.quantity);

                this.$parent.putJson(`/getCart/${product.id_product}`, {quantity: currentQuantity})
                    .then(data => {
                        if (data.result) {
                            if (!product.quantity) {
                                find.quantity++;
                            } else {
                                find.quantity = currentQuantity;
                            }
                            this.countSum();
                        }
                    })
                    .catch(error => console.log(error))

            } else {
                // if it is no product with this id
                let productToCart = Object.assign({quantity: 1}, product);
                this.$parent.postJson(this.cartUrl, productToCart)
                    .then(data => {
                        if (data.result) {
                            this.cartProducts.push(productToCart);
                            this.quantityChange();
                            this.countSum();
                        }
                    })
                    .catch(error => console.log(error))
            }
        },
        setQuantity(oldProdQuantity, newProdQuantity) {
            if (newProdQuantity) {
                newProdQuantity = Math.abs(newProdQuantity);
                let totalQuantity = oldProdQuantity + newProdQuantity;
                return totalQuantity;
            }
            return 1;
        },
        removeFromCart(item) {
            let product = this.cartProducts.find((el) => item.id_product === el.id_product);
            if (product.quantity > 1) {
                this.$parent.putJson(`/getCart/${product.id_product}`, {quantity: -1})
                    .then(data => {
                        if (data.result) {
                            product.quantity--;
                            this.countSum();
                        }
                    })
                    .catch(error => console.log(error))
            } else {
                this.$parent.deleteJson(`/getCart/${product.id_product}`)
                    .then(data => {
                        if (data.result) {
                            this.cartProducts.splice(this.cartProducts.indexOf(product), 1);
                            this.countSum();
                            this.productsQuantity = this.cartProducts.length;
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
        this.$parent.getJson(this.cartUrl)
            .then(data => {
                for (let el of data.contents) {
                    this.cartProducts.push(el);
                }
                this.totalAmount = data.totalAmount;
                this.productsQuantity = data.productsQuantity;
            })
    },
    template: `<div class="header__right_cart-box">
                    <a href="cart.html" class="cart">
                        <cart-quantity :quantity-in-cart="productsQuantity"></cart-quantity>
                        <img src="img/cart.svg" alt="cart" class="cart__img">
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
        },
        imgAlt() {
            return this.cartItem.product_name;
        }
    },
    template: `<div class="menu-drop__product">
                    <div class="menu-drop__product-container">
                        <a href="product.html"><img :src="imgName" :alt="imgAlt" class="menu-drop__product-img"></a>
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
                    <button @click.prevent="$root.$refs.cart.removeFromCart(cartItem)" class="action__button" aria-label="remove from Cart">
                        <i class="fas fa-times-circle"></i>
                    </button>
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
