//地图服务配置
var mapconfig = {
	jsapi: 'http://58.213.48.106/arcgis_js_api/library/3.27/3.27/init.js', //ArcGIS js API地址
	basemap: 'http://58.213.48.106/arcgis/rest/services/NJ08/NJDXT20180830/MapServer', //南京市基础底图
	lsbasemap: 'http://58.213.48.104/arcgis/rest/services/NJ08/LS081/MapServer',
	tzbasemap: 'http://58.213.48.106/arcgis/rest/services/TZPS/TZDXT/MapServer',
	basemapview: 'http://58.213.48.106/arcgis/rest/services/NJ08/NJ08dom1M/MapServer', //基础影像图
	drainage: '排水管网', //排水服务
	GeometryService: 'http://58.213.48.106/arcgis/rest/services/Utilities/Geometry/GeometryServer', //ArcGIS Server空间服务
	webservices: 'http://58.213.48.106/', //后台服务
	
	extent: {
		spatialReference: {
			wkid: 0,
			latestWkid: 0
		},
		type: 'extent',
		xmin: 323510.2165000001,
		ymin: 345299.5855999999,
		xmax: 331744.7149,
		ymax: 356750.94739999995
	},

};