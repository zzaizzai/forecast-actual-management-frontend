<template>
    <div>
        <b-row>
            <div :class="`mb-3 alert-bar alert-${message.type}`" v-if="showAlert">
                <div class="alert-message"><strong>{{ message.type }}</strong>
                    {{ message.msg }}</div>
                <button class="close-button" @click="hide">X</button>
            </div>
        </b-row>
    </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Message } from '@/interfaces/Message';

export default defineComponent({
    name: 'AlertBar',
    props: {
        message: {
            type: Object as () => Message,
            required: true
        },
    },
    data() {
        return {
            showAlert: true
        }
    },
    methods: {
        hide(): void {
            this.showAlert = false

            // delete sotre data...
        }
    }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.alert-bar {
    position: relative;
    padding: 16px;
    margin: 0 auto;
    max-width: 800px;
    border-radius: 8px;
    background-color: #f8d7da;
    color: #721c24;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-family: Arial, sans-serif;
}


.alert-message {
    flex: 1;
    margin-right: 16px;
    font-size: 16px;
    text-align: left;
}

.close-button {
    background: transparent;
    border: none;
    font-size: 20px;
    color: #721c24;
    cursor: pointer;
    transition: color 0.3s ease;
}

.close-button:hover {
    color: #000000;
}

.alert-success {
    background-color: #d4edda;
    color: #155724;
}

.alert-warning {
    background-color: #fff3cd;
    color: #856404;
}

.alert-info {
    background-color: #d1ecf1;
    color: #0c5460;
}
</style>