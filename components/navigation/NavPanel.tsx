"use client";

import { Tabs, Tab } from "@nextui-org/react";
import { GalleryIcon } from "./GalleryIcon";
import { VideoIcon } from "./VideoIcon";
import { usePathname, useRouter } from "next/navigation";

const NavigationList = [
  {
    name: "home",
    route: "/",
    icon: <GalleryIcon />,
  },
  {
    name: "random",
    route: "/random",
    icon: <VideoIcon />,
  },
];

function NavPanel() {
  const router = useRouter();
  const pathname = usePathname();

  const handleSelect = (selected: any) => {
    const selectedItem = NavigationList.find((item) => item.name === selected);
    if (selectedItem) {
      router.push(selectedItem.route);
    }
  };
  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Options"
        color="primary"
        onSelectionChange={handleSelect}
        isVertical={true}
        variant="bordered"
        size="lg"
        defaultSelectedKey={
          NavigationList.find((list) => list.route == pathname)?.name
        }
      >
        {NavigationList.map((list) => (
          <Tab
            className="p-4 py-6"
            key={list.name}
            title={
              <div className="flex items-center  space-x-2">{list.icon}</div>
            }
          />
        ))}
      </Tabs>
    </div>
  );
}

export default NavPanel;
