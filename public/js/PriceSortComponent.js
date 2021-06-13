Vue.component('priceSort', {
    data() {
        return {
            // minPrice: 0,
            // maxPrice: 1000,
            currentMinPrice: 0,
            currentMaxPrice: 100,
            // currentPercentMin: 0,
            // currentPercentMax: 0,
            // percentMax: 100,
            // division: 10,
            // minButton: '',
            // maxButton: '',
            // buttonWidth: 0,
            // line: '',
            // handleLine: '',
            // handleLineWidth: 0,
            handleMin: '',
            handleMax: '',
        }
    },
    methods: {
        priceBtn(e) {
            let onMouseMove = () => {
                // console.log(e.target);
                // почему-то здесь не изменяется таргет, он всегда на кнопке, не на других дивах
                this.setPrice();
            };
            document.addEventListener('mousemove', onMouseMove);
            // показывает значение только в момент нажатия, а не во время всего движения ползунка.
            // отпустили ползунок - ничего, нажали - появилось значение,
            // но это предыдущее конечное значение, а не актуальное на данный момент

            document.addEventListener('mouseup', onMouseUp);
            function onMouseUp() {
                document.removeEventListener('mouseup', onMouseUp);
                document.removeEventListener('mousemove', onMouseMove);
            }
        },
        setPrice() {
            // при движении ползунков в min/maxPrice попадает значение на $10 меньше отображаемого
            let minPrice = parseInt(this.handleMin.value);
            let maxPrice = parseInt(this.handleMax.value);
            if (minPrice < this.currentMaxPrice && maxPrice > this.currentMinPrice) {
                this.currentMinPrice = minPrice;
                // console.log('min' + this.currentMinPrice);
                this.currentMaxPrice = maxPrice;
                // console.log('max' + this.currentMaxPrice);
                this.$parent.$refs.catalog.filterPrice(this.currentMinPrice, this.currentMaxPrice);
            }
        }
        // changeMin() {
        //     this.currentMinPrice = parseInt(this.currentMinPrice);
        //     this.currentMaxPrice = parseInt(this.currentMaxPrice);
        //
        //     // если this.currentMinPrice isNaN, т.е. является не-числом
        //     if (isNaN(this.currentMinPrice)) {
        //         this.currentMinPrice = 0;
        //     } else if (this.currentMinPrice >= this.minPrice && this.currentMinPrice < this.currentMaxPrice) {
        //
        //         // двигаем кнопку left: ...%
        //         let handleMove = Math.round(this.currentMinPrice / this.division); // input / 10
        //
        //         // находим текущее расстояние до левого ползунка в %
        //         this.currentPercentMin = handleMove;
        //
        //         // высчитывается при загрузке !!!!!!!!!!!!!!!
        //         let buttonHalf = (this.minButton.offsetWidth / 2) / this.division;
        //         // новое положение левого ползунка  =
        //         // текущее расстояние до левого ползунка в %  -  1\2 ширины кнопки в %
        //         this.minButton.style.left = handleMove - buttonHalf + '%';
        //
        //         // отступ розовой линии слева в % от длины линии
        //         this.handleLine.style.left = handleMove - buttonHalf + '%';
        //
        //         // код дублируется, вынести в отдельный метод
        //         // ширина розовой линии в %
        //         let interval = this.currentMaxPrice - this.currentMinPrice; // в долларах 700-300= 400 $ //*
        //         let percent = interval / this.division; // 400$ / 10 = 40% //*
        //         this.handleLine.style.width = percent + '%'; //*
        //
        //     }
        // },
        // changeMax(){
        //     this.currentMinPrice = parseInt(this.currentMinPrice);
        //     this.currentMaxPrice = parseInt(this.currentMaxPrice);
        //
        //     if (this.currentMaxPrice <= this.maxPrice && this.currentMaxPrice >= this.currentMinPrice) {
        //
        //         // двигаем кнопку right: ...%
        //         let handleMove = Math.round(this.currentMaxPrice / this.division); //500/10=50%
        //         // находим текущее расстояние после правого ползунка в %
        //         this.currentPercentMax = this.percentMax - handleMove;
        //
        //         // высчитывается при загрузке !!!!!!!!!!!!!!!
        //         let buttonHalf = (this.minButton.offsetWidth / 2) / this.division;
        //         this.maxButton.style.left = handleMove - buttonHalf + '%';
        //
        //         // код дублируется, вынести в отдельный метод
        //         // ширина розовой линии в %
        //         let interval = this.currentMaxPrice - this.currentMinPrice; // в долларах 700-300= 400 $ //*
        //         let percent = interval / this.division; // 400$ / 10 = 40% //*
        //         this.handleLine.style.width = percent + '%'; //*
        //     }
        // },
        // moveMin(event) {
        //     let onMouseMove = (event) => {
        //         // console.log(event.clientX);
        //
        //         // event.target однажды становится не minButton, a любым элементом, по которому движется мышь !!!!!
        //         // if (event.target.id === 'handle-min') {
        //
        //             let shiftX = event.clientX - event.target.getBoundingClientRect().left;
        //             // console.log('start');
        //             // console.log(event.clientX);
        //             // console.log(this.line.getBoundingClientRect().left);
        //             // console.log(shiftX);
        //             // console.log(this.buttonWidth);
        //
        //             // новое положение ползунка = координаты курсора в момент нажатия мыши
        //             //   -  координаты левого края линии  -  ширина части ползунка до курсора
        //             let newLeft = event.clientX - this.line.getBoundingClientRect().left - shiftX + this.buttonWidth; // в px
        //             // console.log(newLeft);
        //
        //             // курсор вышел из слайдера => оставить ползунок в границах слайдера.
        //             if (newLeft < 0) {
        //                 newLeft = 0;
        //                 console.log('2');
        //             }
        //
        //             // если ползунок вышел справа, крайнее положение справа = ширина линии
        //             if (newLeft > this.line.offsetWidth) {
        //                 newLeft = this.line.offsetWidth;
        //                 console.log('3');
        //             }
        //
        //             // находим из px текущее расстояние до левого ползунка в %, чтобы ->
        //             this.currentPercentMin = Math.round(newLeft * this.percentMax / this.handleLineWidth);
        //
        //             // расстояние до левого ползунка в % перевести в $
        //             this.currentMinPrice = this.currentPercentMin * this.division;
        //
        //             // итоговые стили ползунка и линии
        //             // пока его цена меньше currentMaxPrice, ползунок может двигаться в большую сторону
        //             if (this.currentMinPrice < this.currentMaxPrice) {
        //                 // console.log('4');
        //                 // задаем цену в $ инпуту
        //                 this.handleMin.value = this.currentMinPrice;
        //
        //                 // задаем новое положение ползунку через стиль
        //                 event.target.style.left = newLeft + 'px';
        //                 console.log(event.target);
        //                 console.log(event.target.style.left);
        //
        //                 // начало и ширина розовой линии
        //                 this.handleLine.style.left = newLeft + 'px';
        //                 this.handleLine.style.width = (this.percentMax - this.currentPercentMin - this.currentPercentMax) + '%';
        //             }
        //         // }
        //     };
        //
        //     function onMouseUp() {
        //         document.removeEventListener('mouseup', onMouseUp);
        //         document.removeEventListener('mousemove', onMouseMove);
        //     }
        //
        //     document.addEventListener('mousemove', onMouseMove);
        //     document.addEventListener('mouseup', onMouseUp);
        // },
    },
    mounted() {
        // прослушка на кнопки мин и макс вешается сразу после загрузки страницы и по клику срабатывает метод
        // @input.prevent="changeMin"
        // this.minButton = document.querySelector('#handle-min');
        // this.maxButton = document.querySelector('#handle-max');
        // this.buttonWidth = this.minButton.offsetWidth / 2;
        //
        // this.line = document.querySelector('.choice__price_line');
        // this.handleLine = document.querySelector('.choice__price_bar');
        // this.handleLineWidth = parseInt(getComputedStyle(this.line).width); // px
        //
        this.handleMin = document.querySelector('#min-interval');
        this.handleMax = document.querySelector('#max-interval');
    },
    template: `<div class="choice__section">
                    <h3 class="choice__head">Price</h3>
                    <div class="choice__box">
                        <div class="choice__price_line">
                            <div class="choice__price_bar"></div>
<!--                            <button class="choice__price_handle handle-min" id="handle-min" @mousedown.prevent="moveMin($event)" @ondragstart="drag" style="left: -6px;"></button>-->
                            <button class="choice__price_handle handle-min" id="handle-min" @mousedown.prevent="priceBtn($event)" style="left: -6px;"></button>
                            <button class="choice__price_handle handle-max" id="handle-max" @mousedown.prevent="priceBtn($event)" style="right: -6px;"></button>
                        </div>
                        <div class="choice__price">
            <!-- как сделать чтобы форма при enter не перезагружала страницу? -->
                            <form action="#" @input.prevent="setPrice">
                                <input type="text" id="min-interval" class="choice__price_input" name="min-interval" v-model="currentMinPrice">
                            </form>
                            <form action="#" @input.prevent="setPrice">
                                <input type="text" id="max-interval" class="choice__price_input" name="max-interval" v-model="currentMaxPrice">
                            </form>
                        </div>
                    </div>
                </div>`
});