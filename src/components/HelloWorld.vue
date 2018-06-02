<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <pre>{{ res }}</pre>
    </div>
</template>

<script>
import webservice from '@/services/webservice';

export default {
    name: 'HelloWorld',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
            res: {},
        };
    },

    mounted () {
        this.apiGet();
    },

    methods: {
        async apiGet () {
            try {
                const response = await webservice.get();
                this.res = response.data;
            }
            catch (e) {
                console.error(e);
            }
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$color_link: #42b983;

h1, h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: $color_link;
}
</style>
