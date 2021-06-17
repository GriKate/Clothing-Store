let reviews = document.querySelectorAll(".review__item");
let btnBlock = document.querySelector("#review__buttons");
let buttons = document.querySelectorAll(".review__button");

btnBlock.addEventListener('click', e => {
    slideReview(e.target);
});

function slideReview(el) {
    let buttonNum = Array.prototype.slice.call(buttons).indexOf(el);

    for (let num = 0; num < reviews.length; num++) {
        reviews[num].classList.remove('review_show');
        buttons[num].classList.remove('review__button_pink');
    }
    reviews[buttonNum].classList.add('review_show');
    buttons[buttonNum].classList.add('review__button_pink');
}
