Vue.component('product', {
    data() {
        return {
            urlProduct: '/entity',
            product: {},
            colors: []
        }
    },
    methods: {
        setProduct(product) {
            this.product = product;
        },
        setQuantity(event) {
            this.product.quantity = event.target.value;
            console.log(this.product.quantity);
        },
        setColor(event) {
            // в <select> можно было использовать v-model="product.color" для мгновенного задания значения,
            // вместо вызова метода, но тогда не отображалось бы <option disabled selected>Color...
            // т.к. v-model="product.color" сразу же задает значение "" для color, и в <option> отображается пустота
            this.product.color = event.target.value;
        },
        setSize(event) {
            this.product.size = event.target.value;
        }
    },
    mounted() {
        this.$parent.getJson(`/entity/502`)
            .then(data => {
                this.product = data;
            });
        this.$parent.getJson(`/colors`)
            .then(data => {
                this.colors = data.colors;
            });
    },
    template: `<section class="product">
                    <div class="product__carousel">
                        <div class="carousel__container">
                            <div class="product__img"></div>
                        </div>
                        <a href="#" class="carousel__controls carousel__controls_left">
                            <i class="fas fa-chevron-left carousel__arrow"></i>
                        </a>
                        <a href="#" class="carousel__controls carousel__controls_right">
                            <i class="fas fa-chevron-right carousel__arrow"></i>
                        </a>
                    </div>
                    <div class="product__description">
                        <div class="product__container">
                            <div class="product__box">
                                <div class="product__head">
                                    <h3 class="collection__name">{{product.collection}}</h3>
                                    <div class="pink__line"></div>
                                    <h3 class="product__name">{{product.product_name}}</h3>
                                </div>
                                <div class="product__features">
                                    <p class="product__text">Compellingly actualize fully researched processes before proactive outsourcing. Progressively syndicate collaborative architectures before cutting-edge services. Completely visualize parallel core competencies rather than exceptional portals. </p>
                                    <div class="product__other">
                                        <p class="material">FABRIC: <span class="dark__grey">{{product.fabric}}</span></p>
                                        <p class="designer">DESIGNER: <span class="dark__grey">{{product.designer}}</span></p>
                                    </div>
                                    <p class="price">$ {{product.price}}</p>
                                </div>
                                <div class="choose__block">
                                    <div class="choose__drop">
                                        <p class="choose__text">CHOOSE COLOR</p>
                                        <form class="color__form">
<!-- в <select> можно было использовать v-model="product.color" для мгновенного задания значения, вместо вызова метода, но тогда не отображалось бы -->
<!--<option disabled selected>Color... т.к. v-model="product.color" сразу же задает значение "" для color, и в <option> отображается пустота -->
                                            <select name="" id="1" required @change="setColor($event)" class="choose__list">
                                                <option disabled selected>Color...</option>
                                                <color 
                                                v-for="color of colors" 
                                                :key="color"
                                                :color="color"
                                                ></color>
                                            </select>
                                        </form>
                                    </div>
                                    <div class="choose__drop">
                                        <p class="choose__text">CHOOSE SIZE</p>
                                        <form action="#" class="size__form">
                                            <select name="" id="" required @change="setSize($event)" class="size__list">
                                                <option disabled selected>Size...</option>
                                                <option :value="'XS'" class="size__item">XS</option>
                                                <option :value="'S'" class="size__item">S</option>
                                                <option :value="'M'" class="size__item">M</option>
                                                <option :value="'L'" class="size__item">L</option>
                                                <option :value="'XL'" class="size__item">XL</option>
                                                <option :value="'XXL'" class="size__item">XXL</option>
                                            </select>
                                        </form>
                                    </div>
                                    <div class="choose__drop">
                                        <p class="choose__text">QUANTITY</p>
                                        <form class="quantity__form">
                                            <input type="number" min="1" required placeholder="Set quantity..." value="1" @input="setQuantity($event)" class="quantity__input">
                                        </form>
                                        <p class="quantity__input_empty" v-if="product.quantity < 1">Enter a value <br>greater than 1</p>
                                    </div>
                                </div>
                                <div class="cart__add">
                                    <form action="#" class="cart__add-form">
                                        <a href="#" class="cart__button" @click.prevent="$parent.$refs.cart.addToCart(product)"><div class="pink__cart"></div>Add to cart</a>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>`
});

Vue.component('color', {
    props: ['color'],
    template: `<option :value="color" class="color__item">{{color}}</option>`
});
