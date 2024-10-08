"use client"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
// To-do: make links work?
export function NavBar(){
  return(
<NavigationMenu>
  <NavigationMenuList>
  <NavigationMenuItem>
      <a href="/placeholder1">
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Resume
        </NavigationMenuLink>
      </a>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <a href="/placeholder2">
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            About
        </NavigationMenuLink>
      </a>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <a href="/placeholder3">
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Account
        </NavigationMenuLink>
      </a>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
  )
}