export default class Engine {
    constructor() {
        this.stockfish = new Worker("/stockfish.js");
        this.onMessage = (data) => {
            console.log("Engine:", data);
        };

        this.stockfish.onmessage = (event) => {
            const line = event.data;
            if (line === 'uciok') {
                this.loaded = true;
            }
            if (this.onMessage) {
                this.onMessage(line);
            }
        };

        this.stockfish.postMessage("uci");
    }

    evaluatePosition(fen, depth = 10) {
        if (!this.loaded) return; // Wait for uciok in real app, but for now simple check
        this.stockfish.postMessage(`position fen ${fen}`);
        this.stockfish.postMessage(`go depth ${depth}`);
    }

    stop() {
        this.stockfish.postMessage("stop");
    }

    quit() {
        this.stockfish.postMessage("quit");
    }
}
