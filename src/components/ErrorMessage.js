import React from "react"

export default function({ error }) {
  if (error instanceof Error) {
    return (
      <>
        <font color="red">{error.message}</font>
        <font color="red">{error.stack}</font>
      </>
    )
  }
  return <></>
}
