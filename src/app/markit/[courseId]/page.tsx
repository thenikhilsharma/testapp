'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

const UpdateElement = () => {
  const [subject, setSubject] = useState(null); // State for course data
  const [loading, setLoading] = useState(false); // Loading state
  const [presents, setPresents] = useState(0); // Default to 0
  const [totalClasses, setTotalClasses] = useState(0); // Default to 0
  const pathname = usePathname();
  const courseId = pathname?.split('/').pop(); // Extract the dynamic route ID safely
  const router = useRouter();

  useEffect(() => {
    async function getCourseById(id) {
      try {
        const response = await fetch(`/api/courses/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch course data');
        }
        const data = await response.json();
        setSubject(data);
        setPresents(data[0].presents); // Initialize state with fetched data
        setTotalClasses(data[0].totalClasses);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    }
    getCourseById(courseId)
  }, [courseId]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/markit/${courseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ presents, totalClasses}),
      });
      if (!response.ok) {
        throw new Error('Failed to update attendance');
      }
      // const data = await response.json();
      // setPresents(data.presents);
      // setTotalClasses(data.totalClasses);
    } catch (error) {
      console.error('Error updating attendance:', error);
    } finally {
      setLoading(false);
      router.push(`/course/${courseId}`)
    }
  };

  const handleChange = async (d: string) => {
    if (d === 'p1') {
      setPresents((prev) => prev + 1);
      setTotalClasses((prev) => prev + 1);
    } else if (d === 'p0') {
      setPresents((prev) => prev - 1);
      setTotalClasses((prev) => prev - 1);
    } else if (d === 'a1') {
      setTotalClasses((prev) => prev + 1);
    } else if (d === 'a0') {
      setTotalClasses((prev) => prev - 1);
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="text-white">
      <h1>Course Details</h1>
      {subject && subject[0] ? (
        <div>
          <p>Course Name: {subject[0].courseName}</p>
          <p>Presents: {presents}</p>
          <p>Total Classes: {totalClasses}</p>

          <div>
            <button onClick={() => handleChange('p1')} aria-label="Mark Present">
              Mark Present
            </button>
            <button onClick={() => handleChange('p0')} aria-label="Unmark Present">
              Unmark Present
            </button>
            <button onClick={() => handleChange('a1')} aria-label="Mark Present">
              Mark Absent
            </button>
            <button onClick={() => handleChange('a0')} aria-label="Unmark Present">
              Unmark Absent
            </button>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <button type='submit' >Update Attendance</button>
            </form>
          </div>
        </div>
      ) : (
        <p>No course data available</p>
      )}
    </div>
  );
};
export default UpdateElement;