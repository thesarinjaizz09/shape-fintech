export default function SentimentMeter({ value = 75 }) {
  // Value between 0 and 100
  const angle = (value / 100) * 180; // convert to semi-circle angle

  return (
    <div className="relative w-16 h-8 flex items-end justify-center">
      <svg
        viewBox="0 0 100 50"
        className="w-full h-full"
      >
        {/* Background arc */}
        <path
          d="M10,50 A40,40 0 0,1 90,50"
          fill="none"
          stroke="#1E293B"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Active arc */}
        <path
          d="M10,50 A40,40 0 0,1 90,50"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="4"
          strokeDasharray="126"
          strokeDashoffset={126 - (value / 100) * 126}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
        {/* Gradient definition */}
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EF4444" />  {/* Red */}
            <stop offset="50%" stopColor="#EAB308" /> {/* Yellow */}
            <stop offset="100%" stopColor="#22C55E" /> {/* Green */}
          </linearGradient>
        </defs>
        {/* Needle */}
        <line
          x1="50"
          y1="50"
          x2={50 + 35 * Math.cos(Math.PI - (angle * Math.PI) / 180)}
          y2={50 - 35 * Math.sin(Math.PI - (angle * Math.PI) / 180)}
          stroke="#E3B341"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      {/* <div className="absolute bottom-0 text-[10px] text-gray-400">
        Confidence: <span className="text-[#E3B341] font-semibold">{value}%</span>
      </div> */}
    </div>
  );
}
