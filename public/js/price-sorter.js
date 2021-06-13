class PriceSorter {
    constructor() {
        this.line = document.querySelector('.choice__price_line');
        this.handleLine = document.querySelector('.choice__price_bar');
        this.handleMin = document.querySelector('#min-interval');
        this.handleMax = document.querySelector('#max-interval');
        this.buttonMin = document.querySelector('#handle-min');
        this.buttonMax = document.querySelector('#handle-max');
        this.buttonHalf = this.buttonMin.offsetWidth / 2;
        // this.buttonHalfPercent = this.buttonHalf * this.percentMax / this.line.offsetWidth;

        // ширина розовой линии в пикселях
        this.handleLineWidth = parseInt(getComputedStyle(this.line).width);

        // значения цены
        this.minPrice = 0;
        this.maxPrice = 100;
        this.currentMinPrice = this.minPrice;
        this.currentMaxPrice = this.maxPrice;
        this.percentMax = 100;
        this.division = this.maxPrice / this.percentMax;
        this.currentPercentMin = 0;
        this.currentPercentMax = 100;

        this._changeMin();
        this._changeMax();
        this._moveBtn();
    }
    _moveBtn() {
        this.buttonMin.onmousedown = (event) => {
            event.preventDefault(); // предотвратить запуск выделения (действие браузера)

            // ширина части ползунка до курсора = координаты курсора в момент нажатия мыши  -  координаты левой границы ползунка
            let shiftX = event.clientX - this.buttonMin.getBoundingClientRect().left; // left + width/2
            // shiftY здесь не нужен, слайдер двигается только по горизонтали

            // ф-ия стрелочная, чтобы сохранить доступ к this и пользоваться переменными из конструктора класса
            let onMouseMove = (event) => {
                // новое положение ползунка = координаты курсора в момент нажатия мыши
                //   -  координаты левого края линии  -  ширина части ползунка до курсора
                let newLeft = event.clientX - this.line.getBoundingClientRect().left - shiftX;

                // курсор вышел из слайдера => оставить ползунок в границах слайдера.
                if (newLeft < 0) {
                    newLeft = 0;
                }

                // если ползунок вышел справа, крайнее положение справа = ширина линии
                if (newLeft > this.line.offsetWidth) {
                    newLeft = this.line.offsetWidth;
                }

                // итоговые стили ползунка и линии
                // пока его цена меньше currentMaxPrice, ползунок может двигаться в большую сторону
                if (this.currentMinPrice < this.currentMaxPrice) {
                    // находим из px текущее расстояние до левого ползунка в %, чтобы ->
                    this.currentPercentMin = Math.round(newLeft * 100 / this.handleLineWidth);
                    // расстояние до левого ползунка в % перевести в $
                    this.currentMinPrice = this.currentPercentMin * this.division;
                    // выводим минимальную стоимость в инпут
                    this.handleMin.value = this.currentMinPrice;

                    // задаем новое положение ползунку через стиль, вычитаем половину ширины кнопки
                    this.buttonMin.style.left = newLeft - this.buttonHalf + 'px';

                    // начало и ширина розовой линии
                    this.handleLine.style.left = newLeft + 'px';
                    this.handleLine.style.width = (this.percentMax - this.currentPercentMin - (this.percentMax - this.currentPercentMax)) + '%';
                }
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);

            function onMouseUp() {
                document.removeEventListener('mouseup', onMouseUp);
                document.removeEventListener('mousemove', onMouseMove);
            }
        };
        this.buttonMin.ondragstart = function() {
            return false;
        };



        this.buttonMax.onmousedown = (event) => {
            event.preventDefault(); // предотвратить запуск выделения (действие браузера)

            // ширина части ползунка направо от курсора = координаты правой границы ползунка  -  координаты курсора в момент нажатия мыши
            let shiftX = this.buttonMax.getBoundingClientRect().right - event.clientX;
            // shiftY здесь не нужен, слайдер двигается только по горизонтали

            let onMouseMove = (event) => {
                // новое положение ползунка от правого края =
                // координаты курсора в момент нажатия мыши  -  координаты правой границы линии  -  ширина части ползунка направо от курсора
                let newRight = this.line.getBoundingClientRect().right - event.clientX - shiftX;

                // курсор вышел из слайдера вправо => оставить ползунок в границах слайдера.
                if (newRight < 0) {
                    newRight = 0;
                }

                // крайнее положение слева = ширина линии
                let leftEdge = this.line.getBoundingClientRect().left;
                if ((this.line.getBoundingClientRect().right - newRight) < leftEdge) {
                    newRight = this.line.offsetWidth;
                }

                // итоговые стили ползунка и линии
                if (this.currentMaxPrice > this.currentMinPrice) {
                    // находим текущее расстояние от правого ползунка до правого конца линии из %ax, чтобы ->
                    let differenceToMax = Math.round(newRight * 100 / this.handleLineWidth);
                    // расстояние до правого ползунка в % перевести в $
                    this.currentMaxPrice = this.maxPrice - differenceToMax * this.division;
                    // выводим максимальную стоимость в инпут
                    this.handleMax.value = this.currentMaxPrice;

                    this.currentPercentMax = this.percentMax - differenceToMax;

                    // задаем новое положение ползунку через стиль, вычитаем половину ширины кнопки
                    this.buttonMax.style.right = Math.abs(newRight) - this.buttonHalf + 'px';

                    // ширина розовой линии
                    this.handleLine.style.width = (this.percentMax - this.currentPercentMin - (this.percentMax - this.currentPercentMax)) + '%';
                }
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);

            function onMouseUp() {
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

    _changeMin(){
        this.handleMin.addEventListener('input', e => {
            let value = this.handleMin.value;

            if (value >= this.minPrice && value < this.currentMaxPrice) {
                this.currentMinPrice = +value;

                // находим % слева
                let handleMove = Math.round(this.currentMinPrice / this.division); // input / 10

                // сохраняем текущее расстояние до левого ползунка в %
                this.currentPercentMin = handleMove;

                // новое положение левого ползунка  =
                // текущее расстояние до левого ползунка в %  -  1\2 ширины кнопки в %
                this.buttonMin.style.left = (handleMove - this.buttonHalf * this.percentMax / this.line.offsetWidth) + '%'; //-1%

                // отступ розовой линии слева в % от длины линии
                this.handleLine.style.left = handleMove + '%';

                // ширина розовой линии в %
                let percent = this._math();
                this.handleLine.style.width = percent + '%';
            }
        });
    }

    _changeMax(){
        this.handleMax.addEventListener('input', e => {
            let value = this.handleMax.value;

            if (value < this.maxPrice && value >= this.currentMinPrice) {
                this.currentMaxPrice = +value;
                // console.log(this.currentMaxPrice);

                // находим max %, он же - % слева
                let handleMove = Math.round(this.currentMaxPrice / this.division); //50%
                this.currentPercentMax = handleMove;

                // новое положение правого ползунка  =
                // текущее расстояние слева до правого ползунка в %  -  1\2 ширины кнопки в %
                this.buttonMax.style.right = this.percentMax - (handleMove + this.buttonHalf * this.percentMax / this.line.offsetWidth) + '%';

                // ширина розовой линии в %
                let percent = this._math();
                this.handleLine.style.width = percent + '%';
            }
        });
    }
}

const priceSorter = new PriceSorter();