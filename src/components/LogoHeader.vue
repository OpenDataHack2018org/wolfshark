<template>
    <b-media
        right-align
        vertical-align="center">
        <img
            class="logo-anim"
            slot="aside"
            src="@/assets/logo.png"
            alt="WolfShark" />
        <slot></slot>
    </b-media>
</template>

<script>
export default {
    name: 'LogoHeader',
};
</script>

<style>
img.logo-anim {
    opacity: 0.618;
    transition: transform .8s ease-in-out;
    width: 64px;
    height: 64px;
}

img.logo-anim:hover {
    transform: rotate(360deg);
}
</style>
