import { format } from "path";
import React, { RefObject } from "react";

interface IProps {
}

interface IState {
    time: string;
}

export class Stopwatch extends React.Component<IProps, IState> {
    private renderId?: number;
    private startTimestamp?: DOMHighResTimeStamp;
    private button: RefObject<HTMLButtonElement>;
    private running = false;

    constructor(props: IProps) {
        super(props);

        this.state = {
            time: this.format(0),
        };
        this.button = React.createRef();
    }

    format = (timeMs: number) => {
        const d = new Date(0);
        d.setMilliseconds(timeMs);
        return `${d.toISOString().substring(11, 19)}.${d.getMilliseconds().toString().padStart(3, '0')}`;
    }

    step = (time: DOMHighResTimeStamp) => {
        if (this.startTimestamp === undefined) {
            this.startTimestamp = time;
        }
        const elapsed = time - this.startTimestamp!;
        this.setState({ time: this.format(elapsed) });
        this.renderId = requestAnimationFrame((time) => this.step(time));
    }

    start = () => {
        if (!this.running) {
            this.running = true;
            this.renderId = requestAnimationFrame((time) => this.step(time));
        }
    }

    stop = () => {
        if (this.running) {
            this.running = false;
            cancelAnimationFrame(this.renderId!);
            this.renderId = undefined;
            this.startTimestamp = undefined;
        }
    }

    render() {
        return (
            <div>
                {/* <button onPointerDown={this.button}>Start/Stop</button> */}
                <button
                    onPointerDown={this.start}
                    onKeyDown={this.start}
                    onPointerUp={this.stop}
                    onKeyUp={this.stop}
                    onBlur={this.stop}
                >
                    HOLD
                </button>
                <code style={{ display: 'block' }}>{this.state.time}</code>
            </div>
        );
    }
}