import { cn } from '../lib/utils.js'

/**
 * MagicUI-style overlapping circular avatars with an optional "+N" indicator.
 *
 * Props:
 *  - avatarUrls:  Array<{ imageUrl, profileUrl?, alt? }>
 *  - numPeople:   number — shown as "+N" badge at the end (omit/0 to hide)
 *  - className:   extra class on the outer wrapper
 *  - size:        pixel size for each circle (default 40)
 */
export default function AvatarCircles({
  avatarUrls = [],
  numPeople,
  className,
  size = 40,
}) {
  return (
    <div
      className={cn('avatar-circles', className)}
      style={{ '--avatar-size': `${size}px` }}
    >
      {avatarUrls.map((a, index) => {
        const img = (
          <img
            className="avatar-circle"
            src={a.imageUrl}
            width={size}
            height={size}
            alt={a.alt || `Avatar ${index + 1}`}
            loading="lazy"
          />
        )
        if (a.profileUrl) {
          return (
            <a
              key={a.imageUrl + index}
              href={a.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="avatar-circle-link"
              aria-label={a.alt || `Profile ${index + 1}`}
            >
              {img}
            </a>
          )
        }
        return (
          <span key={a.imageUrl + index} className="avatar-circle-link">
            {img}
          </span>
        )
      })}

      {numPeople != null && numPeople > 0 && (
        <span
          className="avatar-circle avatar-circle-more"
          aria-label={`${numPeople} more`}
        >
          +{numPeople}
        </span>
      )}
    </div>
  )
}
