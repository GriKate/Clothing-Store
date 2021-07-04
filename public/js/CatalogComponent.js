Vue.component('catalog', {
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
            let start = this.num * (pageNum - 1);
            let end = parseInt(start + this.num);
            this.currentSlice = this.filtered.slice(start, end);
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
        filterName(value) {
            let regexp = new RegExp(value, 'i');
            this.filtered = this.filtered.filter(el => regexp.test(el.product_name));
            this.$parent.$refs.catalogPages.countPages(this.filtered.length);
            this.$parent.$refs.catalogPages.currentPage = 1;
            this.sliceCatalog(this.$parent.$refs.catalogPages.currentPage);
        },
        filterPrice(min, max) {
            this.filtered = [];
            for (let el of this.products) {
                if (el.price >= min && el.price <= max) {
                    this.filtered.push(el);
                }
            }

            if (this.$parent.$refs.search.searchLine) {
                this.filterName(this.$parent.$refs.search.searchLine);
                return;
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
                    this.filtered.push(el);
                }
                this.getRandom();
                if (this.num >= 9) {
                    this.$parent.$refs.catalogPages.countPages(this.filtered.length);
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
    computed: {
        imgName() {
            let img = this.img + this.productItem.id_product + '_' + this.currentImg + '.jpg';
            return 'url(' + img + ')';
        }
    },
    template: `<li class="products__item">
                    <a href="product.html" class="products__link-img" :style="{backgroundImage: imgName}">
                    </a>
                    
                    <div class="products__name">
                        <a href="product.html" class="products__link-name">{{productItem.product_name}}</a>
                        <p class="products__link-price">$ {{productItem.price}}</p>
                    </div>
                    <a href="#" class="product__hover_cart" @click.prevent="$root.$refs.cart.addToCart(productItem)">
                        <img src="img/cart_white.svg" alt="" class="product__hover_cart-img">Add to cart
                    </a>
                    <a href="#" class="product__hover_switch" @click.prevent="switchPhoto(productItem.id_product)">
                    </a>
                    <a href="#" class="product__hover_like">
                        <img src="img/heart.svg" alt="" class="product__hover_button-img">
                    </a>
                </li>`
});
