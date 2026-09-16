<script setup lang="ts">
  import {
    BellIcon,
    BookmarkIcon,
    CheckIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronUpIcon,
    ChevronsLeftIcon,
    ChevronsRightIcon,
    ChevronsUpDownIcon,
    CircleCheckIcon,
    CreditCardIcon,
    EllipsisVerticalIcon,
    GlobeIcon,
    InfoIcon,
    LayersIcon,
    Loader2Icon,
    LogOutIcon,
    MapPinIcon,
    MenuIcon,
    MinusIcon,
    MonitorIcon,
    MoonIcon,
    MoreHorizontal,
    OctagonXIcon,
    PencilIcon,
    PlusIcon,
    SearchIcon,
    SettingsIcon,
    ShapesIcon,
    SunIcon,
    TagIcon,
    Trash2Icon,
    TriangleAlertIcon,
    UserIcon,
    UsersIcon,
    XIcon,
  } from '@lucide/vue'
  import { Inline } from '@shared/components/common/Inline'
  import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@shared/components/ui/tooltip'

  const icons = [
    { name: 'Bell', icon: BellIcon },
    { name: 'Bookmark', icon: BookmarkIcon },
    { name: 'Check', icon: CheckIcon },
    { name: 'ChevronDown', icon: ChevronDownIcon },
    { name: 'ChevronLeft', icon: ChevronLeftIcon },
    { name: 'ChevronRight', icon: ChevronRightIcon },
    { name: 'ChevronUp', icon: ChevronUpIcon },
    { name: 'ChevronsLeft', icon: ChevronsLeftIcon },
    { name: 'ChevronsRight', icon: ChevronsRightIcon },
    { name: 'ChevronsUpDown', icon: ChevronsUpDownIcon },
    { name: 'CircleCheck', icon: CircleCheckIcon },
    { name: 'CreditCard', icon: CreditCardIcon },
    { name: 'EllipsisVertical', icon: EllipsisVerticalIcon },
    { name: 'Globe', icon: GlobeIcon },
    { name: 'Info', icon: InfoIcon },
    { name: 'Layers', icon: LayersIcon },
    { name: 'Loader2', icon: Loader2Icon },
    { name: 'LogOut', icon: LogOutIcon },
    { name: 'MapPin', icon: MapPinIcon },
    { name: 'Menu', icon: MenuIcon },
    { name: 'Minus', icon: MinusIcon },
    { name: 'Monitor', icon: MonitorIcon },
    { name: 'Moon', icon: MoonIcon },
    { name: 'MoreHorizontal', icon: MoreHorizontal },
    { name: 'OctagonX', icon: OctagonXIcon },
    { name: 'Pencil', icon: PencilIcon },
    { name: 'Plus', icon: PlusIcon },
    { name: 'Search', icon: SearchIcon },
    { name: 'Settings', icon: SettingsIcon },
    { name: 'Shapes', icon: ShapesIcon },
    { name: 'Sun', icon: SunIcon },
    { name: 'Tag', icon: TagIcon },
    { name: 'Trash2', icon: Trash2Icon },
    { name: 'TriangleAlert', icon: TriangleAlertIcon },
    { name: 'User', icon: UserIcon },
    { name: 'Users', icon: UsersIcon },
    { name: 'X', icon: XIcon },
  ]
</script>

<template>
  <TooltipProvider>
    <Inline>
      <Tooltip
        v-for="item in icons"
        :key="item.name"
      >
        <TooltipTrigger as-child>
          <div class="border p-3">
            <component :is="item.icon" />
          </div>
        </TooltipTrigger>

        <TooltipContent>
          {{ item.name }}
        </TooltipContent>
      </Tooltip>
    </Inline>
  </TooltipProvider>
</template>
