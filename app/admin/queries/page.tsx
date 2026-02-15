"use client";

import { useEffect, useState } from "react";

interface Query {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export default function QueriesPage() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQueries = async () => {
    setLoading(true);
    const res = await fetch("/api/queries");
    const data = await res.json();
    setQueries(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this query?")) return;

    await fetch(`/api/queries/${id}`, {
      method: "DELETE",
    });

    fetchQueries();
  };

  if (loading) {
    return <QueriesShimmer />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#022c75] mb-6">
        Customer Queries
      </h1>

      <div className="bg-white p-6 rounded-xl shadow text-[#022c75]">
        {queries.length === 0 ? (
          <p className="text-gray-500 text-center py-6">
            No queries found
          </p>
        ) : (
          <div className="space-y-6">
            {queries.map((query) => (
              <div
                key={query.id}
                className="border rounded-lg p-4 space-y-2"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{query.name}</p>
                    <p className="text-sm text-gray-600">
                      {query.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      {query.phone}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDelete(query.id)}
                    className="text-red-600 text-sm"
                  >
                    Delete
                  </button>
                </div>

                <p className="text-gray-700">
                  {query.message}
                </p>

                <p className="text-xs text-gray-400">
                  {new Date(query.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* SHIMMER */
function QueriesShimmer() {
  return (
    <div>
      <div className="h-8 bg-gray-300 w-64 mb-6 rounded animate-pulse"></div>

      <div className="bg-white p-6 rounded-xl shadow animate-pulse space-y-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="border rounded-lg p-4 space-y-3"
          >
            <div className="h-4 bg-gray-300 w-40 rounded"></div>
            <div className="h-3 bg-gray-200 w-52 rounded"></div>
            <div className="h-3 bg-gray-200 w-32 rounded"></div>
            <div className="h-4 bg-gray-200 w-full rounded"></div>
            <div className="h-3 bg-gray-200 w-24 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}