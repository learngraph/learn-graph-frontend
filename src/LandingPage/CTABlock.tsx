export default function USPCTASection({ blocks }) {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
      {blocks.map((block, index) => (
        <div
          key={index}
          onClick={block.onClick}
          className="flex flex-col items-start p-6 rounded-2xl shadow-md cursor-pointer max-w-sm transition transform hover:scale-105 hover:shadow-2xl hover:bg-white/20 bg-white/10 backdrop-blur-md text-white w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33%-1.5rem)] xl:w-[calc(25%-1.5rem)] dark:bg-black/20"
        >
          <div className="text-3xl mb-4">{block.symbol}</div>
          <h3 className="text-xl font-semibold mb-2">{block.headline}</h3>
          <p className="text-base mb-4">{block.text}</p>
          <button className="mt-auto text-sm font-medium text-white underline hover:text-indigo-300">
            {block.cta}
          </button>
        </div>
      ))}
    </div>
  );
}
