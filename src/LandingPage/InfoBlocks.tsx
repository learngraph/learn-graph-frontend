import React from "react";

export interface InfoBlock {
  target: string;
  headline: string;
  imageUrl: string;
  keywords: string[];
}

interface InfoBlocksProps {
  blocks: InfoBlock[];
}

const gradientColors = [
  "from-blue-600 to-indigo-700",
  "from-green-600 to-emerald-700",
  "from-purple-600 to-violet-700",
];

const InfoBlocks: React.FC<InfoBlocksProps> = ({ blocks }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blocks.map((block, index) => (
        <div
          key={block.target}
          className={`flex flex-col rounded-xl overflow-hidden shadow-lg bg-gradient-to-br ${gradientColors[index % gradientColors.length]}`}
        >
          <div className="p-4">
            <h3 className="text-sm uppercase font-semibold text-white opacity-80">
              {block.target}
            </h3>
            <h2 className="text-2xl font-bold text-white mt-1 mb-3">
              {block.headline}
            </h2>
          </div>

          <div className="flex-grow">
            <img
              src={block.imageUrl}
              alt={block.target}
              className="object-cover h-48 w-full"
            />
          </div>

          <div className="p-4 flex flex-wrap gap-2">
            {block.keywords.map((word, idx) => (
              <span
                key={idx}
                className="bg-white/40 text-white rounded-full px-3 py-1 text-sm font-semibold"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoBlocks;
