Vue.component('priceSort', {
  data() {
      return {
          minPrice: 0,
          maxPrice: 100,
          currentInputMinPrice: 0,
          currentInputMaxPrice: 100,
          percentMax: 100,
          currentPercentMin: 0,
          currentPercentMax: 100,
          newLeftBtnPosition: 0,
          newRightBtnPosition: 0,
          redPriceLineContainer: null,
          redPriceLine: null,
          redPriceLineWidth: 0,
          minButton: null,
          maxButton: null,
          onePercentInDollars: 0,
          buttonHalf: 0,
          shiftX: 0,
      }
  },

  computed: {},

  watch: {},

  methods: {
    countOnePercentInDollars() {
      this.onePercentInDollars = this.maxPrice / this.percentMax;
    },
    measurePriceLineWidth() {
      this.redPriceLineContainer = this.$refs.priceLineContainer;
      this.redPriceLine = this.$refs.priceLineElem;
      const width = parseInt(getComputedStyle(this.redPriceLine).width);
      this.redPriceLineWidth = width;
    },
    countButtonHalf() {
      this.minButton = this.$refs.minBtn;
      this.maxButton = this.$refs.maxBtn;
      this.buttonHalf = this.minButton.offsetWidth / 2;
    },
    updatePriceLineStyle() {
      const priceInterval = this.currentInputMaxPrice - this.currentInputMinPrice;
      const priceLineWidthInPercent = priceInterval / this.onePercentInDollars;
      this.redPriceLineWidth = priceLineWidthInPercent;
      this.redPriceLine.style.width = `${this.redPriceLineWidth}%`;
      this.redPriceLine.style.left = this.currentPercentMin + '%';
    },

    checkMinInputValue() {
      this.currentInputMinPrice = parseInt(this.currentInputMinPrice);
    },
    checkMaxInputValue() {
      this.currentInputMaxPrice = parseInt(this.currentInputMaxPrice);
    },

    moveMinBtn(event) {
      this.shiftX = event.clientX - this.minButton.getBoundingClientRect().left;

      document.addEventListener('mousemove', this.minBtnMouseMove); 
      document.addEventListener('mouseup', this.minBtnMouseUp); 

      this.minButton.ondragstart = function() {
        return false;
      };
    },
    moveMaxBtn(event) {
      this.shiftX = this.maxButton.getBoundingClientRect().right - event.clientX;

      document.addEventListener('mousemove', this.maxBtnMouseMove); 
      document.addEventListener('mouseup', this.maxBtnMouseUp); 

      this.maxButton.ondragstart = function() {
        return false;
      };
    },

    minBtnMouseMove(event) {
      this.newLeftBtnPosition = event.clientX - this.redPriceLineContainer.getBoundingClientRect().left - this.shiftX + this.buttonHalf;

      if (this.newLeftBtnPosition < 0) {
        this.newLeftBtnPosition = 0;
      }

      if (this.newLeftBtnPosition > this.redPriceLineContainer.offsetWidth 
      || this.newLeftBtnPosition >= (this.redPriceLineContainer.offsetWidth - this.newRightPosition)) {
        this.newLeftBtnPosition = this.redPriceLineContainer.offsetWidth - this.newRightBtnPosition - 5;
      }

      this.currentPercentMin = Math.round(this.newLeftBtnPosition * 100 / this.redPriceLineContainer.offsetWidth);
      // minimal price in $
      this.currentInputMinPrice = this.currentPercentMin * this.onePercentInDollars;
      // style for left handler in px
      this.minButton.style.left = Math.abs(this.newLeftBtnPosition) - this.buttonHalf + 'px';

      this.updatePriceLineStyle();

      this.$parent.$refs.catalog.setCurrentMinPrice(this.currentInputMinPrice);
    },
    maxBtnMouseMove(event) {

      this.newRightBtnPosition = this.redPriceLineContainer.getBoundingClientRect().right - event.clientX - this.shiftX + this.buttonHalf;

      if (this.newRightBtnPosition < 0) {
        this.newRightBtnPosition = 0;
      }

      if (this.newRightBtnPosition > this.redPriceLineContainer.offsetWidth 
      || this.newRightBtnPosition >= (this.redPriceLineContainer.offsetWidth - this.newLeftBtnPosition)) {
        this.newRightBtnPosition = this.redPriceLineContainer.offsetWidth - this.newLeftBtnPosition - 5;
      }

      this.currentPercentMax = this.percentMax - Math.round(this.newRightBtnPosition * 100 / this.redPriceLineContainer.offsetWidth);
      // max price in $
      this.currentInputMaxPrice = this.currentPercentMax * this.onePercentInDollars;
      // style for right handler in px
      this.maxButton.style.right = Math.abs(this.newRightBtnPosition) - this.buttonHalf + 'px';

      this.updatePriceLineStyle();

      this.$parent.$refs.catalog.setCurrentMaxPrice(this.currentInputMaxPrice);
    },

    minBtnMouseUp() {
      document.removeEventListener('mouseup', this.minBtnMouseUp);
      document.removeEventListener('mousemove', this.minBtnMouseMove);
      this.shiftX = 0;
    },
    maxBtnMouseUp() {
      document.removeEventListener('mouseup', this.maxBtnMouseUp);
      document.removeEventListener('mousemove', this.maxBtnMouseMove);
      this.shiftX = 0;
    },

    setMinByInput() {
      this.checkMinInputValue();

      if(this.currentInputMinPrice > this.currentInputMaxPrice) {
        this.currentInputMinPrice = this.minPrice;
        alert("Enter the correct Minimal Price");
      }

      if (this.currentInputMinPrice >= this.minPrice && this.currentInputMinPrice <= this.currentInputMaxPrice) {
        const minPriceInPercent = Math.round(this.currentInputMinPrice / this.onePercentInDollars);
        this.currentPercentMin = minPriceInPercent;
        // style for left handler in %
        this.minButton.style.left = (this.currentPercentMin - this.buttonHalf * this.percentMax / this.redPriceLineContainer.offsetWidth) + '%';

        this.updatePriceLineStyle();

        this.$parent.$refs.catalog.setCurrentMinPrice(this.currentInputMinPrice);
      }
    },
    setMaxByInput() {
      this.checkMaxInputValue();

      if(this.currentInputMaxPrice > this.maxPrice) {
        this.currentInputMaxPrice = this.maxPrice;
        alert("Enter the correct Max Price");
      }

      if (this.currentInputMaxPrice <= this.maxPrice && this.currentInputMaxPrice >= this.currentInputMinPrice) {
        const maxPriceInPercent = Math.round(this.currentInputMaxPrice / this.onePercentInDollars);
        this.currentPercentMax = maxPriceInPercent;
        // style for right handler in %
        this.maxButton.style.right = this.percentMax - (this.currentPercentMax + this.buttonHalf * this.percentMax / this.redPriceLineContainer.offsetWidth) + '%';

        this.updatePriceLineStyle();

        this.$parent.$refs.catalog.setCurrentMaxPrice(this.currentInputMaxPrice);
      }
    },
    changeIncorrectMinValue() {
      if (!this.currentInputMinPrice) {
          this.currentInputMinPrice = 0;
          this.setMinByInput()
      }

      if (this.currentMinPrice > this.currentMaxPrice) {
          this.currentMinPrice = 0;
          this.setMinByInput()
          alert("Enter the correct Minimal Price");
      }
    },
    changeIncorrectMaxValue() {
      if (!this.currentInputMaxPrice) {
          this.currentInputMaxPrice = this.currentInputMinPrice + 10;
          this.setMaxByInput()
      }
      
      if (this.currentInputMaxPrice < this.currentInputMinPrice) {
          this.currentInputMaxPrice = this.currentInputMinPrice + 10;
          this.setMaxByInput()
          alert("Enter the correct Max Price");
      }
    },
  },

  mounted() {
    this.countOnePercentInDollars();
    this.measurePriceLineWidth();
    this.countButtonHalf();
  },

    template: `<div class="choice__section">
                    <span class="choice__head">Price</span>
                    <div class="choice__box">
                        <div class="choice__price_line" ref="priceLineContainer">
                            <div class="choice__price_bar" ref="priceLineElem"></div>
                            <button 
                                class="choice__price_handle handle-min"
                                id="min-price-button"
                                aria-label="Min Price"
                                title="Min Price"
                                ref="minBtn"
                                @mousedown.prevent="moveMinBtn($event)"
                                >
                            </button>
                            <button
                                class="choice__price_handle handle-max"
                                id="max-price-button"
                                aria-label="Max Price"
                                title="Max Price"
                                ref="maxBtn"
                                @mousedown.prevent="moveMaxBtn($event)"
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
                                    v-model="currentInputMinPrice" 
                                    @input="setMinByInput" 
                                    @focusout="changeIncorrectMinValue"
                                >

                                <input
                                    type="number"
                                    id="max-price-input"
                                    class="choice__price_input"
                                    name="max-interval"
                                    aria-label="max price input"
                                    v-model="currentInputMaxPrice" 
                                    @input="setMaxByInput" 
                                    @focusout="changeIncorrectMaxValue"
                                >
                            </form>
                        </div>
                    </div>
                </div>`
});