import { writable } from 'svelte/store';


export const messages = writable([]);
export const user = writable({id: 'laurent', name: 'Laurent V'});


