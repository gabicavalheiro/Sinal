import type { Letter } from "../domain/landmarks";

export function HandIllustration({
  letter = "B",
  landmarks = false,
  className = "",
}: {
  letter?: Letter;
  landmarks?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={`hand-illustration ${className}`}
      viewBox="0 0 240 270"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={`hand-${letter}`}
          x1="61"
          y1="70"
          x2="195"
          y2="245"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#d9b898" />
          <stop offset="1" stopColor="#b88e70" />
        </linearGradient>
      </defs>
      {letter === "B" ? (
        <>
          <path
            d="M91 251L86 218C69 204 62 183 61 163L56 124C55 113 68 108 73 120L84 146L76 61C75 47 93 45 95 60L101 118L99 37C99 22 118 22 119 37L122 115L128 43C129 29 147 31 146 46L142 119L151 64C153 50 170 53 168 68L157 157C156 166 162 171 161 184C161 201 150 213 149 224L149 251Z"
            fill={`url(#hand-${letter})`}
            stroke="#8c6d55"
            strokeWidth="1.5"
          />
          <path
            d="M67 149C79 142 95 155 106 163L131 158C142 157 146 171 136 177L115 188C108 191 101 186 93 181M101 118L101 145M122 115L122 143M142 119L139 144M91 210C105 215 123 212 133 204M98 228C109 231 129 229 143 224"
            stroke="#96745b"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </>
      ) : letter === "A" ? (
        <>
          <path
            d="M77 250L74 215C63 202 59 189 60 171L64 123C64 110 80 108 83 121L84 145L83 110C82 95 100 94 103 108L106 141L108 109C109 95 127 98 128 112L130 145L135 121C138 107 154 111 153 125L150 175L159 134C162 122 177 125 175 138L168 192C166 209 149 220 147 232L146 250Z"
            fill={`url(#hand-${letter})`}
            stroke="#8c6d55"
            strokeWidth="1.5"
          />
          <path
            d="M65 151L84 157L106 153L130 157L150 155M81 159L82 180M105 158L106 181M129 162L127 183M72 191C91 203 118 205 138 195M84 226C107 233 130 226 145 219"
            stroke="#96745b"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </>
      ) : letter === "C" ? (
        <>
          <path
            d="M79 251L73 220C58 202 55 182 60 157L70 112C75 90 90 74 111 69L155 64C171 63 175 81 158 85L124 93L112 106L151 95C166 91 173 108 157 114L120 129L115 150C128 144 148 144 162 149C177 155 174 172 158 169L132 169L118 187C113 196 129 205 143 206L151 251Z"
            fill={`url(#hand-${letter})`}
            stroke="#8c6d55"
            strokeWidth="1.5"
          />
          <path
            d="M73 150L92 125L110 118M73 171C85 162 101 159 115 150M78 202C90 214 110 220 131 218M86 231L137 233"
            stroke="#96745b"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <path
            d="M80 250L77 216C64 200 59 185 62 166L69 130C71 116 88 118 88 132L89 145L91 43C91 27 110 28 111 43L113 125L119 109C125 96 141 103 137 117L133 133L142 121C151 111 164 123 156 135L145 155L157 146C171 138 183 152 171 163L149 185C145 204 144 218 145 250Z"
            fill={`url(#hand-${letter})`}
            stroke="#8c6d55"
            strokeWidth="1.5"
          />
          <path
            d="M75 148C87 140 100 146 110 158L126 171C136 177 128 190 117 186L94 174M114 130L113 152M136 135L129 155M81 208C99 217 118 214 134 205M91 229C111 233 127 229 141 226"
            stroke="#96745b"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </>
      )}
      {landmarks && (
        <g stroke="#d8f3c0" strokeWidth="1.6" strokeLinecap="round">
          <path d="M119 233L78 157L68 133M119 233L96 157L87 64M96 157L119 154L110 38M119 154L139 153L138 46M139 153L150 165L159 65M119 233L150 165M78 157L105 170L130 168" />
          {[
            [119, 233],
            [78, 157],
            [73, 146],
            [68, 133],
            [96, 157],
            [93, 122],
            [90, 92],
            [87, 64],
            [119, 154],
            [116, 114],
            [113, 76],
            [110, 38],
            [139, 153],
            [138, 116],
            [138, 81],
            [138, 46],
            [150, 165],
            [154, 128],
            [157, 96],
            [159, 65],
            [130, 168],
          ].map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={3}
              fill="#e1f5c5"
              stroke="#527361"
              strokeWidth=".8"
            />
          ))}
        </g>
      )}
    </svg>
  );
}
