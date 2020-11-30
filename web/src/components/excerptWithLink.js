import React from "react"
import { Link } from "gatsby"

// this is only for internal (same-site) links, not external links. Make and use ExcerptWithA for that.

const ExcerptWithLink = ({
  excerptLength,
  linkText,
  to,
  excerpt,
  className,
}) => (
  <p className={className}>
    {excerpt.substring(0, excerptLength)}
    {excerpt.length > excerptLength && <>...</>}{" "}
    {linkText && to && <Link to={to}>{linkText}</Link>}
  </p>
)

export default ExcerptWithLink
