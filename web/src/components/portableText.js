import React from "react"
import clientConfig from "../../client-config"
import BasePortableText from "@sanity/block-content-to-react"
import serializers from "./serializers"

const PortableText = ({ blocks, className }) => (
  <BasePortableText
    blocks={blocks}
    className={className}
    serializers={serializers}
    {...clientConfig.sanity}
  />
)

export default PortableText
