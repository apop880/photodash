import { readable, type Subscriber } from 'svelte/store';
import { browser } from '$app/environment';
import { env } from '$env/dynamic/public'
import {
	createConnection,
	createLongLivedTokenAuth,
	subscribeEntities,
	callService,
	Connection,
	type HassEntities,
	getAuth
  } from "home-assistant-js-websocket";

let conn: Connection;

const createAndSubscribe = async (set: Subscriber<HassEntities | null>) => {
	const res = await fetch("/api/baseSettings");
	const settings = await res.json();
	let auth;
	if (settings.token === null) {
		auth = await getAuth({ hassUrl: settings.hassBaseUrl });
	}
	else {
		auth = await createLongLivedTokenAuth(settings.hassBaseUrl, settings.token)
	}
	conn = await createConnection({ auth });
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
	const auth = await getAuth({ hassUrl: hassBaseUrl });
	return auth;
}