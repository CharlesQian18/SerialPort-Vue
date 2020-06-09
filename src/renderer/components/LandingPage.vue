<template>
    <div id="wrapper">
        <select v-model="portPath">
            <option v-for="i in 10" :key="i" :value="'COM'+i">{{'COM'+i}}</option>
            <!--<option value="COM2">COM2</option>-->
            <!--<option value="COM3">COM3</option>-->
            <!--<option value="COM4">COM4</option>-->
        </select>
        <div>
            串口信息: {{portPath}}
        </div>
        <div>
            打开信息: {{openText}}
        </div>
        <div>
            收发信息: {{sendText}}
        </div>

        <div>
            写入信息: {{writeText}}
        </div>
    </div>
</template>

<script>
    import {PortMixin} from '@/mixins/PortMixin'
    export default {
        name: 'landing-page',
        mixins: [PortMixin],
        data() {
            return {
                text: "",
                writeText: "",
                openText: "",
                sendText: ""
            }
        }
    }
</script>

