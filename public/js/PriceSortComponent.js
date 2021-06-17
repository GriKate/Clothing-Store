Vue.component('priceSort', {
    data() {
        return {
            currentMinPrice: 0,
            currentMaxPrice: 100,
            inputMin: '',
            inputMax: '',
        }
    },
    watch: {
        currentMinPrice() {
            this.currentMinPrice = parseInt(this.currentMinPrice);
        },
        currentMaxPrice() {
            this.currentMaxPrice = parseInt(this.currentMaxPrice);
        }
    },
    methods: {
        priceBtn(e) {
            // console.log(e);
            let onMouseMove = () => {
                this.setPrice();
            };
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            function onMouseUp() {
                document.removeEventListener('mouseup', onMouseUp);
                document.removeEventListener('mousemove', onMouseMove);
            }
        },
        setPrice() {
            // при движении ползунков в minPrice попадает значение на $1 меньше/больше отображаемого
            // при движении ползунков в maxPrice попадает значение на $1 меньше отображаемого
            // при очень быстром перемещении ползунков. в инпуте видим 25, в цене записалось 24

            let minPrice = parseInt(this.inputMin.value);
            let maxPrice = parseInt(this.inputMax.value);
            // console.log(this.inputMin.value);
            // console.log(minPrice);
            // console.log(this.inputMax.value);
            // console.log(maxPrice);

            if (minPrice < this.currentMaxPrice && maxPrice > this.currentMinPrice) {

                // сюда не попадаем, когда вводим макс цену после переезда ползунков друг за друга
                // ползунки разъезжаются, но сюда не попадаем
                this.currentMinPrice = minPrice;
                this.currentMaxPrice = maxPrice;
                this.$parent.$refs.catalog.filterPrice(this.currentMinPrice, this.currentMaxPrice);
            }
        }
    },
    mounted() {
        // price number inputs
        this.inputMin = document.querySelector('#min-price-input');
        this.inputMax = document.querySelector('#max-price-input');
    },
    template: `<div class="choice__section">
                    <h3 class="choice__head">Price</h3>
                    <div class="choice__box">
                        <div class="choice__price_line">
                            <div class="choice__price_bar"></div>
                            <button 
                                class="choice__price_handle handle-min"
                                id="min-price-button"
                                @mousedown.prevent="priceBtn($event)"
                                style="left: -6px;">
                            </button>
                            <button
                                class="choice__price_handle handle-max"
                                id="max-price-button"
                                @mousedown.prevent="priceBtn($event)"
                                style="right: -6px;">
                            </button>
                        </div>
                        <div class="choice__price">
                            <form @submit.prevent="setPrice">
                                <input
                                type="text"
                                id="min-price-input"
                                class="choice__price_input"
                                name="min-interval"
                                v-model="currentMinPrice">
                            </form>
                            <form @submit.prevent="setPrice">
                                <input
                                type="text"
                                id="max-price-input"
                                class="choice__price_input"
                                name="max-interval"
                                v-model="currentMaxPrice">
                            </form>
                        </div>
                    </div>
                </div>`
});
