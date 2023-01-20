import { readable, type Subscriber } from 'svelte/store';
import { browser } from '$app/environment';
import { get } from 'svelte/store';
import { page } from '$app/stores';
import {
	createConnection,
	createLongLivedTokenAuth,
	subscribeEntities,
	callService,
	Connection,
	type HassEntities,
	getAuth,
	type SaveTokensFunc,
	ERR_INVALID_AUTH
  } from "home-assistant-js-websocket";

let conn: Connection;

async function loadTokens() {
	try {
		return JSON.parse(localStorage.hassTokens)
	}
	catch (err) {
		return undefined
	}
}

const saveTokens: SaveTokensFunc = (tokens) => {
	localStorage.hassTokens = JSON.stringify(tokens)
}

const createAndSubscribe = async (set: Subscriber<HassEntities | null>) => {
	const settings = get(page).data.baseSettings;
	let auth;
	if (settings.token === null) {
		auth = await getAuth({ hassUrl: settings.hassBaseUrl, loadTokens, saveTokens });
	}
	else {
		auth = createLongLivedTokenAuth(settings.hassBaseUrl, settings.token)
	}
	try {
		conn = await createConnection({ auth });
	}
	catch (err) {
		if (err === ERR_INVALID_AUTH) {
			saveTokens(null);
			auth = await getAuth({ hassUrl: settings.hassBaseUrl, loadTokens, saveTokens });
			conn = await createConnection({ auth });
		}
	}
	subscribeEntities(
		conn,
		entities => {
			set(entities);
		}
	)
	conn.addEventListener(
		"disconnected",
		function disconnectHandler(connection, data) {
			console.log("Connection lost")
			set(null)
		}
	)
}

export const stateStore = readable<null | HassEntities>(null, function start(set) {
	if (browser) {		
		createAndSubscribe(set)
		return function stop() {
			conn.close()
		}
	}
	return function stop() {}
});


export const action = (serviceType: string, target: string) => {
	let [domain, service] = serviceType.split('.');
	callService(conn, domain, service, undefined, {
		entity_id: target
	});
}

export const getHassAuth = async (hassBaseUrl: string) => {
	let auth = await getAuth({ hassUrl: hassBaseUrl, loadTokens, saveTokens });
	if (auth.expired) {
		try {
			await auth.refreshAccessToken();
		}
		catch {
			saveTokens(null);
			auth = await getAuth({ hassUrl: hassBaseUrl, loadTokens, saveTokens });
		}
	}

	return auth;
}