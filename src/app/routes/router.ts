import { Account } from "../Pages/Account/Account";
import { Friends } from "../Pages/Friends/Friends";
import { Games } from "../Pages/Games/Games";
import Messenger from "../Pages/Messenger/Messenger";
import { Settings } from "../Pages/Settings/Settings";
import { Theme } from "../Pages/Theme/Theme";

const publickRoutes = [
  { path: "games", element: Games, label: "Games" },
  { path: "settings", element: Settings },
  { path: "theme", element: Theme },
];

const privateRoutes = [
  { path: "conversations/", element: Messenger },
  { path: "conversations/:id/", element: Messenger },
  { path: "friends", element: Friends },
  { path: "account", element: Account },
];

export { publickRoutes, privateRoutes };
