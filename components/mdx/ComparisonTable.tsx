export function ComparisonTable({
  headers,
  rows,
  caption,
}: {
  headers: string[];
  rows: string[][];
  caption?: string;
}) {
  return (
    <div className="my-4 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        {caption ? (
          <caption className="mb-2 text-start font-medium">{caption}</caption>
        ) : null}
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} className="border-b px-3 py-2 text-start font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border-b px-3 py-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
