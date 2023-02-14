export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","share/photodash/Marcy/adrian-valverde-AT6LpklqujY-unsplash.jpg","share/photodash/Marcy/brian-mcgowan-WfPfeM4ek7Q-unsplash.jpg"]),
	mimeTypes: {".png":"image/png",".jpg":"image/jpeg"},
	_: {
		entry: {"file":"_app/immutable/start-86848ff6.js","imports":["_app/immutable/start-86848ff6.js","_app/immutable/chunks/index-fb8a4cb6.js","_app/immutable/chunks/singletons-99afe59e.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js'),
			() => import('./nodes/5.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/config",
				pattern: /^\/api\/config\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/config/_server.ts.js')
			},
			{
				id: "/api/localSlideshow",
				pattern: /^\/api\/localSlideshow\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/localSlideshow/_server.ts.js')
			},
			{
				id: "/config/[[uid]]",
				pattern: /^\/config(?:\/([^/]+))?\/?$/,
				params: [{"name":"uid","optional":true,"rest":false,"chained":true}],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			},
			{
				id: "/settings",
				pattern: /^\/settings\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 5 },
				endpoint: null
			},
			{
				id: "/[uid]",
				pattern: /^\/([^/]+?)\/?$/,
				params: [{"name":"uid","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};