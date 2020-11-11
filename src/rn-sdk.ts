interface Listens {
    hardwareBackPress:Array<String>
}

interface EventTarget {
    listens:Listens,
    addEventListener:Function,
    removeEventListener:Function,
    removeAllListeners:Function,
}

export let rn: {
    init: any;
    ReactNativeContext: any;
    type: String,
    BackHandler:EventTarget
};

