<template>
    <div>
        <div id="my_canvas" style="width: 250px; height: 250px;"> </div>
    </div>

</template>

<script>

export default {
    name: 'BlogWordCloud',
    props: {
        wordList: {
            type: Array,
            required: true,
            default: () => []
        },
        loading: {
            type: Boolean,
            require: true,
            default: () => false
        },
    },
    data() {
        return {

        }
    },
    mounted() {

    },
    watch: {
        // 加载完毕，则渲染词云
        loading: function (newVal, oldVal) {
            const WordCloud = require('wordcloud')

            const element = document.getElementById('my_canvas')
            if (!element) {
                console.error('WordCloud: Canvas element not found')
                return
            }

            const options = {
                list: this.wordList,
                backgroundColor: 'transparent',
                
            }

            if (WordCloud.isSupported) {
                WordCloud(element, options)
            } else {
                console.warn('WordCloud is not supported in this browser.')
            }
        }
    },
    methods: {


    }
}
</script>

<style scoped>
.word-cloud-wrapper {
    width: 100%;
    height: 400px;
    /* 必须给容器一个高度 */
    position: relative;
    overflow: hidden;
}
</style>