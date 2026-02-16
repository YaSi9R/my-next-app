"use client";

import { useEffect, useState } from "react";

interface Query {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  interest?: string;
  message: string;
  createdAt: string;
}

export default function QueriesPage() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchQueries = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/queries");
      const data = await res.json();
      console.log("Fetched queries:", data);

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch queries");
      }

      if (Array.isArray(data)) {
        setQueries(data);
      } else {
        console.error("Data is not an array:", data);
        setQueries([]);
        setError("Invalid data format received from server");
      }
    } catch (err: any) {
      console.error("Error fetching queries:", err);
      setError(err.message || "Failed to load queries");
      setQueries([]);
    } finally {
      setLoading(false);
    }
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

  // if (loading) {
  //   return <QueriesShimmer />;
  // }

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#022c75] mb-6">
        Customer Queries
      </h1>

      <div className="bg-[#e6e6e6] p-4 md:p-6 rounded-xl shadow text-[#022c75]">
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        {
          loading ? <QueriesShimmer /> : <>

            {queries.length === 0 && !error ? (
              <p className="text-[#022c75] text-center py-6">
                No queries found
              </p>
            ) : null}
            {queries.length > 0 && (
              <div className="space-y-6">
                {queries.map((query) => (
                  <div
                    key={query.id}
                    className="border-2 rounded-lg p-4 space-y-2 border-[#022c75]"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-lg">{query.name}</p>
                        <div className="text-sm text-[#022c75] mt-1 space-y-1">
                          <p>Email: {query.email}</p>
                          <p>Phone: {query.phone}</p>
                          {query.company && <p>Company: {query.company}</p>}
                          {query.interest && <p>Interest: {query.interest}</p>}
                        </div>
                      </div>

                      <button
                        onClick={() => handleDelete(query.id)}
                        className="text-red-600 text-sm cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>

                    <p className="text-[#022c75]">
                      {query.message}
                    </p>

                    <p className="text-xs text-[#022c75]">
                      {new Date(query.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </>
        }
      </div>
    </div>
  );
}

/* SHIMMER */
function QueriesShimmer() {
  return (
    <div>
      {/* <div className="h-8 bg-gray-300 w-64 mb-6 rounded animate-pulse"></div> */}

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