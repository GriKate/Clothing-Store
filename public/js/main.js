// import product from './ProductComponent';
// Vue.component('product', product);
// const product = { template: '<div>foo</div>' };
//
// const routes = [
//     { path: '/foo', component: product },
// ];
//
// const router = new VueRouter({
//     routes // сокращённая запись для `routes: routes`
// });



// const User = {
//     template: '<div>Пользователь</div>'
// };
//
// const router = new VueRouter({
//     routes: [
//         // динамические сегменты начинаются с двоеточия
//         { path: '/user/:id', component: User }
//     ]
// });




// let router = new VueRouter();
//
// router.map({
//     '/entity/:id': {
//         name: 'product',
//         component: product
//     }
// });


// Object.defineProperty(Vue.prototype,"$bus",{
//     get: function() {
//         return this.$root.bus;
//     }
// });
//
// let bus = new Vue({});

const app = new Vue ({
    el: '#app',
    data: {},
    // router,
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => this.$refs.error.setText(error))
        },
        postJson(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                // отправляем данные в JSON-формате
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => this.$refs.error.setText(error))
        },
        putJson(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                // отправляем данные в JSON-формате
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => this.$refs.error.setText(error))
        },
        // 2
        deleteJson(url) {
            // самое простое - вызов функии fetch с одним аргументом — строкой, содержащей путь к ресурсу, который вы хотите получить — файлу JSON
            // функция fetch возвращает promise, содержащий ответ - объект Response
            // вернуть promise в результате fetch() :
            return fetch(url, {
                // fetch() может принимать второй параметр - обьект init, который позволяет контролировать различные настройки
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
            })
                // забираем JSON файл по сети и выводим его содержимое в консоль
                // result - это просто HTTP-ответ, а не фактический JSON. Чтобы извлечь содержимое тела JSON из ответа, мы используем метод json()
                // 6
                .then(result => result.json())
                .catch(error => this.$refs.error.setText(error))
        },
    },
});
    // .$mount('#app');

// let eventBus = new Vue();


// let router = new VueRouter();
//
// router.map({
//     '/': {
//         component: cart
//     },
//     '/product': {
//         component: product
//     }
// });
//
// router.start(App, '#app');

