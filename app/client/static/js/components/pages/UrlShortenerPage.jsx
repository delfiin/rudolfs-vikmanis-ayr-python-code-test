import React, { useCallback } from 'react';
import {
  Link,
} from "react-router-dom";
import UrlInputContainer from "../UrlInputContainer";

export default function UrlShortenerPage() {
  const onSubmit = useCallback(async (value, success, error) => {
    if (!value.trim()) {
      return error("URL cannot be empty.");
    }

    let url;
    try {
      url = new URL(value);
    } catch (err) {
      return error("The URL you entered is invalid.");
    }

    let response;
    let json;
    try {
      response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url: value })
      });
      json = await response.json();
    } catch (err) {
      return error("An unexpected error occurred. Please try again later.");
    }

    if (response.status !== 200) {
      return error(json.message);
    }

    return success(<>
      URL successfully shortened. The shortened URL is:<br />
      <strong>{location.origin}/{json.short_url}</strong><br /><br />
      The long URL is:<br /><strong>{value}</strong>
    </>);
  }, []);

  return (
    <>
      <UrlInputContainer
        placeholder="e.g. http://google.com/search?=my+query"
        buttonText="Shorten"
        onSubmit={onSubmit}
      />
      <hr />
      <p>
        <Link to='/get_stats'>View stats for a shortened URL →</Link>
      </p>
    </>
  )
}