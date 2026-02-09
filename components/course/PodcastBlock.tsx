import type { PodcastBlock as PodcastBlockType } from "@/lib/courses";

const PodcastBlock = ({ block }: { block: PodcastBlockType }) => {
  return (
    <section className="rounded-card border border-odyssey-gray-light/60 bg-white p-6 shadow-[0_20px_50px_rgba(17,17,17,0.08)]">
      <p className="text-xs uppercase tracking-[0.3em] text-odyssey-gray">
        Podcast
      </p>
      <h2 className="mt-2 font-display text-2xl text-foreground">
        {block.title}
      </h2>
      {block.summary ? (
        <p className="mt-2 text-sm text-odyssey-gray">{block.summary}</p>
      ) : null}
      <div className="mt-6 rounded-2xl border border-odyssey-gray-light bg-odyssey-gray-light/30 p-4">
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-odyssey-orange text-white shadow-[0_10px_30px_rgba(242,107,29,0.35)]"
          >
            Play
          </button>
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-odyssey-gray">
              <span>Episode</span>
              <span>{block.length || "12:34"}</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-pill bg-white/70">
              <div className="h-full w-[45%] rounded-pill bg-odyssey-orange" />
            </div>
          </div>
          <div className="text-xs uppercase tracking-[0.2em] text-odyssey-gray">
            1x
          </div>
        </div>
      </div>
      <p className="mt-4 text-xs uppercase tracking-[0.2em] text-odyssey-gray">
        Audio generation coming soon
      </p>
    </section>
  );
};

export default PodcastBlock;
