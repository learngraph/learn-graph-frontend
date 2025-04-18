import LanguageIcon from "@mui/icons-material/Language";
import ChatIcon from "@mui/icons-material/Chat";

export type USPFeatureCardWithIcons = {
  symbol: string;
  headline: string;
  text: string;
};

export default function USPCTASectionWithIcons({
  blocks,
}: {
  blocks: USPFeatureCardWithIcons[];
}) {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
      {blocks.map((block, index) => (
        <div
          key={index}
          onClick={() => (window.location.href = "/contact")}
          className="flex flex-col items-start p-6 rounded-2xl shadow-md cursor-pointer max-w-sm transition transform hover:scale-105 hover:shadow-2xl hover:bg-white/50 bg-white/30 backdrop-blur-md text-black w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33%-1.5rem)] xl:w-[calc(25%-1.5rem)] dark:bg-black/20 dark:text-white"
        >
          <div className="text-3xl mb-4">{block.symbol}</div>
          <h3 className="text-xl font-semibold mb-2">{block.headline}</h3>
          <p className="text-base mb-4">{block.text}</p>

          <div className="mt-auto flex gap-4 justify-center w-full">
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open("https://prototype.learngraph.org", "_blank");
              }}
              className="text-black hover:text-indigo-600 dark:text-white dark:hover:text-indigo-300 cursor-pointer"
              aria-label="Open Prototype"
            >
              <LanguageIcon />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open("https://discord.com/invite/DatEV4kNp6", "_blank");
              }}
              className="text-black hover:text-indigo-600 dark:text-white dark:hover:text-indigo-300 cursor-pointer"
              aria-label="Join Discord"
            >
              <ChatIcon />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
