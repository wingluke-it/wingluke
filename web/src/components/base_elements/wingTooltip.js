import { Arrow, useHover, useLayer } from "react-laag"
import React, { useState } from "react"

import PropTypes from "prop-types"
import styles from "./wingTooltip.module.scss"

const WingTooltip = ({ children, content }) => {
  // const [isOver, hoverProps, close] = useHover({
  //   delayEnter: 200, // wait 300ms before showing
  //   delayLeave: 200, // wait 300ms before leaving
  //   hideOnScroll: false, // hide layer immediately when user starts scrolling
  // })

  const [isOpen, setIsOpen] = useState(false)
  const toggleIsOpen = newState => {
    if (isOpen !== newState) {
      setIsOpen(!isOpen)
    }
  }

  const { triggerProps, layerProps, arrowProps, renderLayer } = useLayer({
    isOpen: isOpen,
    placement: "bottom-center",
    preferX: "right",
    auto: true,
    triggerOffset: 16,
    onOutsideClick: () => toggleIsOpen(false),
    // onDisappear: () => toggleIsOpen(false),
  })

  return (
    <>
      <span
        {...triggerProps}
        /* {...hoverProps} */ onClick={() => toggleIsOpen()}
        className={styles.infoIcon}
      >
        {children}
      </span>
      {isOpen &&
        renderLayer(
          <div className={styles.tooltip} {...layerProps}>
            <span onClick={() => toggleIsOpen(false)} className={styles.closeX}>
              X
            </span>
            {content}
            <Arrow
              {...arrowProps}
              angle={45}
              size={8}
              roundness={0}
              borderWidth={1}
              borderColor="#000"
              backgroundColor="#f7f7f7" // color of arrow
              // color="#FFF
              // layerSide="top"
              className={styles.arrow}
            />
          </div>
        )}
    </>
  )
}

WingTooltip.propTypes = {
  content: PropTypes.any.isRequired,
}

export default WingTooltip
