<style lang="less">

</style>
<template>
	<div style="height:100%;width:100%;">
		<Spin size="large" fix v-if="spinShow"></Spin>

		<div :id='mapId' class="newmapbox" style="height: 100%;background-color: #ffffff;position: relative;">
			<component :is="current_com" :ref="current_ref"></component>

			<bottombar :datasource='currentscale'></bottombar>

			<div class="app-right-bottom">

				<div id="mapType">
					<div class="mapTypeCard normal" id="wu1" @click="getLayer('wu1')" title="地图">
						<span>地图</span>
					</div>
					<div class="mapTypeCard earth" id="wu2" @click="getLayer('wu2')" title="影像">
						<span>影像</span>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>
<script src='./NewMapControls.js'></script>
