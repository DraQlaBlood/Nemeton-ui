import React from "react";

const Error = ({ ErrorCode }) => {
  if (ErrorCode === 400) return <div>Bad request</div>;
  else if (ErrorCode === 401) return <div>Unauthorized</div>;
  else if (ErrorCode === 403) return <div>Forbidden</div>;
  else if (ErrorCode === 404) return <div>Not Found</div>;
  else if (ErrorCode === 412) return <div>Precondition failed</div>;
  else if (ErrorCode === 422 || ErrorCode === 500)
    return <div>Internal Server Error</div>;
  else if (ErrorCode === 503) return <div>Service Unavailable</div>;
};
export default Error;
