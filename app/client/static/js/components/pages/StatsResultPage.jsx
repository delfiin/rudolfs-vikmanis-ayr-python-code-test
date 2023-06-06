import React, { useEffect, useState, } from 'react';
import {
  useParams,
  Link,
  useNavigate,
} from "react-router-dom";

export default function StatsResultPage() {
  const params = useParams();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const loading = !stats && !error;
  const navigate = useNavigate();

  if (!/^([0-9a-zA-Z]{5})$/.test(params.short_url)) {
    navigate("/get_stats");
  }

  useEffect(() => {
    const asyncEffect = async () => {
      let response;
      let json;
      try {
        response = await fetch(`/api/stats/${params.short_url}`, {
          method: "GET"
        });
        json = await response.json();
      } catch (err) {
        return setError("An unexpected error occurred. Please try again later.");
      }

      if (response.status !== 200) {
        return setError(json.message);
      }

      return setStats(json);
    }
    asyncEffect();
  }, []);

  let loadingElement = null;
  if (loading) {
    loadingElement = (
      <p className="loading-indicator">
        <img src="/static/loading.gif" />
      </p>
    );
  };

  let errorElement = null;
  if (error) {
    errorElement = <p className="message status-error">
      {error}
    </p>;
  }

  let statsElement = null;
  if (stats) {
    statsElement = <p className="message">
      Number of visits:<br />
      <strong style={{ fontSize: "22px" }}>{stats.visits}</strong>
      <br /><br />
      Original URL:<br />
      <strong>{stats.original_url}</strong>
    </p>
  }

  return (
    <>
      <p>Stats for the shortened URL<br /><strong>{location.origin}/{params.short_url}</strong></p>
      {loadingElement}
      {errorElement}
      {statsElement}
      <hr />
      <p>
        <Link to="/">Shorten a URL →</Link><br />
        <Link to="/get_stats">View stats for a shortened URL →</Link>
      </p>
    </>
  )
}