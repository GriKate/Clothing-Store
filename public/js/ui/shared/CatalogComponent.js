Vue.component('catalog-component', {
    props: ['num'],
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
            const start = this.num * (pageNum - 1);
            const end = parseInt(start + this.num);
            if (Array.isArray(this.filtered) && this.filtered.length === 0) {
                this.currentSlice = this.products.slice(start, end);
            } else {
                this.currentSlice = this.filtered.slice(start, end);
            }
        },

        getRandom() {
            let products = this.products;
            let j, temp;
            for (let i = products.length - 1; i > 0; i--){
                j = Math.floor(Math.random()*(i + 1));
                temp = products[j];
                products[j] = products[i];
                products[i] = temp;
            }
            this.random = products.slice(0, this.num);
        },

        filterName(value, arr) {
            const regexp = new RegExp(value, 'i');

            if (arr === "filtered" || Array.isArray(this.filtered) && this.filtered.length > 0) {
                this.filtered = this.filtered.filter(el => regexp.test(el.product_name));
            } else {
                this.filtered = this.products.filter(el => regexp.test(el.product_name));
            }
            this.$parent.$refs.catalogPages.countPages(this.filtered.length);
            this.$parent.$refs.catalogPages.currentPage = 1;
            this.sliceCatalog(this.$parent.$refs.catalogPages.currentPage);
        },

        filterPrice(min, max) {
            if (Array.isArray(this.filtered) && this.filtered.length === 0) {
                this.products.map(el => {
                    if (el.price >= min && el.price <= max) {
                        this.filtered.push(el);
                    }
                })
                if (this.$parent.$refs.search.searchLine) {
                    this.filterName(this.$parent.$refs.search.searchLine, "filtered");
                    return;
                }
            } else {
                if (this.$parent.$refs.search.searchLine) {
                    this.filtered = this.filtered.filter(el => el.price >= min && el.price <= max)
                } else {
                    this.filtered = [];
                    this.products.map(el => {
                        if (el.price >= min && el.price <= max) {
                            this.filtered.push(el);
                        }
                    })
                }
            }
            this.$parent.$refs.catalogPages.countPages(this.filtered.length);
            this.$parent.$refs.catalogPages.currentPage = 1;
            this.sliceCatalog(this.$parent.$refs.catalogPages.currentPage);
        },
    },
    mounted() {
        this.$parent.getJson(this.urlCatalog)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
                this.getRandom();
                if (this.num >= 9) {
                    this.$parent.$refs.catalogPages.countPages(this.products.length);
                    this.sliceCatalog(1);
                }
            })
    },
    template: `<div>
                    <ul class="products__list" v-if="num === '9'">
                        <catalog-product 
                            v-for="item of currentSlice" 
                            :key="item.id_product" 
                            :product-item="item"
                            :img="productImgPath"
                        > 
                        </catalog-product>
                    </ul>
                    
                    <ul class="products__list" v-else-if="num === '8'">
                        <catalog-product 
                            v-for="item of random" 
                            :key="item.id_product" 
                            :product-item="item"
                            :img="productImgPath"
                        >
                        </catalog-product>
                    </ul>
                    
                    <ul class="products__list" v-else-if="num === '4'">
                        <catalog-product 
                            v-for="item of random" 
                            :key="item.id_product" 
                            :product-item="item"
                            :img="productImgPath"
                        >
                        </catalog-product>
                    </ul>                  
                </div>`
});


Vue.component('catalog-product', {
    props: ['productItem', 'img'],
    data() {
        return {
            currentImgNum: 1,
            productImgs: 3,
        }
    },
    methods: {
        switchPhoto() {
            if (this.currentImgNum < this.productImgs) {
                this.currentImgNum++;
            } else {
                this.currentImgNum = 1;
            }
        }
    },
    computed: {
        imgName() {
            const img = this.img + this.productItem.id_product + '_' + this.currentImgNum + '.jpg';
            return 'url(' + img + ')';
        }
    },
    template: `<li class="products__item">
                    <article class="products__article">
                        <a href="product.html" class="products__link-img" :style="{backgroundImage: imgName}">
                        </a>
                        
                        <div class="products__name">
                            <a href="product.html" class="products__link-name">{{productItem.product_name}}</a>
                            <p class="products__link-price">$ {{productItem.price}}</p>
                        </div>
                        <button class="product__hover_cart" @click.prevent="$root.$refs.cart.addToCart(productItem)">
                            <img src="img/cart_white.svg" alt="cart" class="product__hover_cart-img">Add to cart
                        </button>
                        <button class="product__hover_switch" @click.prevent="switchPhoto">
                        </button>
                        <button class="product__hover_like">
                            <img src="img/heart.svg" alt="favourites" class="product__hover_button-img">
                        </button>
                    </article>
                </li>`
});
