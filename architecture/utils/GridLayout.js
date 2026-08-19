import { Sortable } from "@shopify/draggable";

export function GridLayout() {
  const containers = document.querySelectorAll("#list_container_id");

  if (containers.length === 0) {
    return false;
  }

  const sortable = new Sortable(containers, {
    draggable: ".task_element",
    handle: ".drag_indicator",
    mirror: {
      constrainDimensions: true,
    },
  });

  sortable.on("sortable:stop", (event) => {
    console.log("Drag ended", event);
  });
}
