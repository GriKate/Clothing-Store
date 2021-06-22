Vue.component('error', {
    data() {
        return {
            text: '',
        }
    },
    methods: {
        setText(value){
            this.text = value;
        }
    },
    template: `<div class="error-wrapper" v-if="text">
                    <div class="error-block">
                        <p class="error-msg">
                            <button class="close-btn" @click="setText('')"></button>
                            {{text}}
                        </p>
                    </div>
                </div>`
});
