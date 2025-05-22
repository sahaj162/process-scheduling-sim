import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Link from "next/link"

type SubMenuItem = {
  title: string;
  href: string;
  description: string;
}

type MenuItem = {
  title: string;
  type: "dropdown" | "link";
  href?: string;
  items?: SubMenuItem[];
}

interface NavigationMobileProps {
  menuItems: MenuItem[];
}

export function NavigationMobile({ menuItems }: NavigationMobileProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="flex flex-col gap-4">
          {menuItems.map((item) => (
            <div key={item.title} className="space-y-4">
              {item.type === "dropdown" && item.items ? (
                <>
                  <h4 className="font-medium">{item.title}</h4>
                  <div className="pl-4 space-y-2">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.href}
                        className="block py-2 text-sm text-muted-foreground hover:text-foreground"
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                item.href && (
                  <Link
                    href={item.href}
                    className="block py-2 text-sm hover:text-foreground"
                  >
                    {item.title}
                  </Link>
                )
              )}
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}