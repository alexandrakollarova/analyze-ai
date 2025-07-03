import React, { useState } from "react";
import clsx from "clsx";
import { ChevronUp, ChevronDown, MoreVertical } from "lucide-react";
import Divider from "./Divider";
import Checkbox from "./Checkbox";

interface Column<T> {
  id?: string;
  header: string;
  accessor?: (row: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  className?: string;
}

export default function Table<T>({ columns, data, className }: TableProps<T>) {
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc" | null>(null);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [menuOpen, setMenuOpen] = useState<number | null>(null);

  // Find the column accessor for sorting
  const getSortAccessor = (col: Column<T>) => {
    if (!col.accessor) return null;
    return (row: T) => {
      const val = col.accessor!(row);
      // If accessor returns a ReactNode, try to extract string/number
      if (typeof val === "string" || typeof val === "number") return val;
      if (React.isValidElement(val) && val.props && typeof (val.props as any).children === "string") return (val.props as any).children;
      return val;
    };
  };

  // Sort data if needed
  let sortedData = data;
  if (sortCol && sortDir) {
    const colIdx = columns.findIndex(c => (c.id || c.header) === sortCol);
    const accessor = getSortAccessor(columns[colIdx]);
    if (accessor) {
      sortedData = [...data].sort((a, b) => {
        let aVal = accessor(a);
        let bVal = accessor(b);
        // Try to parse as date
        const aDate = Date.parse(aVal);
        const bDate = Date.parse(bVal);
        if (!isNaN(aDate) && !isNaN(bDate)) {
          return sortDir === "asc" ? aDate - bDate : bDate - aDate;
        }
        // Number
        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortDir === "asc" ? aVal - bVal : bVal - aVal;
        }
        // String
        aVal = aVal?.toString() ?? "";
        bVal = bVal?.toString() ?? "";
        return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      });
    }
  }

  const handleSort = (col: Column<T>) => {
    const colId = col.id || col.header;
    if (sortCol !== colId) {
      setSortCol(colId);
      setSortDir("asc");
    } else if (sortDir === "asc") {
      setSortDir("desc");
    } else if (sortDir === "desc") {
      setSortCol(null);
      setSortDir(null);
    }
  };

  const allSelected = selected.size === sortedData.length && sortedData.length > 0;
  const someSelected = selected.size > 0 && selected.size < sortedData.length;

  const toggleAll = () => {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(sortedData.map((_, i) => i)));
  };

  const toggleRow = (i: number) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div className={clsx("overflow-x-auto", className)}>
      <table className="min-w-full">
        <thead className="border-b border-gray-light">
          <tr>
            <th className="px-4 py-3 text-left">
              <Checkbox variant="secondary" checked={allSelected} indeterminate={someSelected} onChange={toggleAll} aria-label="Select all rows" />
            </th>
            {columns.map((col, idx) => {
              const colId = col.id || col.header;
              const isSorted = sortCol === colId;
              const isLast = idx === columns.length - 1;
              return (
                <th
                  key={colId}
                  className={clsx(
                    "px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer select-none transition",
                    col.headerClassName,
                    col.accessor && "hover:text-gray-dark group",
                    isSorted ? "text-gray-dark" : "text-gray dark:text-gray-light",
                  )}
                  onClick={() => col.accessor && handleSort(col)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.header}
                    {col.accessor && (
                      isSorted ? (
                        sortDir === "asc" ? <ChevronUp size={16} className="inline text-gray-dark" /> : <ChevronDown size={16} className="inline text-gray-dark" />
                      ) : (
                        <ChevronDown size={16} className="inline opacity-40 group-hover:opacity-80 transition" />
                      )
                    )}
                  </span>
                </th>
              );
            })}
            <th className="px-4 py-3 text-center w-10"></th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <tr
                className="group even:bg-gray-light dark:even:bg-gray-dark hover:bg-gray-lighter dark:hover:bg-gray-dark transition"
                style={{ cursor: "pointer" }}
              >
                <td className="px-4 py-4 text-left">
                  <Checkbox variant="secondary" checked={selected.has(rowIndex)} onChange={() => toggleRow(rowIndex)} aria-label={`Select row ${rowIndex + 1}`} />
                </td>
                {columns.map((col, colIndex) => (
                  <td
                    key={col.id || colIndex}
                    className={clsx(
                      "px-6 py-4 text-sm text-gray-dark dark:text-gray-light align-middle whitespace-nowrap",
                      col.className
                    )}
                  >
                    {col.accessor ? col.accessor(row) : null}
                  </td>
                ))}
                <td className="px-4 py-4 text-center relative">
                  <button
                    className="p-2 rounded-full hover:bg-gray-light"
                    aria-label="More actions"
                    onClick={e => {
                      e.stopPropagation();
                      setMenuOpen(menuOpen === rowIndex ? null : rowIndex);
                    }}
                  >
                    <MoreVertical size={18} />
                  </button>
                  {menuOpen === rowIndex && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-light rounded shadow-lg z-10">
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-error hover:bg-gray-light rounded"
                        onClick={() => {
                          setMenuOpen(null);
                          // TODO: implement delete logic
                          alert('Delete file (not implemented)');
                        }}
                      >
                        Delete file
                      </button>
                    </div>
                  )}
                </td>
              </tr>
              {rowIndex < sortedData.length - 1 && <tr><td colSpan={columns.length + 2}><Divider marginY="my-0" /></td></tr>}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
} 