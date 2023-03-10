import esriLoader from 'esri-loader'
import {
	MapControl
} from "./NewMapControl.js";
import bus from "../eventBus.js";
import ApiSetting from '../ApiSetting.js';


import bottombar from "./bottombar.vue";

var newmap, navToolbar;
var hdmLayer, sectionmap, zdmLayer, identifyHandler;
export default {
	components: {
		bottombar,
	},
	name: 'baseMap',
	props: {
		mapId: {
			type: String,
			default: 'newmapbox'
		},
		mapType: {
			type: String,
			default: 'tiled'
		},
	},
	data() {
		return {
			visibLayers1: new Array(),
			currentscale: {
				mapPoint: {
					x: null,
					y: null
				},
				scale: null
			},

			layerShow: false,

			istoolvis: false,
			mapconfigLayer: this.$store.state.user.userinfo.ServerUrl,
			mapconfigSysInfos: this.$store.state.user.userinfo.SysInfos,
			
			spinShow: false,

			current_com: "",
			current_ref: "",
		}
	},
	watch: {
		currentscale: {
			handler: function(val, oldVal) {
				if (val.mapPoint.x != undefined && val.mapPoint.y != undefined && val.mapPoint != undefined) {
					var scale = parseInt(val.scale)
					if (scale % 2) {
						scale = scale + 1
					}

				}
				this.$store.state.user.scale = scale;
			},
			deep: true,
		},
	},
	beforeDestroy() {
		this.$store.state.user.mapload = true;
		MapControl.setMapClear();
	},
	methods: {
		//创建地图
		createMap() {
			let _this = this
			const options = {
				url: mapconfig.jsapi
			};
			// esriLoader.loadCss(mapconfig.esricss);
			// esriLoader.loadCss(mapconfig.clarocss);
			esriLoader.loadModules(
				[
					"dojo/_base/event",
					"dojo/_base/connect",
					"dojo/parser",
					"dojo/on",
					"dojo/_base/Color",
					'esri/map',
					'esri/geometry/Extent',
					'esri/geometry/scaleUtils',
					'esri/layers/ArcGISTiledMapServiceLayer',
					'esri/layers/ArcGISDynamicMapServiceLayer',
					'esri/tasks/GeometryService',
					'esri/tasks/IdentifyTask',
					'esri/tasks/IdentifyParameters',
					'esri/toolbars/draw',
					'esri/toolbars/navigation',
					'esri/toolbars/edit',
					'dojo/dom-construct',
					'dojo/dom',
					'esri/config',
					"dojo/fx",
					'extend/TDTLayer',
					'extend/TDTAnnoLayer',
					'dojo/domReady!',

				], options).then(([
				event,
				connect,
				parser,
				on,
				Color,
				Map,
				Extent,
				scaleUtils,
				ArcGISTiledMapServiceLayer,
				ArcGISDynamicMapServiceLayer,
				GeometryService,
				IdentifyTask,
				IdentifyParameters,
				Draw,
				Navigation,
				Edit,
				domConstruct,
				dom,
				esriConfig,
				Fx,
				TDTLayer,
				TDTAnnoLayer,
			]) => {
				newmap = new Map(_this.mapId, {
					logo: false,
					slider: false,
					// SpatialReference : new SpatialReference(4548),
					showLabels: true
				})

				let verLayer = new TDTLayer();
				verLayer.id = verLayer.name = 'tdt001';
				newmap.addLayer(verLayer)
				var veranno = new TDTAnnoLayer();
				veranno.id = veranno.name = 'tdtanno001';
				newmap.addLayer(veranno)

				const geometryservice = new esri.tasks.GeometryService(
					mapconfig.GeometryService + '?token=' + _this.$store.getters.servertoken
				)

				let navToolbar = new esri.toolbars.Navigation(newmap)
				let drawToolbar = new esri.toolbars.Draw(newmap)
				// let editToolbar = new esri.toolbars.Edit(newmap)

				var graphicLayer1 = new esri.layers.GraphicsLayer()
				graphicLayer1.id = 'graphicLayer1'
				newmap.addLayer(graphicLayer1)
				MapControl.graphicLayers['gralyr1'] = graphicLayer1

				var graphicLayer2 = new esri.layers.GraphicsLayer()
				graphicLayer2.id = 'graphicLayer2'
				newmap.addLayer(graphicLayer2)
				MapControl.graphicLayers['gralyr2'] = graphicLayer2

				var graphicLayer3 = new esri.layers.GraphicsLayer()
				graphicLayer3.id = 'graphicLayer3'
				newmap.addLayer(graphicLayer3)
				MapControl.graphicLayers['gralyr3'] = graphicLayer3

				var graphicLayer4 = new esri.layers.GraphicsLayer();
				graphicLayer4.id = "graphicLayer4";
				newmap.addLayer(graphicLayer4);
				MapControl.graphicLayers["gralyr4"] = graphicLayer4;

				var graphicLayer5 = new esri.layers.GraphicsLayer();
				graphicLayer5.id = "graphicLayer5";
				newmap.addLayer(graphicLayer5);
				MapControl.graphicLayers["gralyr5"] = graphicLayer5;

				newmap.on("mouse-move", function(event) {
					event.scale = scaleUtils.getScale(newmap);
					_this.currentscale.mapPoint.x = event.mapPoint.x;
					_this.currentscale.mapPoint.y = event.mapPoint.y;
				});
				newmap.on("zoom-end", function(event) {
					event.scale = scaleUtils.getScale(newmap);
					_this.currentscale.scale = event.scale
				});

				MapControl.mapId = _this.mapId;
				MapControl.map[_this.mapId] = newmap
				MapControl.isLoad[_this.mapId] = true
				MapControl.navToolbar[_this.mapId] = navToolbar
				MapControl.drawToolbar[_this.mapId] = drawToolbar
				// MapControl.editToolbar[_this.mapId] = editToolbar
				MapControl.GeometryService = geometryservice
				newmap.on('load', _this.initFunctionality());

			})

		},
		initFunctionality() {
			this.$store.state.user.mapload = true;
			let extent = {
				spatialReference: {
					wkid: 0,
					latestWkid: 0
				},
				type: "extent",
				xmin: 0,
				ymin: 0,
				xmax: 0,
				ymax: 0
			};
			for (var l = 0; l < this.mapconfigSysInfos.length; l++) {
				if (
					this.$store.state.user.pname == this.mapconfigSysInfos[l].desktopname
				) {

					var e = this.mapconfigSysInfos[l].extent;
					var extentSys = JSON.parse(e);
					extent.xmin = extentSys.xmin;
					extent.ymin = extentSys.ymin;
					extent.xmax = extentSys.xmax;
					extent.ymax = extentSys.ymax;
				}
			}
			let mapExtent = new esri.geometry.Extent(
				extent.xmin,
				extent.ymin,
				extent.xmax,
				extent.ymax,
				newmap.spatialReference
			);
			newmap.setExtent(mapExtent);
		},
		getLayer(id) {
			if (id == "wu2") { //影像图
				
			} else if (id == "wu1") {
				
			}
		},
		// =================================工具条组件方法================================================
		showCompt(name, type) {
			if (name != 'mapoutput01fwzt'){ MapControl.setMapClear();}
			
			if (MapControl.identifyHandler != undefined) {
				MapControl.identifyHandler.remove();
			}
			this.current_com = this.current_ref = name;
			setTimeout(() => {
				this.$refs[name].initial(type)
			}, 300);
		},
		clearCompt() {
			this.current_com = this.current_ref = "";
		},
	},

	mounted() {
		var _this = this;
		_this.clearCompt();
		_this.createMap()

	},
	created() {
		this._getLess("/map/NewMapControl.less");
	},
};
