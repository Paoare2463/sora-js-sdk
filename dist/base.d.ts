import { Callbacks, ConnectionOptions, JSONType, SignalingOfferMessage, SignalingUpdateMessage, SignalingReOfferMessage } from "./types";
import SoraE2EE from "@sora/e2ee";
declare global {
    interface Algorithm {
        namedCurve: string;
    }
}
export default class ConnectionBase {
    role: string;
    channelId: string;
    metadata: JSONType | undefined;
    signalingUrl: string;
    options: ConnectionOptions;
    constraints: any;
    debug: boolean;
    clientId: string | null;
    connectionId: string | null;
    remoteConnectionIds: string[];
    stream: MediaStream | null;
    authMetadata: JSONType;
    pc: RTCPeerConnection | null;
    encodings: RTCRtpEncodingParameters[];
    dataChannelSignaling: boolean;
    protected ws: WebSocket | null;
    protected callbacks: Callbacks;
    protected e2ee: SoraE2EE | null;
    protected connectionTimeoutTimerId: number;
    protected dataChannels: {
        [key in string]?: RTCDataChannel;
    };
    private ignoreDisconnectWebSocket;
    private closeWebSocket;
    private connectionTimeout;
    private dataChannelSignalingTimeout;
    private dataChannelSignalingTimeoutId;
    private disconnectWaitTimeout;
    private mids;
    private signalingSwitched;
    constructor(signalingUrl: string, role: string, channelId: string, metadata: JSONType, options: ConnectionOptions, debug: boolean);
    on<T extends keyof Callbacks, U extends Callbacks[T]>(kind: T, callback: U): void;
    stopAudioTrack(stream: MediaStream): Promise<void>;
    stopVideoTrack(stream: MediaStream): Promise<void>;
    replaceAudioTrack(stream: MediaStream, audioTrack: MediaStreamTrack): Promise<void>;
    replaceVideoTrack(stream: MediaStream, videoTrack: MediaStreamTrack): Promise<void>;
    private stopStream;
    private disconnectWebSocket;
    private disconnectDataChannel;
    private disconnectPeerConnection;
    disconnect(): Promise<void>;
    protected setupE2EE(): void;
    protected startE2EE(): void;
    protected signaling(offer: RTCSessionDescriptionInit): Promise<SignalingOfferMessage>;
    protected createOffer(): Promise<RTCSessionDescriptionInit>;
    protected connectPeerConnection(message: SignalingOfferMessage): Promise<void>;
    protected setRemoteDescription(message: SignalingOfferMessage | SignalingUpdateMessage | SignalingReOfferMessage): Promise<void>;
    protected createAnswer(message: SignalingOfferMessage | SignalingUpdateMessage | SignalingReOfferMessage): Promise<void>;
    protected sendAnswer(): void;
    protected onIceCandidate(): Promise<void>;
    protected waitChangeConnectionStateConnected(): Promise<void>;
    protected setConnectionTimeout(): Promise<MediaStream>;
    protected clearConnectionTimeout(): void;
    protected trace(title: string, message: unknown): void;
    private signalingOnMessageE2EE;
    private signalingOnMessageTypeOffer;
    private sendUpdateAnswer;
    private sendReAnswer;
    private signalingOnMessageTypeUpdate;
    private signalingOnMessageTypeReOffer;
    private signalingOnMessageTypePing;
    private signalingOnMessageTypeNotify;
    private signalingOnMessageTypeSwitch;
    private setSenderParameters;
    private getStats;
    private onDataChannel;
    private sendMessage;
    private sendE2EEMessage;
    private monitorDataChannelMessage;
    private getAudioTransceiver;
    private getVideoTransceiver;
    get e2eeSelfFingerprint(): string | undefined;
    get e2eeRemoteFingerprints(): Record<string, string> | undefined;
    get audio(): boolean;
    get video(): boolean;
}
