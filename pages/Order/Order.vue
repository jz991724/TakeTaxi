//订单页
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
		name: 'Order'
	})
	export default class Order extends Vue {
		private title = "这就是订单页";
	}
</script>

<style lang="less">

</style>
