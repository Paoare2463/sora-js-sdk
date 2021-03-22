declare class Kohaku {
    version: string;
    kohakuURL: string;
    channelId: string | null;
    connectionId: string | null;
    clientId: string | null;
    pc: RTCPeerConnection | null;
    trackIdConnectionIdMap: {
        [key: string]: string;
    };
    intervalId: null | number;
    prevStats: RTCStats[];
    constructor(url: string, version: string);
    start(channelId: string, connectionId: string, clientId: string, pc: RTCPeerConnection): void;
    stop(): void;
    private postMetrics;
    private getStats;
}
export default Kohaku;
