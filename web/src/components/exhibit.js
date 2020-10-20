import React from "react"
import Figure from "./figure"
import PortableText from "./portableText"
import styles from "./exhibit.module.css"

const Exhibit = props => {
  const { title, banner, _rawOverview } = props
  return (
    <>
      <h1>{title && title.en}</h1>
      <Figure figure={banner} dimensions={9 / 16} />
      {_rawOverview && _rawOverview.en && (
        <PortableText className={styles.article} blocks={_rawOverview.en} />
      )}
      {/* {overview && overview.en && <p>{overview.en}</p>} */}
    </>
  )
}

export default Exhibit
