const naturalOrder = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

export function photosForStem(entries, stem) {
  const key = stem.toLowerCase();
  return entries.filter((entry) => entry.group === key || (!entry.group && (entry.stem === key || entry.stem.startsWith(key + '-') || entry.stem.startsWith(key + '_'))))
    .sort((a, b) => {
      if (a.stem === key && !a.group) return -1;
      if (b.stem === key && !b.group) return 1;
      const labelA = a.group ? a.stem : a.stem.slice(key.length + 1);
      const labelB = b.group ? b.stem : b.stem.slice(key.length + 1);
      return naturalOrder.compare(labelA, labelB);
    });
}
