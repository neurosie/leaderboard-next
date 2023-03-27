import { displayTime } from "@/time";
import React, { useRef, useState } from "react";

export default function Stopwatch({ onNewRun }: { onNewRun: (time: number) => void }) {
    const [time, setTime] = useState(0);
    const running = useRef(false);
    const startTimestamp = useRef<number | undefined>(undefined);
    const renderId = useRef<number | undefined>(undefined);

    const step = (time: DOMHighResTimeStamp) => {
        if (startTimestamp.current === undefined) {
            startTimestamp.current = time;
        }
        const elapsed = time - startTimestamp.current!;
        setTime(elapsed);
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
            onNewRun(time);
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <p className="w-full text-4xl text-center font-mono">{displayTime(time)}</p>
            <button
                className="w-full h-16 bg-green-300 text-xl text-gray-900 font-bold font-mono select-none"
                onPointerDown={start}
                onKeyDown={start}
                onPointerUp={stop}
                onKeyUp={stop}
                onBlur={stop}
            >
                HOLD
            </button>
        </div>
    );
}