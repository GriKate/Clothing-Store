Vue.component('catalog-component', {
    props: ['num'],
    data() {
        return {
            urlCatalog: '/goods',
            products: [],
            filtered: [],
            currentInputMinPrice: 0,
            currentInputMaxPrice: 100,
            searchName: "",
            random: [],
            currentSlice: [],
            productImgPath: 'img/',
        }
    },
    watch: {
        currentInputMinPrice() {
            this.filterProducts();
        },
        currentInputMaxPrice() {
            this.filterProducts();
        },
        searchName() {
            this.filterProducts();
        }
    },
    methods: {
        setCurrentMinPrice(price) {
            this.currentInputMinPrice = price;
        },
        setCurrentMaxPrice(price) {
            this.currentInputMaxPrice = price;
        },
        setSearchName(searchName) {
            this.searchName = searchName;
        },

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

        filterProducts() {
            if(this.searchName) {
                const regexp = new RegExp(this.searchName, 'i');
                this.filtered = this.products.filter(el => regexp.test(el.product_name));
                this.filtered = this.filtered.filter(el => el.price >= this.currentInputMinPrice && el.price <= this.currentInputMaxPrice);
            } else {
                this.filtered = this.products.filter(el => el.price >= this.currentInputMinPrice && el.price <= this.currentInputMaxPrice);
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
                        <div 
                            v-if="filtered.length === 0 && (searchName || currentInputMinPrice || currentInputMaxPrice !== 100)" 
                            style="width: 100%; text-align: center;"
                        >
                            No matching products
                        </div>
                        <catalog-product 
                            v-else
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
