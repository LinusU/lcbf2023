import React from 'react'
import { FaChevronDown, FaChevronRight } from 'react-icons/fa'

interface CollapsableSectionProps {
  children: React.ReactNode
  bold?: boolean
  title: string
}

const CollapsableSection: React.FC<CollapsableSectionProps> = ({ bold = false, children, title }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <div>
      <div onClick={() => setOpen(val => !val)}>
        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', gap: 8 }}>
          {open ? <FaChevronDown /> : <FaChevronRight />}

          <p style={{ fontWeight: bold ? '600' : undefined }}>{title}</p>
        </div>
      </div>

      <div style={{ height: 4 }} />

      <div style={{ paddingLeft: 8, paddingBottom: open ? 8 : 0 }}>
        {open ? children : null}
      </div>
    </div>
  )
}

export default CollapsableSection
