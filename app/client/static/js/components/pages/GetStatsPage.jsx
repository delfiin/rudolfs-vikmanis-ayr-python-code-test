import React, { useCallback, } from 'react';
import {
  Link,
  useNavigate,
} from "react-router-dom";
import UrlInputContainer from "../UrlInputContainer";

export default function GetStatsPage() {
  const navigate = useNavigate();

  const onSubmit = useCallback(async function (value, success, error) {
    try {
      const url = new URL(value);
      if (url.origin !== location.origin) {
        return error("The URL is invalid.");
      }
      value = url.pathname.slice(1);
    } catch (err) { }

    if (!/^([0-9a-zA-Z]{5})$/.test(value)) {
      return error("The URL is invalid.");
    }

    navigate(`/get_stats/${value}`);
  }, []);

  return (
    <>
      <p>
        Enter the shortened URL you want to get stats for
      </p>
      <UrlInputContainer
        placeholder={`e.g. f52Kr or ${location.origin}/f52Kr`}
        buttonText="Get stats"
        onSubmit={onSubmit}
      />
      <hr />
      <p>
        <Link to='/'>Shorten a URL →</Link>
      </p>
    </>
  )
}