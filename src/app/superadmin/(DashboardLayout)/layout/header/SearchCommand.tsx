"use client";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import Menuitems from "../sidebar/MenuItems";

interface SearchCommandProps {
  open: boolean;
  setOpen: (val: boolean) => void;
}

interface FlatItem {
  section: string;
  title: string;
  href: string;
  icon?: string;
}

const flattenMenu = (items: any[]): FlatItem[] => {
  const flat: FlatItem[] = [];
  let section = "";
  items.forEach((item) => {
    if (item.navlabel && item.subheader) {
      section = item.subheader;
    } else if (item.title && item.href) {
      flat.push({ section, title: item.title, href: item.href, icon: item.icon });
    }
    item.children?.forEach((child: any) => {
      if (child.title && child.href) {
        flat.push({ section, title: child.title, href: child.href, icon: child.icon });
      }
    });
  });
  return flat;
};

export default function SearchCommand({ open, setOpen }: SearchCommandProps) {
  const router = useRouter();
  const flatItems = useMemo(() => flattenMenu(Menuitems), []);
  const [query, setQuery] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(0);

  const filtered = useMemo(
    () => flatItems.filter((i) => i.title.toLowerCase().includes(query.toLowerCase())),
    [flatItems, query]
  );

  const grouped = useMemo(() => {
    const obj: Record<string, FlatItem[]> = {};
    filtered.forEach((i) => {
      obj[i.section] = obj[i.section] || [];
      obj[i.section].push(i);
    });
    return obj;
  }, [filtered]);

  const allItems = useMemo(() => Object.values(grouped).flat(), [grouped]);

  const handleNavigate = (href: string) => {
    setOpen(false);
    setQuery("");
    router.push(href);
  };

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    },
    [setOpen]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  const listKeyHandler = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((i) => Math.min(i + 1, allItems.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && allItems[highlightIndex]) {
      handleNavigate(allItems[highlightIndex].href);
    }
  };

  if (!open) return null;

  return (
        <div className="fixed inset-0 z-50 bg-opacity-40 backdrop-blur-sm flex justify-center items-center p-2 sm:p-4">
          <div className="bg-white w-full max-w-sm sm:max-w-md md:max-w-xl p-4 md:p-6 rounded-xl border-2 border-black shadow-[6px_6px_0_0_#000] relative">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Search</h2>
          <button onClick={() => setOpen(false)} className="text-gray-600 hover:text-black">
            <Icon icon="mdi:close" width="24" height="24" />
          </button>
        </div>

        {/* Input */}
        <div className="px-6 py-4">
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setHighlightIndex(0);
            }}
            onKeyDown={listKeyHandler}
            autoFocus
            placeholder="Search sections..."
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Results */}
        <div className="max-h-72 overflow-y-auto">
          {allItems.length === 0 ? (
            <p className="text-center text-gray-600 py-6">No matches found</p>
          ) : (
            Object.entries(grouped).map(([section, items]) => (
              <div key={section}>
                {section && <div className="px-6 py-2 text-sm font-medium text-gray-500">{section}</div>}
                {items.map((item) => {
                  const idx = allItems.findIndex((i) => i.href === item.href);
                  const selected = idx === highlightIndex;
                  return (
                    <div
                      key={item.href}
                      onClick={() => handleNavigate(item.href)}
                      className={`cursor-pointer flex items-center px-6 py-2 ${
                        selected ? "bg-yellow-100" : "hover:bg-gray-100"
                      }`}
                    >
                      {item.icon ? (
                        <Icon icon={`solar:${item.icon}`}  width="20" height="20" className="mr-3 text-gray-700" />
                      ) : (
                        <div className="w-3 h-3 bg-gray-300 rounded-full mr-3" />
                      )}
                      <span className="text-gray-800">{item.title}</span>
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
