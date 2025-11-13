Vue.component('priceSort', {
    data() {
        return {
            minPrice: 0,
            maxPrice: 100,
            currentMinPrice: 0,
            currentMaxPrice: 100,
            inputMin: 0,
            inputMax: 100,
            percentMax: 100,
            currentPercentMin: 0,
            currentPercentMax: 100,
            newLeftPosition: 0,
            newRightPosition: 0,
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
        checkInputValue() {
            if (!this.currentMinPrice) {
                this.currentMinPrice = 0;
                console.log('1 Min ' + this.currentMinPrice)
            }

            if (!this.currentMaxPrice) {
                this.currentMaxPrice = 100;
                console.log('1 Max ' + this.currentMaxPrice)
            }
            
            this.currentMinPrice = parseInt(this.currentMinPrice);
            this.currentMaxPrice = parseInt(this.currentMaxPrice);
        },

        moveBtnLeft(event) {

            // width from handler left side to cursor point on handler
            const shiftX = event.clientX - this.buttonMin.getBoundingClientRect().left;

            const onMouseMove = (event) => {
                // new coordinates of left handler
                this.newLeftPosition = event.clientX - this.line.getBoundingClientRect().left - shiftX + this.buttonHalf;

                // when mouse go out left
                if (this.newLeftPosition < 0) {
                    this.newLeftPosition = 0;
                }

                // when mouse go out right
                if (this.newLeftPosition > this.line.offsetWidth) {
                    this.newLeftPosition = this.line.offsetWidth - this.newRightPosition;
                }

                if (this.currentMinPrice <= this.currentMaxPrice) {
                    this.currentPercentMin = Math.round(this.newLeftPosition * 100 / this.handleLineWidth);
                    // minimal price: length from left edge of price line to left handler in $
                    this.currentMinPrice = this.currentPercentMin * this.division;
                    this.inputMin.value = this.currentMinPrice;

                    // style for left handler in px
                    this.buttonMin.style.left = this.newLeftPosition - this.buttonHalf + 'px';

                    // start and with of price range line
                    this.handleLine.style.left = this.newLeftPosition + 'px';
                    this.handleLine.style.width = (this.percentMax - this.currentPercentMin - (this.percentMax - this.currentPercentMax)) + '%';

                    this.$parent.$refs.catalog.filterPrice(this.currentMinPrice, this.currentMaxPrice);
                }
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);

            const checkLeftSlider = () => {
                if (this.newLeftPosition >= (this.handleLineWidth - this.newRightPosition)) {
                    this.currentMinPrice = this.currentMaxPrice;
                    this.inputMin.value = this.currentMinPrice;

                    // style for left handler in px
                    this.buttonMin.style.left = (this.line.offsetWidth * (this.currentMaxPrice * 100 / this.maxPrice) / 100) - shiftX + 'px';

                    this.currentPercentMin = this.currentPercentMax;
                    // start and width of price range line
                    this.handleLine.style.left = this.newLeftPosition + 'px';
                    this.handleLine.style.width = (this.percentMax - this.currentPercentMin - (this.percentMax - this.currentPercentMax)) + '%';
                }
            };

            function onMouseUp() {
                checkLeftSlider();
                document.removeEventListener('mouseup', onMouseUp);
                document.removeEventListener('mousemove', onMouseMove);
            }

            this.buttonMin.ondragstart = function() {
                return false;
            };
        },

        moveBtnRight(event) {
            // width from handler right side to cursor point on handler
            let shiftX = this.buttonMax.getBoundingClientRect().right - event.clientX;

            let onMouseMove = (event) => {
                this.newRightPosition = this.line.getBoundingClientRect().right - event.clientX - shiftX + this.buttonHalf;

                // when mouse go out right
                if (this.newRightPosition < 0) {
                    this.newRightPosition = 0;
                }

                // when mouse go out left
                let leftEdge = this.line.getBoundingClientRect().left;
                if ((this.line.getBoundingClientRect().right - this.newRightPosition) < leftEdge) {
                    this.newRightPosition = this.line.offsetWidth - this.newLeftPosition;
                }

                if (this.currentMaxPrice >= this.currentMinPrice) {
                    let differenceToMax = Math.round(this.newRightPosition * 100 / this.handleLineWidth);
                    // max price in $
                    this.currentMaxPrice = this.maxPrice - differenceToMax * this.division;
                    this.inputMax.value = this.currentMaxPrice;

                    this.currentPercentMax = this.percentMax - differenceToMax;

                    // style for right handler in px
                    this.buttonMax.style.right = Math.abs(this.newRightPosition) - this.buttonHalf + 'px';

                    // width of price range line
                    this.handleLine.style.width = (this.percentMax - this.currentPercentMin - (this.percentMax - this.currentPercentMax)) + '%';

                    this.$parent.$refs.catalog.filterPrice(this.currentMinPrice, this.currentMaxPrice);
                }
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);

            let checkRightSlider = () => {
                if (this.newRightPosition >= (this.handleLineWidth - this.newLeftPosition)) {
                    this.currentMaxPrice = this.currentMinPrice;
                    this.inputMax.value = this.currentMaxPrice;

                    // style for right handler in px
                    this.buttonMax.style.right = this.line.offsetWidth - (this.line.offsetWidth * (this.currentMinPrice * 100 / this.maxPrice) / 100) - shiftX + 'px';

                    this.currentPercentMax = this.currentPercentMin;
                    // start and width of price range line
                    this.handleLine.style.left = this.newLeftPosition + 'px';
                    this.handleLine.style.width = (this.percentMax - this.currentPercentMin - (this.percentMax - this.currentPercentMax)) + '%';
                }
            };

            function onMouseUp() {
                checkRightSlider();
                document.removeEventListener('mouseup', onMouseUp);
                document.removeEventListener('mousemove', onMouseMove);
            }
        },

        math() {
            const interval = this.currentMaxPrice - this.currentMinPrice;
            const percent = interval / this.division;
            return percent;
        },

        // set price through input

        setMinByInput() {

            this.checkInputValue();

            if (this.currentMinPrice >= this.minPrice && this.currentMinPrice <= this.currentMaxPrice) {

                // minimal price in %
                const handleMove = Math.round(this.currentMinPrice / this.division);
                this.currentPercentMin = handleMove;
                // style for left handler in % of price line
                this.buttonMin.style.left = (handleMove - this.buttonHalf * this.percentMax / this.line.offsetWidth) + '%';

                // left edge of price range line
                this.handleLine.style.left = handleMove + '%';

                // width of price range line in %
                const percent = this.math();
                this.handleLine.style.width = percent + '%';

                this.$parent.$refs.catalog.filterPrice(this.currentMinPrice, this.currentMaxPrice);
            }
            // else
        },

        setMaxByInput() {
            
            this.checkInputValue();

            if (this.currentMaxPrice <= this.maxPrice && this.currentMaxPrice >= this.currentMinPrice) {

                // max price in %
                const handleMove = Math.round(this.currentMaxPrice / this.division);
                this.currentPercentMax = handleMove;

                // style for right handler in % of price line
                this.buttonMax.style.right = this.percentMax - (handleMove + this.buttonHalf * this.percentMax / this.line.offsetWidth) + '%';

                // width of price range line in %
                const percent = this.math();
                this.handleLine.style.width = percent + '%';

                this.$parent.$refs.catalog.filterPrice(this.currentMinPrice, this.currentMaxPrice);
            }
            // else
        }
    },

    mounted() {
        this.line = document.querySelector('.choice__price_line');
        this.handleLine = document.querySelector('.choice__price_bar');

        // price number inputs
        this.inputMin = document.querySelector('#min-price-input');
        this.inputMax = document.querySelector('#max-price-input');
        this.buttonMin = document.querySelector('#min-price-button');
        this.buttonMax = document.querySelector('#max-price-button');
        this.buttonHalf = this.buttonMin.offsetWidth / 2;

        // width of price range line in px
        this.handleLineWidth = parseInt(getComputedStyle(this.line).width);

        this.division = this.maxPrice / this.percentMax;
    },
    template: `<div class="choice__section">
                    <span class="choice__head">Price</span>
                    <div class="choice__box">
                        <div class="choice__price_line">
                            <div class="choice__price_bar"></div>
                            <button 
                                class="choice__price_handle handle-min"
                                id="min-price-button"
                                aria-label="Min Price"
                                title="Min Price"
                                @mousedown.prevent="moveBtnLeft($event)"
                                >
                            </button>
                            <button
                                class="choice__price_handle handle-max"
                                id="max-price-button"
                                aria-label="Max Price"
                                title="Max Price"
                                @mousedown.prevent="moveBtnRight($event)"
                                >
                            </button>
                        </div>
                        <div>
                            <form class="choice__price">
                                <input
                                    type="number"
                                    id="min-price-input"
                                    class="choice__price_input"
                                    name="min-interval"
                                    aria-label="min price input"
                                    v-model="currentMinPrice" 
                                    @input.prevent="setMinByInput"
                                >

                                <input
                                    type="number"
                                    id="max-price-input"
                                    class="choice__price_input"
                                    name="max-interval"
                                    aria-label="max price input"
                                    v-model="currentMaxPrice" 
                                    @input.prevent="setMaxByInput"
                                >
                            </form>
                        </div>
                    </div>
                </div>`
});
