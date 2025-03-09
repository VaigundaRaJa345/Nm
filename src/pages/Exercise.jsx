import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Exercise.css';

const Exercise = () => {
  const { id } = useParams();
  const [exercise, setExercise] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  const fetchData = async (id) => {
    const options = {
      method: 'GET',
      url: `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`, 
      headers: {
        'X-RapidAPI-Key': 'ae40549393msh0c35372c617b281p103ddcjsn0f4a9ee43ff0',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setExercise(response.data);
      fetchRelatedVideos(response.data.name);
    } catch (error) {
      console.error("Error fetching exercise details:", error);
    }
  };

  const fetchRelatedVideos = async (name) => {
    if (!name) return;

    const options = {
      method: 'GET',
      url: 'https://youtube-search-and-download.p.rapidapi.com/search',
      params: {
        query: name,
        hl: 'en',
        type: 'v',
        sort: 'r'
      },
      headers: {
        'X-RapidAPI-Key': 'ae40549393msh0c35372c617b281p103ddcjsn0f4a9ee43ff0',
        'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setRelatedVideos(response.data.contents?.filter(video => video.video) || []);
    } catch (error) {
      console.error("Error fetching YouTube videos:", error);
    }
  };

  return (
    <div className='exercise-page'>
      {exercise ? (
        <div className="exercise-container">
          <div className="exercise-image">
            <img src={exercise?.gifUrl} alt={exercise?.name} />
          </div>

          <div className="exercise-data">
            <h3>{exercise?.name}</h3>
            <span><b>Target:</b> <p>{exercise?.target}</p></span>
            <span><b>Equipment:</b> <p>{exercise?.equipment}</p></span>
            
            {exercise?.secondaryMuscles?.length > 0 && (
              <span>
                <b>Secondary Muscles:</b>
                <ul>
                  {exercise.secondaryMuscles.map((muscle, index) => (
                    <li key={index}>{muscle}</li>
                  ))}
                </ul>
              </span>
            )}

            {exercise?.instructions?.length > 0 && (
              <div className="exercise-instructions">
                <h3>Instructions</h3>
                <ul>
                  {exercise.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>Loading exercise details...</p>
      )}

      <div className="related-videos-container">
        <h3>Related Videos on YouTube</h3>
        {relatedVideos.length > 0 ? (
          <div className="related-videos">
            {relatedVideos.slice(0, 10).map((video, index) => (
              <div 
                className="related-video" 
                key={index} 
                onClick={() => window.open(`https://www.youtube.com/watch?v=${video.video.videoId}`, "_blank")} // ✅ Fixed template string
              >
                <img src={video?.video?.thumbnails?.[0]?.url} alt={video?.video?.title} />
                <h4>{video?.video?.title.length > 40 ? video.video.title.slice(0, 40) + "..." : video.video.title}</h4>
                <span>
                  <p>{video?.video?.channelName}</p>
                  <p>{video?.video?.viewCountText || "No views available"}</p>
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p>No related videos found.</p>
        )}
      </div>
    </div>
  );
}

export default Exercise;