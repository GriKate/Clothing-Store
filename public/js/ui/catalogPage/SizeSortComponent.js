Vue.component('sizeSort', {
    data() {
        return {}
    },
    methods: {},
    template: `<div class="choice__section">
                        <span class="choice__head size-head">Size</span>
                        <div class="choice__box">
                            <ul class="choice__size">
                                <li class="size__value">
                                    <input type="checkbox" value="XXS" class="size__input" id="XXS">
                                    <label for="XXS" class="size__label">XXS</label>
                                </li>
                                <li class="size__value">
                                    <input type="checkbox" value="XS" class="size__input" id="XS">
                                    <label for="XS" class="size__label">XS</label>
                                </li>
                                <li class="size__value">
                                    <input type="checkbox" value="S" class="size__input" id="S">
                                    <label for="S" class="size__label">S</label>
                                </li>
                                <li class="size__value">
                                    <input type="checkbox" value="M" class="size__input" id="M">
                                    <label for="M" class="size__label">M</label>
                                </li>
                                <li class="size__value">
                                    <input type="checkbox" value="L" class="size__input" id="L">
                                    <label for="L" class="size__label">L</label>
                                </li>  
                                <li class="size__value">
                                    <input type="checkbox" value="XL" class="size__input" id="XL">
                                    <label for="XL" class="size__label">XL</label>
                                </li>
                                <li class="size__value">
                                    <input type="checkbox" value="XXL" class="size__input" id="XXL">
                                    <label for="XXL" class="size__label">XXL</label>
                                </li>
                            </ul>
                        </div>
                    </div>`
});