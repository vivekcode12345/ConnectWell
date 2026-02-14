const StaticPage = ({ title, subtitle, items }) => {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <section className="rounded-[32px] border-2 border-ink/10 bg-white p-8 shadow-lg">
        <h2 className="font-display text-3xl">{title}</h2>
        {subtitle && <p className="mt-2 text-sm text-ink/70">{subtitle}</p>}
      </section>
      {items?.length > 0 && (
        <section className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border-2 border-ink/10 bg-white p-6 shadow-sm"
            >
              <h3 className="font-display text-xl">{item.title}</h3>
              <p className="mt-2 text-sm text-ink/70">{item.body}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default StaticPage;
