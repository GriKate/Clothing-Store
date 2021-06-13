let reviews = document.querySelectorAll(".review__item");
let btnBlock = document.querySelector("#review__buttons");
// преобразования NodeList к Array
// NodeList - коллекция, а не массив. Наследует методы NodeList.prototype, а не Array.prototype
// https://developer.mozilla.org/ru/docs/Web/API/NodeList
let buttons = document.querySelectorAll(".review__button");

btnBlock.addEventListener('click', e => {
    slideReview(e.target);
});

function slideReview(el) {
//    как узнать номер элемента в массиве по элементу, на к-ом произошло событие?
    let buttonNum = Array.prototype.slice.call(buttons).indexOf(el);

//    все отзывы сделать невидимыми, а найденный индекс - видимым
    for (let num = 0; num < reviews.length; num++) {
        reviews[num].classList.remove('review_show');
        buttons[num].classList.remove('review__button_pink');
    }
    reviews[buttonNum].classList.add('review_show');
    buttons[buttonNum].classList.add('review__button_pink');
}
