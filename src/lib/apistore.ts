import { readable } from 'svelte/store';
import { hassUrl, token } from './env'
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
	const auth = createLongLivedTokenAuth(
		hassUrl,
		token
	);
	createAndSubscribe(auth, set)
	return function stop() {
		conn.close()
	}
});


export const action = (serviceType: string, target: string) => {
	let [domain, service] = serviceType.split('.');
	callService(conn, domain, service, undefined, {
		entity_id: target
	});
}