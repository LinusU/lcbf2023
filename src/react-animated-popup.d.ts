import React, { ReactNode } from 'react'
declare type CloseHandler = () => void
declare type CSSProperties = React.CSSProperties

declare interface Props {
  /**
   * Children to make up the popup.
   */
  children?: ReactNode

  /**
   * Tha prompt state, make true to make the prompt appear.
  */
  visible: boolean

  /**
   * Function called when closing. It is recommended to update your visible state to false on this callback.
   */
  onClose: CloseHandler

  /**
   * The duration of the animations in ms.
   * @default 100
  */
  animationDuration?: number

  /**
   * Override styling to the popup div. Per default it has 40px padding & 10px border-radius.
  */
  style?: CSSProperties

  /**
   * Classname to add to the popup div.
  */
  className?: string
}

declare const Popup: React.FC<Props>

export = Popup
