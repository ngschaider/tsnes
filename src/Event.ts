type EventFn = (...params: any[]) => any;

type EventListener = {
    id: number;
    fn: EventFn;
}

export default class Event {

    nextId: number = 0;

    listeners: EventListener[] = [];

    trigger(...params: any[]): any|undefined {
        for(const listener of this.listeners) {
            const ret = listener.fn(...params);
            if(ret !== undefined) {
                return ret;
            }
        }
    }

    on(callback: EventFn): number {
        console.log(callback);

        const id = this.nextId;
        this.listeners.push({
            id: id,
            fn: callback,
        });

        this.nextId++;

        return id;
    }

    off(id?: number) {
        if(id) {
            this.listeners = this.listeners.filter(listener => listener.id !== id);
        }
    }

}
