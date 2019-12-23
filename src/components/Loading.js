import React from "react"
import ErrorMessage from "./ErrorMessage"

export default function({ name, target }) {
  if (!target) {
    return <p>{`loading ${name} ...`}</p>
  }
  if (target instanceof Error) {
    return (
      <>
        <p>{`There was an error while loading ${name}`}</p>
        <ErrorMessage error={target} />
      </>
    )
  }
  return <></>
}
