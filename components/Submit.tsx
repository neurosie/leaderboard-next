import { displayTime } from "@/time";

export default function Submit({ bestRun }: { bestRun: number }) {
    return (
        <div className=""
            style={{ visibility: bestRun === 0 ? 'hidden' : 'initial' }}>
            <p className="">Best time yet: <span className="font-mono ml-2">{displayTime(bestRun)}</span></p>
            <form action="/api/hello" method="post">
                <div className="flex items-baseline">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required maxLength={4} placeholder="AAAA"
                        className="ml-2 text-2xl font-mono border-b uppercase" />
                </div>
                <input type="number" id="score" name="score" value={bestRun} readOnly hidden />
                <div className="flex flex-col items-center">
                    <button type="submit" className="bg-gray-200 border border-green-300 m-4 py-2 px-3">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}