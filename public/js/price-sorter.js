class PriceSorter {
    constructor() {
        this.line = document.querySelector('.choice__price_line');
        this.handleLine = document.querySelector('.choice__price_bar');
        this.inputMin = document.querySelector('#min-price-input');
        this.inputMax = document.querySelector('#max-price-input');
        this.buttonMin = document.querySelector('#min-price-button');
        this.buttonMax = document.querySelector('#max-price-button');
        this.buttonHalf = this.buttonMin.offsetWidth / 2;

        // width of price range line in px
        this.handleLineWidth = parseInt(getComputedStyle(this.line).width);

        // price value
        this.minPrice = 0;
        this.maxPrice = 100;
        this.currentMinPrice = this.minPrice;
        this.currentMaxPrice = this.maxPrice;
        this.percentMax = 100;
        this.division = this.maxPrice / this.percentMax;
        this.currentPercentMin = 0;
        this.currentPercentMax = 100;

        this.newLeftPosition = 0;
        this.newRightPosition = 0;

        this._changeMin();
        this._changeMax();
        this._moveBtn();
    }

    // set price by handlers

    _moveBtn() {
        this.buttonMin.onmousedown = (event) => {
            event.preventDefault();
            // width from handler left side to cursor point on handler
            let shiftX = event.clientX - this.buttonMin.getBoundingClientRect().left;

            let onMouseMove = (event) => {
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
                }
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);

            let checkLeftSlider = () => {
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
        };
        this.buttonMin.ondragstart = function() {
            return false;
        };



        this.buttonMax.onmousedown = (event) => {
            event.preventDefault();

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
        }
    }

    _math() {
        let interval = this.currentMaxPrice - this.currentMinPrice;
        let percent = interval / this.division;
        return percent;
    }

    // set price through input

    _changeMin(){
        this.inputMin.addEventListener('input', e => {
            let value = +this.inputMin.value;

            if (value >= this.minPrice && value <= this.currentMaxPrice) {
                this.currentMinPrice = value;

                // minimal price in %
                let handleMove = Math.round(this.currentMinPrice / this.division);
                this.currentPercentMin = handleMove;
                // style for left handler in % of price line
                this.buttonMin.style.left = (handleMove - this.buttonHalf * this.percentMax / this.line.offsetWidth) + '%';

                // left edge of price range line
                this.handleLine.style.left = handleMove + '%';

                // width of price range line in %
                let percent = this._math();
                this.handleLine.style.width = percent + '%';
            }
        });
    }

    _changeMax(){
        this.inputMax.addEventListener('input', e => {
            let value = +this.inputMax.value;

            if (value <= this.maxPrice && value >= this.currentMinPrice) {
                this.currentMaxPrice = value;

                // max price in %
                let handleMove = Math.round(this.currentMaxPrice / this.division);
                this.currentPercentMax = handleMove;

                // style for right handler in % of price line
                this.buttonMax.style.right = this.percentMax - (handleMove + this.buttonHalf * this.percentMax / this.line.offsetWidth) + '%';

                // width of price range line in %
                let percent = this._math();
                this.handleLine.style.width = percent + '%';
            }
        });
    }
}

const priceSorter = new PriceSorter();
