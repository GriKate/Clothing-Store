Vue.component('breadcrumbs-component', {
    data() {
        return {}
    },
    methods: {},
    template: `<nav class="breadcrumbs">
                    <div class="breadcrumbs__container">
                        <span class="breadcrumbs__head">new arrivals</span>
                        <ul class="breadcrumbs__list">
                            <li class="breadcrumbs__item">
                                <a href="index.html" class="breadcrumbs__link">home</a>
                            </li>
                            <li class="breadcrumbs__item">
                                <a href="catalog.html" class="breadcrumbs__link">men</a>
                            </li>
                            <li class="breadcrumbs__item">
                                <a href="catalog.html" class="breadcrumbs__link">new arrivals</a>
                            </li>
                        </ul>
                    </div>
                </nav>`
});