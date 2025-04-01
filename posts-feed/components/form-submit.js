'use client';

import { useFormStatus } from "react-dom";

// must be used inside a form element (due to the useFormStatus hook)
export default function FormSubmit() {
  const status = useFormStatus();

  if(status.pending) {
    return <p>Creating new post...</p>;
  }

  return (
    <>
      <button type="reset">Reset</button>
      <button>Create Post</button>
    </>
  );
}
