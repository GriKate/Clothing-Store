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
            let product = this.cartProducts.find((el) => el.id_product === item.id_product);

            if (product.quantity >= 1) {
                this.$parent.putJson(`/getCart/${product.id_product}`, {quantity: product.quantity})
                    .then(data => {
                        if (data.result) {
                            this.countSum();
                            let cartCompProduct = this.$parent.$refs.cart.cartProducts.find((el) => el.id_product === product.id_product);
                            cartCompProduct.quantity = product.quantity;
                            this.$parent.$refs.cart.totalAmount = this.totalAmount;
                        } else {
                            console.log(error);
                        }
                    })
                    .catch(error => console.log(error))
            }
        },
        removeFromCart(item) {
            let product = this.cartProducts.find((el) => item.id_product === el.id_product);
                this.$parent.deleteJson(`/getCart/${product.id_product}`)
                    .then(data => {
                        if (data.result) {
                            this.cartProducts.splice(this.cartProducts.indexOf(product), 1);
                            this.countSum();
                            this.quantityChange();

                            let cartCompProduct = this.$parent.$refs.cart.cartProducts.find((el) => product.id_product === el.id_product);
                            this.$parent.$refs.cart.cartProducts.splice(this.cartProducts.indexOf(cartCompProduct), 1);
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
                        this.countSum();
                        this.$parent.$refs.cart.totalAmount = this.totalAmount;
                        this.quantityChange();
                        this.$parent.$refs.cart.productsQuantity = this.productsQuantity;
                    } else {
                        console.log(error);
                    }
                })
                .catch(error => {
                    console.log(error)
                })
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
                                <td class="product__head">Product Details</td>
                                <td class="price__head">unite Price</td>
                                <td class="quantity__head table__head-padding">Quantity</td>
                                <td class="shipping__head table__head-padding">shipping</td>
                                <td class="subtotal__head table__head-padding">Subtotal</td>
                                <td class="action__head">ACTION</td>
                            </tr>
                        </thead>
                        <tbody class="basket__table-body">
                        
                            <cartPageProduct
                                v-for="item of cartProducts" 
                                :key="item.id_product" 
                                :cart-prod="item"
                                @change="changeQuantity"
                                @remove="removeFromCart">
                            </cartPageProduct>
                            
                        </tbody>
                    </table>
                    <div class="basket__buttons" v-if="cartProducts.length > 0">
                        <button class="cart__button" @click="removeAll">cLEAR SHOPPING CART</button>
                        <a href="catalog.html" class="cart__button">cONTINUE sHOPPING</a>
                    </div>
                    <div class="basket__info" v-if="cartProducts.length > 0">

                            <form class="basket__form-left">
                                <span class="adress__head">Shipping Adress</span>
                                <select name="state" id="" class="coupon__form_input coupon__form_input-select" required>
                                    <option value="" class="select__country">Choose State</option>
                                    <option value="Bangladesh" class="select__country">Bangladesh</option>
                                    <option value="Great Britain" class="select__country">Great Britain</option>
                                    <option value="Russia" class="select__country">Russia</option>
                                </select>
                                <i class="fas fa-caret-down triangle-grey select__country_triangle"></i>
                                <input type="text" name="address" class="coupon__form_input" placeholder="Address" required>
                                <input type="number" name="postcode" class="coupon__form_input" placeholder="Postcode / Zip" required>
                                <button class="coupon__form_button">get a quote</button>
                            </form>
                            <form class="basket__form-right">
                                <span class="coupon__head">coupon  discount</span>
                                <p class="coupon__text">Enter your coupon code if you have one</p>
                                <input type="text" name="coupon" class="coupon__form_input coupon__input" placeholder="Coupon Number">
                                <button class="coupon__form_button">Apply coupon</button>
                            </form>

                        <div class="checkout">
                            <div class="checkout-summary">
                                <p class="checkout-summary__subtotal">Sub total<span class="checkout-summary__subtotal subtotal-value">$ {{totalAmount}}</span></p>
                                <p class="checkout-summary__grandtotal">GRAND TOTAL<span class="checkout-summary__grandtotal grandtotal-value">$ {{totalAmount}}</span></p>
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
                            <a href="product.html" class="product__name">{{cartProd.product_name}}</a>
                            <p class="product__features">Color:<span class="product__features-value">{{cartProd.color}}</span></p>
                            <p class="product__features">Size:<span class="product__features-value">{{cartProd.size}}</span></p>
                        </div>
                    </td>
                    <td class="table__body-cell">
                        <p class="price__value">$ {{cartProd.price}}</p>
                    </td>
                    <td class="table__body-cell">
                        <form @input.prevent="$emit('change', cartProd)" class="quantity__form">
                            <input type="number" name="quantity" min="1" v-model="cartProd.quantity" class="quantity__input" aria-label="quantity">
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

