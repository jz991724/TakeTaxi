//主页面
<template>
	<view>
		<text>{{title}}</text>
	</view>
</template>

<script lang="ts">
	import {
		Component,
		Vue,
		Watch
	} from "vue-property-decorator";

	@Component({
		name: 'Home'
	})
	export default class Home extends Vue {
		private title = "这就是主页面";
	}
</script>

<style lang="less">

</style>
