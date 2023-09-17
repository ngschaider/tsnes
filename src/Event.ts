type EventFn = (...params: any[]) => any;

export default class Event {

    callbacks: EventFn[] = [];

    trigger(...params: any[]): any|undefined {
        for(const callback of this.callbacks) {
            const ret = callback(...params);
            if(ret !== undefined) {
                return ret;
            }
        }
    }

    on(callback: EventFn) {
        this.callbacks.push(callback);
    }

    off(callback: EventFn) {
        this.callbacks = this.callbacks.filter(cb => cb !== callback);
    }

}
