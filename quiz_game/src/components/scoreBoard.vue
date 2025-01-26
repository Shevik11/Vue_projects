
<template>
    <section class="score">
        Player <span>{{winCount}}</span> x <span>{{loseCount}}</span> Computer
    </section>

</template>

<script>
    export default{
        props: ['winCount', 'loseCount']
    }
</script>

<style lang="scss">

    section.score {
        border-bottom: 1px solid black;
        padding: 24px;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        margin: 1em 0;
        span {
            padding: 8px;
            font-weight: bold;
            border: 1px solid black;
        }
    }
</style>