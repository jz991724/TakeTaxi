//主页面
<template>
	<view class="content">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">背景</block>
		</cu-custom>
		<scroll-view scroll-y="true">
			<!-- <map-component></map-component> -->
		</scroll-view>
	</view>
</template>

<script lang="ts">
	import {
		Component,
		Vue,
		Watch,
		Mixins
	} from "vue-property-decorator";
	import MapComponent from '../../components/MapComponent.vue'
	import VueMixins from '../../mixins/VueMixins.ts';

	@Component({
		name: 'Home'
	})
	export default class Home extends Mixins(VueMixins) {

	}
</script>

<style lang="less">

</style>
