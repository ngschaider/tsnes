export default class Event {

    listeners: Function[] = [];

    trigger(...params: any[]) {
        for(let callback of this.listeners) {
            callback(...params);
        }
    }

    on(cb: Function) {
        this.listeners.push(cb);
    }

    off(cb: Function) {
        this.listeners = this.listeners.filter(f => f !== cb);
    }

}