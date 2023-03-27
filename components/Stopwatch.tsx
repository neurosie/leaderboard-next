import { format } from "path";
import React, { useRef, useState } from "react";

function formatTime(timeMs: number) {
    const d = new Date(0);
    d.setMilliseconds(timeMs);
    return `${d.toISOString().substring(11, 19)}.${d.getMilliseconds().toString().padStart(3, '0')}`;
}

export default function Stopwatch() {
    const [time, setTime] = useState(formatTime(0));
    const running = useRef(false);
    const startTimestamp = useRef<number | undefined>(undefined);
    const renderId = useRef<number | undefined>(undefined);

    const step = (time: DOMHighResTimeStamp) => {
        if (startTimestamp.current === undefined) {
            startTimestamp.current = time;
        }
        const elapsed = time - startTimestamp.current!;
        setTime(formatTime(elapsed));
        renderId.current = requestAnimationFrame((time) => step(time));
    }

    function start() {
        if (!running.current) {
            running.current = true;
            renderId.current = requestAnimationFrame((time) => step(time));
        }
    }

    function stop() {
        if (running.current) {
            running.current = false;
            cancelAnimationFrame(renderId.current!);
            renderId.current = undefined;
            startTimestamp.current = undefined;
        }
    }

    return (
        <div>
            <button
                onPointerDown={start}
                onKeyDown={start}
                onPointerUp={stop}
                onKeyUp={stop}
                onBlur={stop}
            >
                HOLD
            </button>
            <code style={{ display: 'block' }}>{time}</code>
        </div>
    );
}