import { create_super_user } from "./create_super_user";
import { populate_default_language_to_posts } from "./populate_default_language_to_posts";
import { populate_default_languages } from "./populate_default_languages";
import { populate_posts_without_languages } from "./populate_posts_without_languages";
import { remove_empty_posts } from "./remove_empty_posts";
import { run_scratchpad } from "./run_scratchpad";
import { sync_images_to_prod } from "./sync_images_to_prod";

const command = process.argv[2];

// Execute the corresponding command based on the argument
(async () => {
  switch (command) {
    case "populate_default_languages":
      await populate_default_languages();
      break;
    case "create_super_user":
      await create_super_user();
      break;
    case "populate_default_language_to_posts":
      await populate_default_language_to_posts();
      break;
    case "populate_posts_without_languages":
      await populate_posts_without_languages();
      break;
    case "remove_empty_posts":
      await remove_empty_posts();
      break;
    case "sync_images_to_prod":
      await sync_images_to_prod();
      break;
    case "run_scratchpad":
      await run_scratchpad();
      break;
    default:
      console.error("Unknown command:", command);
      break;
  }

  process.exit();
})()
