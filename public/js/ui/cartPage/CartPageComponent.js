Vue.component('cartPage', {
    data() {
        return {
            cartUrl: '/getCart',
            cartProducts: [],
            totalAmount: 0,
            productsQuantity: 0,
        }
    },
    methods: {
        changeQuantity(item) {
            const existingProduct = this.cartProducts.find((el) => el.id === item.id);

            if (existingProduct.quantity >= 1) {
                this.$parent.putJson(`${this.cartUrl}/${existingProduct.id}`, {
                    quantity: existingProduct.quantity
                })
                    .then(data => {
                        if (data.result) {
                            this.setTotalSum();
                            const cartComponentProduct = this.$parent.$refs.cart.cartProducts.find( el => el.id === existingProduct.id);
                            cartComponentProduct.quantity = existingProduct.quantity;
                            this.$parent.$refs.cart.totalAmount = this.totalAmount;
                        } else {
                            console.log(error);
                        }
                    })
                    .catch(error => console.log(error))
            }
        },
        removeFromCart(item) {
            const productToDelete = this.cartProducts.find((el) => el.id === item.id);

                this.$parent.deleteJson(`${this.cartUrl}/${productToDelete.id}`)
                    .then(data => {
                        if (data.result) {
                            this.cartProducts.splice(this.cartProducts.indexOf(productToDelete), 1);
                            this.setTotalSum();
                            this.setTotalQuantity();

                            const cartComponentProduct = this.$parent.$refs.cart.cartProducts.find( el => el.id === productToDelete.id);

                            const index = this.$parent.$refs.cart.cartProducts.indexOf(cartComponentProduct);
                            this.$parent.$refs.cart.cartProducts.splice(index, 1);

                            this.$parent.$refs.cart.totalAmount = this.totalAmount;
                            this.$parent.$refs.cart.productsQuantity = this.productsQuantity;
                        } else {
                            console.log(error);
                        }
                    })
                    .catch(error => console.log(error))
        },
        removeAll() {
            this.$parent.deleteJson(this.cartUrl)
                .then(data => {
                    if (data) {
                        this.cartProducts = [];
                        this.$parent.$refs.cart.cartProducts = [];
                        this.setTotalSum();
                        this.$parent.$refs.cart.totalAmount = this.totalAmount;
                        this.setTotalQuantity();
                        this.$parent.$refs.cart.productsQuantity = this.productsQuantity;
                    } else {
                        console.log(error);
                    }
                })
                .catch(error => {
                    console.log(error)
                })
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
        },
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
    template: `<div class="basket__section-container">
                    <div class="basket__section_empty" v-if="cartProducts.length === 0">
                        <a href="catalog.html" class="pink-button">START SHOPPING</a>
                    </div>
                    <table class="basket__section-table" v-if="cartProducts.length > 0">
                        <thead class="basket__table-head">
                            <tr class="table__head-row">
                                <td class="product__head"><span>Product Details</span></td>
                                <td class="table__head-cell"><span>unite Price</span></td>
                                <td class="table__head-cell table__head-padding"><span>Quantity</span></td>
                                <td class="table__head-cell table__head-padding"><span>shipping</span></td>
                                <td class="table__head-cell table__head-padding"><span>Subtotal</span></td>
                                <td class="table__head-cell"><span>ACTION</span></td>
                            </tr>
                        </thead>
                        <tbody class="basket__table-body">
                        
                            <cartPageProduct
                                v-for="item of cartProducts" 
                                :key="item.id" 
                                :cart-prod="item"
                                @change="changeQuantity"
                                @remove="removeFromCart">
                            </cartPageProduct>
                            
                        </tbody>
                    </table>
                    <div class="basket__button-box" v-if="cartProducts.length > 0">
                        <button class="basket__button" @click="removeAll">cLEAR SHOPPING CART</button>
                        <a href="catalog.html" class="basket__button">cONTINUE sHOPPING</a>
                    </div>

                    <div class="basket__info" v-if="cartProducts.length > 0">
                        <form class="basket__form">
                            <span class="basket__form_head">
                                Shipping Adress
                                <i class="fas fa-caret-down triangle-grey select__country_triangle"></i>
                            </span>
                            <select name="state" id="" class="coupon__form_input coupon__form_input-select" required>
                                <option value="" class="select__country">Choose State</option>
                                <option value="Bangladesh" class="select__country">Bangladesh</option>
                                <option value="Great Britain" class="select__country">Great Britain</option>
                                <option value="Russia" class="select__country">Russia</option>
                            </select>
                            
                            <input type="text" name="address" class="coupon__form_input" placeholder="Address" required>
                            <input type="number" name="postcode" class="coupon__form_input" placeholder="Postcode / Zip" required>
                            <button class="coupon__form_button">get a quote</button>
                        </form>

                        <form class="basket__form">
                            <span class="basket__form_head">coupon  discount</span>
                            <p class="coupon__text">Enter your coupon code if you have one</p>
                            <input type="text" name="coupon" class="coupon__form_input coupon__input" placeholder="Coupon Number" required>
                            <button class="coupon__form_button">Apply coupon</button>
                        </form>

                        <div class="basket__checkout">
                            <div class="basket__checkout-summary">
                                <div class="basket__checkout-summary__subtotal">
                                    Sub total
                                    <span class="subtotal-value">$ {{totalAmount}}</span>
                                </div>
                                <div class="basket__checkout-summary__grandtotal">
                                    GRAND TOTAL
                                    <span class="grandtotal-value">$ {{totalAmount}}</span>
                                </div>
                            </div>
                            <a href="checkout.html" class="pink-button">proceed to checkout</a>
                        </div>
                    </div>
                </div>`
});


Vue.component('cartPageProduct', {
    props: ['cartProd'],
    computed: {
        imgName() {
            return 'img/' + this.cartProd.id_product + '_' + '1.jpg';
        },
        imgAlt() {
            return this.cartProd.product_name;
        }
    },
    template: `<tr class="table__body-row">
                    <td class="table__body-cell product__cell">
                        <a href="product.html" class="product__img-link"><img :src="imgName" :alt="imgAlt" class="product__img"></a>
                        <div class="product__cell-text">
                            <a href="product.html" class="product__name-link">{{cartProd.product_name}}</a>
                            <div class="product__features-box">
                                Color:
                                <span class="product__features-value">{{cartProd.color}}</span>
                            </div>
                            <div class="product__features-box">
                                Size:
                                <span class="product__features-value">{{cartProd.size}}</span>
                            </div>
                        </div>
                    </td>
                    <td class="table__body-cell">
                        <span>$ {{cartProd.price}}</span>
                    </td>
                    <td class="table__body-cell">
                        <form @input.prevent="$emit('change', cartProd)" class="quantity__form">
                            <input 
                                type="number" 
                                name="quantity" 
                                min="1" 
                                v-model="cartProd.quantity" 
                                class="quantity__num-input" 
                                aria-label="quantity"
                            >
                        </form>
                        <p class="quantity__input_empty" v-if="cartProd.quantity < 1">Enter a value <br>greater than 1</p>
                    </td>
                    <td class="table__body-cell">
                        <p class="shipping__value">FREE</p>
                    </td>
                    <td class="table__body-cell">
                        <p class="subtotal__value">$ {{cartProd.quantity * cartProd.price}}</p>
                    </td>
                    <td class="table__body-cell">
                        <button @click.prevent="$emit('remove', cartProd)" class="delete-button__link" aria-label="remove item">
                            <i class="fas fa-times-circle"></i>
                        </button>
                    </td>
                </tr>`
});

