import { Component } from "../base/Component";
import { IEvents } from '../base/Events';

interface IGalleryData {
    catalog: HTMLElement[];
}

export class GalleryView extends Component<IGalleryData> {
    constructor(
        container: HTMLElement,
        protected events: IEvents,
    ) {
        super(container);
    }

    set catalog(items: HTMLElement[]) {
        this.container.replaceChildren(...items);
        this.events.emit('gallery:updated');
    }
}