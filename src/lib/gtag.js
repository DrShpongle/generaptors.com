export const GA_TRACKING_ID = 'UA-180341827-1' // This is your GA Tracking ID

const isBrowser = typeof window !== 'undefined'
const isProduction = process.env.NODE_ENV === 'production'

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  if (isBrowser && isProduction) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  if (isBrowser && isProduction) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}
