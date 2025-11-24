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
            const findExactMatch = this.cartProducts.find( el => 
                product.id_product === el.id_product && 
                product.color === el.color && 
                product.size === el.size
            );

            if (findExactMatch) {
                this.addExistingProduct(findExactMatch, parseInt(product.quantity));
            } else {
                this.addNewProduct(product);
            }
        },
        
        addExistingProduct(existingProduct, newProdQuantity) {
            const currentQuantity = this.setProdQuantity(existingProduct.quantity, newProdQuantity);
            
            this.$parent.putJson(`${this.cartUrl}/${existingProduct.id}`, {
                quantity: currentQuantity
            })
                .then(data => {
                    if (data.result) {
                        existingProduct.quantity = newProdQuantity ? currentQuantity : existingProduct.quantity + 1;
                        this.setTotalSum();
                        this.setTotalQuantity();
                    }
                })
                .catch(error => console.log(error))
        },

        addNewProduct(product) {
            const productToCart = {
                id: Math.floor(Math.random() * 1000),
                quantity: 1,
                ...product
            };
            
            this.$parent.postJson(this.cartUrl, productToCart)
                .then(data => {
                    if (data.result) {
                        this.cartProducts.push(productToCart);
                        this.setTotalQuantity();
                        this.setTotalSum();
                    }
                })
                .catch(error => console.log(error))
        },

        setProdQuantity(oldProdQuantity, newProdQuantity) {
            if (newProdQuantity) {
                newProdQuantity = Math.abs(newProdQuantity);
                const totalQuantity = parseInt(oldProdQuantity) + parseInt(newProdQuantity);
                return totalQuantity;
            }
            return 1;
        },

        removeItem(item) {
            const existingProduct = this.cartProducts.find( el => el.id === item.id);

            if (existingProduct.quantity > 1) {
                this.$parent.putJson(`${this.cartUrl}/${existingProduct.id}`, {quantity: -1})
                    .then(data => {
                        if (data.result) {
                            existingProduct.quantity--;
                            this.setTotalSum();
                            this.setTotalQuantity();
                        }
                    })
                    .catch(error => console.log(error))
            } else {
                this.removeFromCart(item);
            }
        },

        removeFromCart(item) {
            this.$parent.deleteJson(`${this.cartUrl}/${item.id}`)
                .then(data => {
                    if (data.result) {
                        this.cartProducts.splice(this.cartProducts.indexOf(item), 1);
                        this.setTotalSum();
                        this.setTotalQuantity();
                    }
                })
                .catch(error => console.log(error))
        },

        setTotalSum() {
            this.totalAmount = 0;
            this.cartProducts.map( el => {
                const prodTotal = el.price * el.quantity;
                this.totalAmount += prodTotal;
            })
        },
        setTotalQuantity() {
            this.productsQuantity = 0;
            this.cartProducts.map( el => this.productsQuantity += parseInt(el.quantity));
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
                                :key="item.id"
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
                            <div class="menu-drop__product-rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star-half-alt"></i>
                            </div>
                            <div class="menu-drop__product-price">{{cartItem.quantity}}  x   {{cartItem.price}}</div>
                        </div>
                    </div>
                    <button @click.prevent="$root.$refs.cart.removeItem(cartItem)" class="action__button" aria-label="remove from Cart">
                        <i class="fas fa-times-circle"></i>
                    </button>
                </div>`
});

Vue.component('total', {
    props: ['sum'],
    template: `<div class="cart__total">
                    <span class="cart__total-text">TOTAL</span>
                    <span class="cart__total-sum">$ {{sum}}</span>
               </div>`
});

Vue.component('cartQuantity', {
    props: ['quantityInCart'],
    template: `<div v-if="quantityInCart > 0" class="cart__quantity">
                   <span class="cart__quantity-text">{{quantityInCart}}</span>
               </div>`
});
