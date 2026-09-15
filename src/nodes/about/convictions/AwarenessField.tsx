// Renders a three-word phrase as a stacked typographic display.
// The CSS targets span:nth-child(2) for the smaller "over" treatment —
// this component therefore expects exactly 3 words.
export function AwarenessField({ phrase }: { phrase: string }) {
  const words = phrase.split(" ");

  if (import.meta.env.DEV && words.length !== 3) {
    console.warn(
      `AwarenessField: expected exactly 3 words, got ${words.length} ("${phrase}"). ` +
        "The stacked layout only supports three words.",
    );
  }

  return (
    <section className="convictions-awareness" aria-label={phrase}>
      <p aria-hidden="true">
        {words.map((word) => (
          <span key={word}>{word}</span>
        ))}
      </p>
    </section>
  );
}
