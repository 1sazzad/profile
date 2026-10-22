const naturalOrder = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

export function photosForStem(entries, stem, folder = stem) {
  const key = stem.toLowerCase();
  const aliases = [...new Set([key, folder.toLowerCase()])];
  const matchesTopLevel = (entry) => !entry.group && aliases.some((alias) =>
    entry.stem === alias || entry.stem.startsWith(alias + '-') || entry.stem.startsWith(alias + '_'));
  const labelFor = (entry) => {
    if (entry.group) return entry.stem;
    const prefix = aliases.find((alias) =>
      entry.stem.startsWith(alias + '-') || entry.stem.startsWith(alias + '_'));
    return prefix ? entry.stem.slice(prefix.length + 1) : entry.stem;
  };

  return entries.filter((entry) => aliases.includes(entry.group) || matchesTopLevel(entry))
    .sort((a, b) => {
      if (a.stem === key && !a.group) return -1;
      if (b.stem === key && !b.group) return 1;
      const labelA = labelFor(a);
      const labelB = labelFor(b);
      const numberedA = /^\d+$/.test(labelA);
      const numberedB = /^\d+$/.test(labelB);
      if (numberedA !== numberedB) return numberedA ? -1 : 1;
      return naturalOrder.compare(labelA, labelB);
    });
}
