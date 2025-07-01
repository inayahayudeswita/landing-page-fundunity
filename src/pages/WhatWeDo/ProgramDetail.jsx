import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProgramDetail() {
  const { id } = useParams();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const res = await fetch(`https://backend-donatebank.vercel.app/v1/content/programs/${id}`);
        const data = await res.json();
        setProgram(data);
      } catch (error) {
        console.error("Error fetching program detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgram();
  }, [id]);

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!program) return <p className="text-center mt-20 text-red-500">Program not found.</p>;

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold text-blue-800 mb-6">{program.title}</h1>
      {program.imageUrl && (
        <img src={program.imageUrl} alt={program.title} className="w-full rounded-lg mb-6 object-cover" />
      )}
      <p className="text-gray-700 leading-relaxed">{program.description}</p>
    </div>
  );
}

export default ProgramDetail;
