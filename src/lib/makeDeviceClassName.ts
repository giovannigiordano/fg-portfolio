export default function makeDeviceClassName(
  className: string,
  mobileClassName: string,
  desktopClassName: string,
  activeDevice: 'desktop' | 'mobile'
) {
  return `${className} ${
    activeDevice === 'desktop' ? desktopClassName : mobileClassName
  }`
}
