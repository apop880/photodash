const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","share/photodash/Marcy/adrian-valverde-AT6LpklqujY-unsplash.jpg","share/photodash/Marcy/brian-mcgowan-WfPfeM4ek7Q-unsplash.jpg"]),
	mimeTypes: {".png":"image/png",".jpg":"image/jpeg"},
	_: {
		entry: {"file":"_app/immutable/start-86848ff6.js","imports":["_app/immutable/start-86848ff6.js","_app/immutable/chunks/index-fb8a4cb6.js","_app/immutable/chunks/singletons-99afe59e.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./chunks/0-90bed0dd.js'),
			() => import('./chunks/1-b33c45ad.js'),
			() => import('./chunks/2-e12ebd13.js'),
			() => import('./chunks/3-7631073f.js'),
			() => import('./chunks/4-093ea071.js').then(function (n) { return n._; }),
			() => import('./chunks/5-2394e676.js')
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
				endpoint: () => import('./chunks/_server.ts-39a79ae0.js')
			},
			{
				id: "/api/localSlideshow",
				pattern: /^\/api\/localSlideshow\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./chunks/_server.ts-59f9bcf5.js')
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

export { manifest };
//# sourceMappingURL=manifest.js.map
