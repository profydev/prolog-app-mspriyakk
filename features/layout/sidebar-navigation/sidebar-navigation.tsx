import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Routes } from "@config/routes";
import classNames from "classnames";
import { NavigationContext } from "./navigation-context";
import { MenuItemButton } from "./menu-item-button";
import { MenuItemLink } from "./menu-item-link";
import { Button } from "@features/ui";
import styles from "./sidebar-navigation.module.scss";

const menuItems = [
  { text: "Projects", iconSrc: "/icons/projects.svg", href: Routes.projects },
  { text: "Issues", iconSrc: "/icons/issues.svg", href: Routes.issues },
  { text: "Alerts", iconSrc: "/icons/alert.svg", href: Routes.alerts },
  { text: "Users", iconSrc: "/icons/users.svg", href: Routes.users },
  { text: "Settings", iconSrc: "/icons/settings.svg", href: Routes.settings },
];

export function SidebarNavigation() {
  const router = useRouter();
  const { isSidebarCollapsed, toggleSidebar } = useContext(NavigationContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [isLargeView, setIsLargeView] = useState(true);

  const handleResize = () => {
    setIsLargeView(window.innerWidth >= 1024);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSupportClick = () => {
    window.open("mailto:support@prolog-app.com?subject=Support Request");
  };

  return (
    <div
      className={classNames(
        styles.container,
        isSidebarCollapsed && styles.isCollapsed,
      )}
    >
      <div
        className={classNames(
          styles.fixedContainer,
          isSidebarCollapsed && styles.isCollapsed,
        )}
      >
        <header className={styles.header}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={
              isSidebarCollapsed && isLargeView
                ? "/icons/logo-small.svg"
                : "/icons/logo-large.svg"
            }
            alt="logo"
            className={styles.logo}
          />
          <Button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className={styles.menuButton}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={isMobileMenuOpen ? "/icons/close.svg" : "/icons/menu.svg"}
              alt={isMobileMenuOpen ? "close menu" : "open menu"}
              className={styles.menuIcon}
            />
          </Button>
        </header>
        <div
          className={classNames(
            styles.menuOverlay,
            isMobileMenuOpen && styles.isMobileMenuOpen,
          )}
        />
        <nav
          className={classNames(
            styles.nav,
            isMobileMenuOpen && styles.isMobileMenuOpen,
          )}
        >
          <ul className={styles.linkList}>
            {menuItems.map((menuItem, index) => (
              <MenuItemLink
                key={index}
                {...menuItem}
                isCollapsed={isSidebarCollapsed}
                isActive={router.pathname === menuItem.href}
              />
            ))}
          </ul>
          <ul className={styles.list}>
            <MenuItemButton
              text="Support"
              iconSrc="/icons/support.svg"
              isCollapsed={isSidebarCollapsed}
              onClick={handleSupportClick}
            />
            <MenuItemButton
              text="Collapse"
              iconSrc="/icons/arrow-left.svg"
              isCollapsed={isSidebarCollapsed}
              onClick={() => toggleSidebar()}
              className={styles.collapseMenuItem}
            />
          </ul>
        </nav>
      </div>
    </div>
  );
}
