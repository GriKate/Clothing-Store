Vue.component('sizeSort', {
    data() {
        return {}
    },
    methods: {},
    template: `<div class="choice__section">
                        <h3 class="choice__head">Size</h3>
                        <div class="choice__box">
                            <ul class="choice__size">
                                <li class="size__value">
                                    <input type="checkbox" class="size__input" id="size1">
                                    <label for="size1" class="size__label">XXS</label>
                                    <input type="checkbox" class="size__input" id="size5">
                                    <label for="size5" class="size__label">L</label>
                                </li>
                                <li class="size__value">
                                    <input type="checkbox" class="size__input" id="size2">
                                    <label for="size2" class="size__label">XS</label>
                                    <input type="checkbox" class="size__input" id="size6">
                                    <label for="size6" class="size__label">XL</label>
                                </li>
                                <li class="size__value">
                                    <input type="checkbox" class="size__input" id="size3">
                                    <label for="size3" class="size__label">S</label>
                                    <input type="checkbox" class="size__input" id="size7">
                                    <label for="size7" class="size__label">XXL</label>
                                </li>
                                <li class="size__value">
                                    <input type="checkbox" class="size__input" id="size4">
                                    <label for="size4" class="size__label">M</label>
                                </li>
                            </ul>
                        </div>
                    </div>`
});