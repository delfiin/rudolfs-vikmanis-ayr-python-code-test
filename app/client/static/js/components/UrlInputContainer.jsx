import React, { useCallback, useState } from 'react';
import classnames from 'classnames';

export default function UrlInputContainer(props) {
  const { buttonText, placeholder, onSubmit } = props;
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  let messageElement = null;
  if (message) {
    const className = classnames({
      [`status-${status}`]: status,
      message: true
    });
    messageElement = <p className={className}>
      {message}
    </p>;
  }

  let loadingElement = null;
  if (loading) {
    loadingElement = <p className="loading-indicator">
      <img src="/static/loading.gif" />
    </p>
  }

  const error = useCallback((msg) => {
    setMessage(msg);
    setStatus("error");
    setLoading(false);
  }, []);

  const success = useCallback((msg) => {
    setMessage(msg);
    setStatus("success");
    setValue("");
    setLoading(false);
  }, []);

  const onInputChange = useCallback((e) => {
    setValue(e.target.value);
    setMessage(null);
    setStatus(null);
  }, []);

  const handleSubmit = useCallback(() => {
    setLoading(true);
    onSubmit(value, success, error);
  }, [value, onSubmit]);

  const onInputKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  }, [handleSubmit]);

  const onButtonClick = useCallback(() => {
    handleSubmit();
  }, [handleSubmit]);

  return (
    <>
      <div className='url-input-container'>
        <input
          disabled={loading}
          placeholder={placeholder}
          value={value}
          onKeyDown={onInputKeyDown}
          onChange={onInputChange}
        />
        <button
          disabled={loading}
          type="button"
          onClick={onButtonClick}
        >
          {buttonText ? buttonText : "Submit"}
        </button>
      </div>
      {loadingElement}
      {messageElement}
    </>
  )
}