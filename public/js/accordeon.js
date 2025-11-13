class Accordeon {
    constructor(menuHeadClass = 'catalogue-menu__head',
                blockActiveClass = 'catalogue-menu__list_active',
                elActiveClass = 'catalogue-menu__triangle_active') {
        this.menu = document.querySelector('.catalogue-menu');
        this.menuHead = menuHeadClass;
        this.blockActive = blockActiveClass;
        this.elActive = elActiveClass;
        this.blocks = document.querySelectorAll('.catalogue-menu__list');
        this.triangles = document.querySelectorAll('.catalogue-menu__triangle');
        this.triangle = '.catalogue-menu__triangle';
        this._onEvent();
        this._toggle();
    }
    _onEvent() {
        this.menu.addEventListener('click', e => {
            const target = e.target;

            if (target.classList.contains(this.menuHead) || target.parentNode.classList.contains(this.menuHead)) {
                e.preventDefault();
                if (target.getAttribute('href')) {
                    const id = target.getAttribute('href');
                    const triangleActive = target.querySelector(this.triangle);
                    this._toggle(e, id, triangleActive);
                } else {
                    const id = target.parentNode.getAttribute('href');
                    const triangleActive = target;
                    this._toggle(e, id, triangleActive);
                }
            }
        });
    }
    _toggle(e, id, triangle) {
        if (e) {
            if (document.querySelector(id).classList.contains(this.blockActive)) {
                document.querySelector(id).classList.remove(this.blockActive);
                triangle.classList.remove(this.elActive);
            } else {
                for (let el of this.blocks) {
                    el.classList.remove(this.blockActive);
                }
                document.querySelector(id).classList.add(this.blockActive);
                for (let el of this.triangles) {
                    el.classList.remove(this.elActive);
                }
                triangle.classList.add(this.elActive);
            }
        }
    }
}

const accordeon = new Accordeon();