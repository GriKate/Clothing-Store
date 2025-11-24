Vue.component('product-component', {
    data() {
        return {
            urlProduct: '/entity',
            product: {},
            colors: [],
            currentColor: ''
        }
    },
    methods: {
        setCurrentColor(e) {
            const colorName = e.target.value.toLowerCase();
            this.currentColor = colorName;
        }
    },
    mounted() {
        this.$parent.getJson(`${this.urlProduct}/502`)
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
                        <button class="carousel__controls carousel__controls_left" aria-label="previous image" title="previous image">
                            <i class="fas fa-chevron-left carousel__arrow"></i>
                        </button>
                        <button class="carousel__controls carousel__controls_right" aria-label="next image" title="next image">
                            <i class="fas fa-chevron-right carousel__arrow"></i>
                        </button>
                    </div>
                    <div class="product__description">
                        <div class="product__container">
                            <div class="product__box">
                                <div class="product__header">
                                    <span class="collection__name">{{product.collection}}</span>
                                    <div class="pink__line"></div>
                                    <h1 class="product__name">{{product.product_name}}</h1>
                                </div>
                                <div class="product__features">
                                    <p class="product__text">Compellingly actualize fully researched processes before proactive outsourcing. Progressively syndicate collaborative architectures before cutting-edge services. Completely visualize parallel core competencies rather than exceptional portals. </p>
                                    <div class="product__other">
                                        <p class="material">FABRIC: <span class="dark__grey">{{product.fabric}}</span></p>
                                        <p class="designer">DESIGNER: <span class="dark__grey">{{product.designer}}</span></p>
                                    </div>
                                    <p class="price">$ {{product.price}}</p>
                                </div>
                                <div class="choose__container">
                                    <div class="choose__block">
                                        <div class="choose__drop">
                                            <p class="choose__text">CHOOSE COLOR</p>
                                            <form 
                                                class="color__form" 
                                                id="choose-form"
                                                @submit.prevent="$parent.$refs.cart.addToCart(product)"
                                            >
                                                <div 
                                                    class="color__form_color" 
                                                    :style="{ backgroundColor: currentColor }"
                                                ></div>
                                                <select 
                                                    name="color" 
                                                    id="1" 
                                                    v-model="product.color" 
                                                    class="choose__list" 
                                                    aria-label="choose color" 
                                                    @change="setCurrentColor"
                                                    required
                                                >
                                                    <option value="" disabled selected>Color...</option>
                                                    <option 
                                                        v-for="color of colors" 
                                                        :key="color" 
                                                        :value="color" 
                                                        class="color__item"
                                                    >
                                                        {{color}}
                                                    </option>
                                                </select>
                                            </form>
                                        </div>
                                        <div class="choose__drop">
                                            <p class="choose__text">CHOOSE SIZE</p>
                                            <div class="size__form">
                                                <select 
                                                    name="size" 
                                                    form="choose-form"
                                                    v-model="product.size" 
                                                    class="size__list" 
                                                    aria-label="choose size" 
                                                    required
                                                >
                                                    <option value="" disabled selected>Size...</option>
                                                    <option :value="'XS'" class="size__item">XS</option>
                                                    <option :value="'S'" class="size__item">S</option>
                                                    <option :value="'M'" class="size__item">M</option>
                                                    <option :value="'L'" class="size__item">L</option>
                                                    <option :value="'XL'" class="size__item">XL</option>
                                                    <option :value="'XXL'" class="size__item">XXL</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="choose__drop">
                                            <p class="choose__text">QUANTITY</p>
                                            <div class="quantity__form">
                                                <input 
                                                    type="number" 
                                                    name="quantity" 
                                                    form="choose-form"
                                                    min="1" 
                                                    placeholder="Set quantity..." 
                                                    value="1" 
                                                    v-model="product.quantity" 
                                                    @focus="$event.target.value = ''" 
                                                    class="quantity__input"
                                                    required
                                                >
                                            </div>
                                            <p class="quantity__input_empty" v-if="product.quantity < 1">Enter a value <br>greater than 1</p>
                                        </div>
                                    </div>
                                    <div class="cart__add">
                                        <button 
                                            type="submit"
                                            class="cart__button" 
                                            form="choose-form"
                                            
                                        >
                                            <div class="pink__cart"></div>
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>`
});