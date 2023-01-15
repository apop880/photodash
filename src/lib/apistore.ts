import { readable } from 'svelte/store';
import { browser } from '$app/environment';
import { env } from '$env/dynamic/public'
import {
	createConnection,
	createLongLivedTokenAuth,
	subscribeEntities,
	callService,
	Connection,
	type HassEntities
  } from "home-assistant-js-websocket";

let conn: Connection;

const createAndSubscribe = async (auth, set) => {
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
		const auth = createLongLivedTokenAuth(
			env.SUPERVISOR_URL,
			env.SUPERVISOR_TOKEN
		);
		createAndSubscribe(auth, set)
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