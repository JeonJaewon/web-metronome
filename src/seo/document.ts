import { type Feature, pageHeadTags } from "./pages";

export function updatePageMetadata(feature: Feature) {
  document.head.querySelectorAll("[data-page-meta]").forEach((tag) => tag.remove());
  for (const tag of pageHeadTags(feature)) {
    const element = document.createElement(tag.tag);
    for (const [name, value] of Object.entries(tag.attrs)) {
      element.setAttribute(name, value);
    }
    if (tag.children) element.textContent = tag.children;
    document.head.append(element);
  }
}
