/**
 * @sora/kohaku
 * Kohaku Library
 * @version: 2021.1.0-canary.1
 * @author: Shiguredo Inc.
 * @license: Apache-2.0
 **/

// https://w3c.github.io/webrtc-stats/#certificatestats-dict*
// interface RTCCertificate extends RTCStats {
//   base64Certificate?: string;
// }
// https://w3c.github.io/webrtc-stats/#obsolete-rtcaudioreceiverstats-members
// interface RTCAudioMediaStreamTrackReceiver extends RTCStats {
//   jitterBufferDelay: number;
//   jitterBufferEmittedCount: number;
//   // custom attribute
//   remoteConnectionId: string;
//   currentJitterBufferDelay: number;
// }
// function parseRTCCertificate(currentState: RTCCertificate): RTCCertificate {
//   delete currentState["base64Certificate"];
//   return currentState;
// }
// function parseRTCAudioMediaStreamTrackReceiver(
//   currentState: RTCAudioMediaStreamTrackReceiver,
//   prevState: RTCAudioMediaStreamTrackReceiver | undefined
// ): RTCAudioMediaStreamTrackReceiver {
//   currentState.currentJitterBufferDelay = 0;
//   currentState.remoteConnectionId = "";
//   if (prevState) {
//     const jitterBufferDelay = currentState.jitterBufferDelay - prevState.jitterBufferDelay;
//     const jitterBufferEmittedCount = currentState.jitterBufferEmittedCount - prevState.jitterBufferEmittedCount;
//     currentState.currentJitterBufferDelay = Math.floor((jitterBufferDelay / jitterBufferEmittedCount) * 1000);
//   }
//   return currentState;
// }
class Kohaku {
    constructor(url, version) {
        this.pc = null;
        this.kohakuURL = url;
        this.trackIdConnectionIdMap = {};
        this.intervalId = null;
        this.channelId = null;
        this.connectionId = null;
        this.clientId = null;
        this.version = version;
        this.prevStats = [];
    }
    start(channelId, connectionId, clientId, pc) {
        this.pc = pc;
        this.channelId = channelId;
        this.connectionId = connectionId;
        this.clientId = clientId;
        this.intervalId = window.setInterval(() => {
            this.postMetrics();
        }, 5000);
    }
    stop() {
        this.pc = null;
        this.channelId = null;
        this.connectionId = null;
        this.clientId = null;
        if (this.intervalId !== null) {
            window.clearInterval(this.intervalId);
        }
    }
    async postMetrics() {
        const stats = await this.getStats();
        if (this.channelId === null || this.connectionId === null || this.clientId === null) {
            // TODO(yuito): 例外処理をいれる
            console.warn(`Not enough parameters existed. channelId: ${this.channelId}, connectionId: ${this.connectionId}, clientId: ${this.clientId}`);
            return;
        }
        await fetch(this.kohakuURL, {
            method: "POST",
            body: JSON.stringify({
                version: this.version,
                environment: window.navigator.userAgent.toLocaleLowerCase(),
                channel_id: this.channelId,
                connection_id: this.connectionId,
                client_id: this.clientId,
                stats: stats,
            }),
            headers: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                "Content-Type": "application/json",
            },
            mode: "no-cors",
        });
    }
    async getStats() {
        // TODO(yuito): peerConnection の状態に応じて getStats を実行するかどうかを判断する
        const stats = [];
        if (!this.pc) {
            return stats;
        }
        const reports = await this.pc.getStats();
        const webrtcStats = [];
        reports.forEach((state) => {
            webrtcStats.push(state);
        });
        return webrtcStats;
    }
}

export default Kohaku;
